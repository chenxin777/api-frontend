import {
    type ProColumns,
    ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
import {Modal} from 'antd';

export type props = {
  columns:  ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};

const CreateModal: React.FC<props> = (props) => {
  const { columns, visible , onCancel, onSubmit} = props;
  
  return <Modal open={visible} footer={null} onCancel={()=>onCancel?.() } >
      <ProTable
          type="form"
          columns={columns}
          onSubmit={async (value) => {
            await onSubmit?.(value);
      }}/>
  </Modal>;
  
      

};
export default CreateModal;
