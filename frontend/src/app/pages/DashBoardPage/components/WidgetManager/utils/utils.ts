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
  BackgroundConfig,
  BorderConfig,
  WidgetPadding,
  WidgetTitleConfig,
} from 'app/pages/DashBoardPage/pages/Board/slice/types';
import { getJsonConfigs } from '../../../utils';

export const getLoopFetch = props => {
  const [enable, interval] = getJsonConfigs(
    props,
    ['loopFetchGroup'],
    ['enable', 'interval'],
  );
  return {
    enable,
    interval,
  };
};
export const getWidgetBackground = props => {
  const background = getJsonConfigs(props, ['background'], ['background']);
  return background as unknown as BackgroundConfig;
};
export const getWidgetBorder = props => {
  const background = getJsonConfigs(props, ['borderGroup'], ['border']);
  return background as unknown as BorderConfig;
};
export const getWidgetPadding = props => {
  const [top, right, bottom, left] = getJsonConfigs(
    props,
    ['paddingGroup'],
    ['top', 'right', 'bottom', 'left'],
  );
  return {
    top,
    right,
    bottom,
    left,
  } as WidgetPadding;
};
export const getWidgetBaseStyle = props => {
  return {
    background: getWidgetBackground(props),
    border: getWidgetBorder(props),
    padding: getWidgetPadding(props),
  };
};
export const getWidgetTitle = props => {
  const [text, showTitle, textAlign, font] = getJsonConfigs(
    props,
    ['titleGroup'],
    ['title', 'showTitle', 'textAlign', 'font'],
  );
  return {
    text,
    showTitle,
    textAlign,
    font,
  } as WidgetTitleConfig;
};
