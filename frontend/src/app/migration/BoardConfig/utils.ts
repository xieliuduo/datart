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

import { WidgetBeta3 } from 'app/pages/DashBoardPage/pages/Board/slice/types';
import { Widget } from 'app/pages/DashBoardPage/types/widgetTypes';
import { widgetManager } from '../../pages/DashBoardPage/components/WidgetManager/WidgetManager';

const commonBeta4Convert = (newWidget: Widget, oldW: WidgetBeta3) => {
  newWidget.id = oldW.id;
  newWidget.config.index = oldW.config.index;
  newWidget.config.lock = oldW.config.lock;
  newWidget.config.rect = oldW.config.rect;
  newWidget.config.content = oldW.config.content; //Todo

  const oldConf = oldW.config;
  if (oldW.config.tabId) {
    newWidget.config.clientId = oldW.config.tabId;
  }

  if (oldW.config.mobileRect) {
    newWidget.config.mRect = oldW.config.mobileRect;
  }
  newWidget.config.jsonConfig.props?.forEach(prop => {
    // titleGroup name nameConfig
    if (prop.key === 'titleGroup') {
      const oNameConf = oldConf.nameConfig as any;
      prop.rows?.forEach(row => {
        if (row.key === 'title') {
          row.value = oldConf.name;
        }
        if (row.key === 'showTitle') {
          row.value = oNameConf.show;
        }
        if (row.key === 'textAlign') {
          row.value = oNameConf.textAlign;
        }
        if (row.key === 'font') {
          row.value = {
            fontFamily: oNameConf.fontFamily,
            fontSize: oNameConf.fontSize,
            fontWeight: oNameConf.fontWeight,
            fontStyle: oNameConf.fontStyle,
            color: oNameConf.color,
          };
        }
      });
    }
    // paddingGroup
    if (prop.key === 'paddingGroup') {
      const oPad = oldConf.padding as any;
      prop.rows?.forEach(row => {
        if (row.key === 'top') {
          row.value = oPad.top;
        }
        if (row.key === 'right') {
          row.value = oPad.right;
        }
        if (row.key === 'bottom') {
          row.value = oPad.bottom;
        }
        if (row.key === 'left') {
          row.value = oPad.left;
        }
      });
    }
    // loopFetchGroup
    if (prop.key === 'loopFetchGroup') {
      prop.rows?.forEach(row => {
        if (row.key === 'enable') {
          row.value = oldConf.autoUpdate;
        }
        if (row.key === 'interval') {
          row.value = oldConf.frequency;
        }
      });
    }
    // backgroundGroup
    if (prop.key === 'backgroundGroup') {
      prop.rows?.forEach(row => {
        if (row.key === 'background') {
          row.value = oldConf.background;
        }
      });
    }
    // borderGroup
    if (prop.key === 'borderGroup') {
      prop.rows?.forEach(row => {
        if (row.key === 'border') {
          row.value = oldConf.border;
        }
      });
    }
  });
  return newWidget;
};
export const convertChartWidgetToBeta4 = (widget: WidgetBeta3) => {
  const subType = widget.config.content.type;
  let newWidget = {} as Widget;
  if (subType === 'dataChart') {
    newWidget = widgetManager
      .toolkit('linkChart')
      .create({ ...widget, widgetTypeId: 'linkChart' });
  } else {
    newWidget = widgetManager.toolkit('selfChart').create({
      ...widget,
      widgetTypeId: 'selfChart',
    });
  }

  newWidget = commonBeta4Convert(newWidget, widget);
  newWidget.config.jumpConfig = widget.config.jumpConfig;
  newWidget.config.linkageConfig = widget.config.linkageConfig;
  return newWidget;
};
export const convertContainerWidgetToBeta4 = (widget: WidgetBeta3) => {
  const subType = widget.config.content.type;
  if (subType === 'tab') {
    /**
       old data 
       {
         "itemMap": {
               "de693d55-04ef-497c-b465-a2420abe1e05": {
                   "tabId": "de693d55-04ef-497c-b465-a2420abe1e05",
                   "name": "私有图表_7",
                   "childWidgetId": "newWidget_0e970200-bc0e-4fc8-9de0-caea67e350f2",
                   "config": {}
               },
               "8f44ec1e-4602-4db1-9ec9-ab1ac8543251": {
                   "tabId": "8f44ec1e-4602-4db1-9ec9-ab1ac8543251",
                   "name": "图片_5",
                   "childWidgetId": "75e272ae570749468f94913cb9857203",
                   "config": {}
               }
           }
       }

       */
    /**
       new data 
       {
         "itemMap": {
            "client_b17323f7-8670-4c71-a43f-86a02359b2f5": {
                   "index": 1651831223742,
                    "name": "Image",
                    "tabId": "client_b17323f7-8670-4c71-a43f-86a02359b2f5",
                    "childWidgetId": "226c8f69c42b41109fdcfd84d7b8a2da"
          },
           "client_6cf95a9a-4052-4809-88f2-bad52aff1d24": {
                   "index": 1651833022936,
                   "name": "tab*",
                   "tabId": "client_6cf95a9a-4052-4809-88f2-bad52aff1d24",
                  "childWidgetId": "a4134a55-b79d-4518-92dc-0631678b98c6"
          }
      }
}

       */
    let newWidget = widgetManager.toolkit('tab').create({
      ...widget,
      widgetTypeId: 'tab',
    });
    newWidget = commonBeta4Convert(newWidget, widget);

    const itemMap = newWidget.config.content?.itemMap;
    if (!itemMap) return newWidget;
    const tabItems = Object.values(itemMap) as any[];
    let newIndex = Number(Date.now());
    tabItems.forEach(item => {
      item.index = newIndex;
      delete item.config;
      newIndex++;
    });
    return newWidget;
  }
};
/**
 *
 *
 * @param {WidgetBeta3} widget
 * @return {*}
 */
export const convertMediaWidgetToBeta4 = (widget: WidgetBeta3) => {
  const subType = widget.config.content.type;
  if (subType === 'image') {
    let newWidget = widgetManager.toolkit('image').create({
      ...widget,
      widgetTypeId: 'image',
    });
    newWidget = commonBeta4Convert(newWidget, widget);
    return newWidget;
  }
  if (subType === 'richText') {
    let newWidget = widgetManager.toolkit('richText').create({
      ...widget,
      widgetTypeId: 'richText',
    });
    newWidget = commonBeta4Convert(newWidget, widget);
    // getWidgetIframe;
    return newWidget;
  }
  if (subType === 'iframe') {
    /**
     * old data
    {
    "content": {
        "type": "iframe",
        "iframeConfig": {
            "src": "https://ant.design/components/overview-cn/"
        }
    }
}
    */
    let newWidget = widgetManager.toolkit('iframe').create({
      ...widget,
      widgetTypeId: 'iframe',
    });
    newWidget = commonBeta4Convert(newWidget, widget);
    const oldConf = widget.config.content.iframeConfig;
    newWidget.config.jsonConfig.props?.forEach(prop => {
      // iframeGroup
      if (prop.key === 'iframeGroup') {
        prop.rows?.forEach(row => {
          if (row.key === 'src') {
            row.value = oldConf.src;
          }
        });
      }
    });
    return newWidget;
  }

  if (subType === 'video') {
    let newWidget = widgetManager.toolkit('video').create({
      ...widget,
      widgetTypeId: 'video',
    });
    newWidget = commonBeta4Convert(newWidget, widget);
    return newWidget;
  }
};
/**
 *
 *
 * @param {WidgetBeta3} widget
 * @return {*}
 */
export const convertWidgetToBeta4 = (widget: WidgetBeta3) => {
  const widgetType = widget.config.type;

  // chart
  if (widgetType === 'chart') {
    return convertChartWidgetToBeta4(widget);
  }
  // media
  if (widgetType === 'media') {
    return convertMediaWidgetToBeta4(widget);
  }
  // container
  if (widgetType === 'container') {
    return convertContainerWidgetToBeta4(widget);
  }
};
