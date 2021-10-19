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
import {
  DataChart,
  ServerDashboard,
  VizRenderMode,
} from 'app/pages/DashBoardPage/slice/types';
import { getBoardChartRequests } from 'app/pages/DashBoardPage/utils';
import {
  getChartDataView,
  getDashBoardByResBoard,
  getDataChartsByServer,
  getInitBoardInfo,
  getScheduleBoardInfo,
} from 'app/pages/DashBoardPage/utils/board';
import {
  getWidgetInfoMapByServer,
  getWidgetMapByServer,
} from 'app/pages/DashBoardPage/utils/widget';

/**
 * @param ''
 * @description 'server 定时任务 调用'
 */
const getBoardQuery = (data: ServerDashboard) => {
  // const { data, renderMode, filterSearchMap } = data;
  const renderMode: VizRenderMode = 'schedule';
  const dashboard = getDashBoardByResBoard(data);
  const { datacharts, views: serverViews, widgets: serverWidgets } = data;

  const widgetIds = serverWidgets.map(w => w.id);

  const { widgetMap, wrappedDataCharts } = getWidgetMapByServer(serverWidgets);

  let boardInfo = getInitBoardInfo(dashboard.id, widgetIds);

  if (renderMode === 'schedule') {
    boardInfo = getScheduleBoardInfo(boardInfo, widgetMap);
  }
  const dataCharts: DataChart[] = getDataChartsByServer(datacharts);

  const allDataCharts: DataChart[] = dataCharts.concat(wrappedDataCharts);
  const viewViews = getChartDataView(serverViews, allDataCharts);
  const widgetInfoMap = getWidgetInfoMapByServer(serverWidgets);
  const viewMap = viewViews.reduce((obj, view) => {
    obj[view.id] = view;
    return obj;
  }, {});

  const dataChartMap = allDataCharts.reduce((obj, dataChart) => {
    obj[dataChart.id] = dataChart;
    return obj;
  }, {});
  let downloadParams = getBoardChartRequests({
    widgetMap,
    viewMap,
    dataChartMap,
  });
  let fileName = dashboard.name;
  return { downloadParams, fileName };
};
export default getBoardQuery;
