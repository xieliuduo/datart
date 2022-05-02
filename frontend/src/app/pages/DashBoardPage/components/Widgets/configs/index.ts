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

import { APP_CURRENT_VERSION } from 'app/migration/constants';
import type {
  BoardType,
  RectConfig,
  WidgetType,
} from 'app/pages/DashBoardPage/pages/Board/slice/types';
import { IWidget } from 'app/pages/DashBoardPage/types/widgetTypes';
import { FontDefault } from 'app/pages/DashBoardPage/utils/widget';
import type { ChartStyleConfig } from 'app/types/ChartConfig';

export const TitleTpl: ChartStyleConfig = {
  label: 'title.title',
  key: 'title',
  comType: 'group',
  rows: [
    {
      label: 'title.text',
      key: 'text',
      value: '',
      comType: 'input',
    },
    {
      label: 'title.showTitle',
      key: 'showTitle',
      value: true,
      comType: 'switch',
    },
    {
      label: 'title.textAlign',
      key: 'textAlign',
      value: 'left',
      comType: 'switch',
    },
    {
      label: 'title.textAlign.textAlign',
      key: 'textAlign',
      value: 'left',
      comType: 'select',
      options: {
        translateItemLabel: true,
        items: [
          {
            label: '@global@.title.textAlign.left',
            key: 'left',
            value: 'left',
          },
          {
            label: '@global@.title.textAlign.center',
            key: 'center',
            value: 'center',
          },
        ],
      },
    },
    {
      label: 'title.titleFont',
      key: 'titleFont',
      value: FontDefault,
      comType: 'font',
      default: FontDefault,
    },
  ],
};
export const TitleI18N = {
  zh: {
    title: '标题配置',
    text: '标题',
    showTitle: '显示标题',
    titleFont: '标题字体',
    textAlign: {
      textAlign: '对齐方式',
      left: '左对齐',
      center: '居中',
    },
  },
  en: {
    title: 'Title Config',
    text: 'Title',
    showTitle: 'Show Title',
    titleFont: 'Title Font',
    textAlign: {
      textAlign: 'Align',
      left: 'Left',
      center: 'Center',
    },
  },
};
export const PaddingTpl: ChartStyleConfig = {
  label: 'padding.padding',
  key: 'padding',
  comType: 'group',
  rows: [
    {
      label: 'padding.top',
      key: 'top',
      value: '8',
      comType: 'inputNumber',
    },
    {
      label: 'padding.bottom',
      key: 'bottom',
      value: '8',
      comType: 'inputNumber',
    },
    {
      label: 'padding.left',
      key: 'left',
      value: '8',
      comType: 'inputNumber',
    },
    {
      label: 'padding.right',
      key: 'right',
      value: '8',
      comType: 'inputNumber',
    },
  ],
};
export const PaddingI18N = {
  zh: {
    padding: '内边距',
    top: '上',
    bottom: '下',
    left: '左',
    right: '右',
  },
  en: {
    padding: 'Padding',
    top: 'Top',
    bottom: 'Bottom',
    left: 'Left',
    right: 'Right',
  },
};
export const LoopFetchTpl: ChartStyleConfig = {
  label: 'loopFetch.loopFetch',
  key: 'loopFetch',
  comType: 'group',
  rows: [
    {
      label: 'loopFetch.enable',
      key: 'enable',
      value: false,
      comType: 'switch',
    },
    {
      label: 'loopFetch.interval',
      key: 'interval',
      value: '60', //60s
      comType: 'inputNumber',
    },
  ],
};
export const LoopFetchI18N = {
  zh: {
    loopFetch: '自动刷新数据',
    enable: '启用',
    interval: '间隔',
  },
  en: {
    loopFetch: 'Loop Fetch',
    enable: 'Enable',
    interval: 'Interval',
  },
};
export const BackgroundTpl: ChartStyleConfig = {
  label: 'background.background',
  key: 'background',
  comType: 'group',
  rows: [
    {
      label: 'background.background',
      key: 'background',
      default: {
        color: 'transparent', // TODO 根据当前主题色配置
        image: '',
        size: '100% 100%',
        repeat: 'no-repeat',
      },
      value: {
        color: 'transparent', // TODO 根据当前主题色配置
        image: '',
        size: '100% 100%',
        repeat: 'no-repeat',
      },
      comType: 'background',
    },
  ],
};
export const BorderTpl: ChartStyleConfig = {
  label: 'border.borderGroup',
  key: 'borderGroup',
  comType: 'group',
  rows: [
    {
      label: 'border.border',
      key: 'border',
      value: {
        color: 'transparent', // TODO 根据当前主题色配置
        width: '0',
        style: 'solid',
        radius: 'no-repeat',
      },
      comType: 'border',
    },
  ],
};

export const WidgetViewActionTpl = {
  fullScreen: {
    label: 'action.fullScreen',
    icon: 'fullscreen', //svg TODO
    key: 'fullScreen',
  },
  refresh: {
    label: 'action.refresh',
    icon: 'refresh',
    key: 'refresh',
  },
};

export const WidgetViewActionI18N = {
  zh: {
    fullScreen: '全屏',
    refresh: '刷新',
  },
  en: {
    fullScreen: 'Full Screen',
    refresh: 'Refresh',
  },
};

export const WidgetEditActionTpl = {
  copy: {
    label: 'action.copy',
    icon: 'copy',
    key: 'copy',
  },
  paste: {
    label: 'action.paste',
    icon: 'paste',
    key: 'paste',
  },
  delete: {
    label: 'action.delete',
    icon: 'delete',
    key: 'delete',
    danger: true,
  },
  lock: {
    label: 'action.lock',
    icon: 'lock',
    key: 'lock',
  },
};
export const WidgetEditActionI18N = {
  zh: {
    copy: '复制',
    paste: '粘贴',
    delete: '删除',
    lock: '锁定',
  },
  en: {
    copy: 'Copy',
    paste: 'Paste',
    delete: 'Delete',
    lock: 'Lock',
  },
};

export const AutoWidgetRectTpl: RectConfig = {
  x: 0,
  y: 0,
  width: 6,
  height: 6,
};
export const FreeWidgetRectTpl: RectConfig = {
  x: 0,
  y: 0,
  width: 300,
  height: 400,
};

export const widgetTpl = (): IWidget => {
  return {
    id: '',
    dashboardId: '',
    datachartId: '',
    relations: [],
    viewIds: [],
    parentId: '',
    config: {
      version: APP_CURRENT_VERSION,
      index: 0,
      boardType: '' as BoardType,
      type: '' as WidgetType,
      selfConfig: {} as any,
      widgetTypeId: '',
      lock: false,
      content: {} as any,
      rect: { x: 0, y: 0, width: 0, height: 0 },
      JsonConfig: {
        props: [
          { ...TitleTpl },
          { ...LoopFetchTpl },
          { ...PaddingTpl },
          { ...BackgroundTpl },
          { ...BorderTpl },
        ],
      },
    },
  };
};