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

import { Menu } from 'antd';
import { FC } from 'react';
import { updateDataConfigByField } from './utils';

const ELementFieldReplaceMenu: FC<{
  uid;
  type;
  config;
  ancestors;
  columnConfig;
  onConfigChanged;
}> = ({ uid, type, ancestors, config, columnConfig, onConfigChanged }) => {
  const handleFieldConfigChanged = () => {
    const newConfig1 = {
      aggregate: undefined,
      category: 'field' as any,
      children: [],
      colName: 'name_level2',
      subType: undefined,
      type: 'STRING' as any,
      uid: columnConfig.uid,
    };
    if (columnConfig.uid) {
      //   let newCurrentConfig = updateBy(config, draft => {
      //     draft.rows = draft.rows?.find(c => c.uid !== config.uid);
      //     if (
      //       config.category === ChartDataViewFieldCategory.DateLevelComputedField
      //     ) {
      //       draft.replacedConfig = config;
      //     }
      //   });
      //   onConfigChanged?.(ancestors, newCurrentConfig, true);
    }
    const newConfig = updateDataConfigByField(
      columnConfig.uid,
      config,
      newConfig1,
    );

    onConfigChanged?.(ancestors, newConfig, true);
  };

  const change1 = () => {
    handleFieldConfigChanged();
    // handleFieldConfigChanged(uid, config, needRefresh, replacedConfig);
  };
  return (
    <Menu>
      <Menu.Item key={'1'} onClick={change1}>
        {123}
      </Menu.Item>
    </Menu>
  );
};

export default ELementFieldReplaceMenu;
