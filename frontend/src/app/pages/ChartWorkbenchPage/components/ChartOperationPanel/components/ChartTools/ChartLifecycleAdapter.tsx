/**
 * Datart
 *
 * Copyright 2021
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useFrame } from 'app/components/ReactFrameComponent';
import useMount from 'app/hooks/useMount';
import Chart from 'app/pages/ChartWorkbenchPage/models/Chart';
import ChartEventBroker from 'app/pages/ChartWorkbenchPage/models/ChartEventBroker';
import { ChartConfig } from 'app/types/ChartConfig';
import { ChartLifecycle } from 'app/types/ChartLifecycle';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import styled from 'styled-components/macro';
import { uuidv4 } from 'utils/utils';
import ChartIFrameContainerResourceLoader from './ChartIFrameContainerResourceLoader';

enum ContainerStatus {
  INIT,
  SUCCESS,
  FAILED,
  LOADING,
}

const ChartLifecycleAdapter: React.FC<{
  dataset: any;
  chart: Chart;
  config: ChartConfig;
  style: CSSProperties;
  widgetSpecialConfig?: any;
}> = ({ dataset, chart, config, style, widgetSpecialConfig }) => {
  const [chartResourceLoader, setChartResourceLoader] = useState(
    () => new ChartIFrameContainerResourceLoader(),
  );
  const [containerStatus, setContainerStatus] = useState(ContainerStatus.INIT);
  const { document, window } = useFrame();
  const [containerId] = useState(() => uuidv4());
  const eventBrokerRef = useRef<ChartEventBroker>();

  useMount(() => {
    setChartResourceLoader(new ChartIFrameContainerResourceLoader());
  });

  /**
   * Chart Mount Event
   * Dependency: 'chart?.meta?.id', 'eventBrokerRef'
   */
  useEffect(() => {
    if (!chart || !document || !window || !config) {
      return;
    }
    if (containerStatus === ContainerStatus.LOADING) {
      return;
    }

    setContainerStatus(ContainerStatus.LOADING);
    (async () => {
      chartResourceLoader
        .loadResource(document, chart?.getDependencies?.())
        .then(_ => {
          chart.init(config);
          const newBrokerRef = new ChartEventBroker();
          newBrokerRef.register(chart);
          newBrokerRef.publish(
            ChartLifecycle.MOUNTED,
            { containerId, dataset, config, widgetSpecialConfig },
            {
              document,
              window,
              width: style?.width,
              height: style?.height,
            },
          );
          eventBrokerRef.current = newBrokerRef;
          setContainerStatus(ContainerStatus.SUCCESS);
        })
        .catch(_ => {
          setContainerStatus(ContainerStatus.FAILED);
        });
    })();

    return function cleanup() {
      setContainerStatus(ContainerStatus.INIT);
      eventBrokerRef?.current?.publish(ChartLifecycle.UNMOUNTED, {});
    };
  }, [chart?.meta?.id, eventBrokerRef]);

  /**
   * Chart Update Event
   * Dependency: 'config', 'dataset', 'widgetSpecialConfig', 'containerStatus', 'document', 'window'
   */
  useEffect(() => {
    if (
      !document ||
      !window ||
      !config ||
      !dataset ||
      containerStatus !== ContainerStatus.SUCCESS
    ) {
      return;
    }
    eventBrokerRef.current?.publish(
      ChartLifecycle.UPDATED,
      {
        dataset,
        config,
        widgetSpecialConfig,
      },
      {
        document,
        window,
        width: style?.width,
        height: style?.height,
      },
    );
  }, [config, dataset, widgetSpecialConfig, containerStatus, document, window]);

  /**
   * Chart Resize Event
   * Dependency: 'style.width', 'style.height', 'document', 'window'
   */
  useEffect(() => {
    if (
      !document ||
      !window ||
      !config ||
      !dataset ||
      containerStatus !== ContainerStatus.SUCCESS
    ) {
      return;
    }

    eventBrokerRef.current?.publish(
      ChartLifecycle.RESIZE,
      {
        dataset,
        config,
        widgetSpecialConfig,
      },
      {
        document,
        window,
        width: style?.width,
        height: style?.height,
      },
    );
  }, [style.width, style.height, document, window]);

  return (
    <Spin
      spinning={containerStatus !== ContainerStatus.SUCCESS}
      indicator={<LoadingOutlined spin />}
      delay={500}
    >
      <StyledChartLifecycleAdapter
        id={containerId}
        style={{ width: style?.width, height: style?.height }}
      />
    </Spin>
  );
};

export default ChartLifecycleAdapter;

const StyledChartLifecycleAdapter = styled.div``;
