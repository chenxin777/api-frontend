import {
    type ProColumns,
    ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import React, {useEffect, useRef} from 'react';
import {Modal} from 'antd';
import {ProFormInstance} from '@ant-design/pro-form/lib';

export type props = {
  values: API.InterfaceInfo;
  columns:  ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};

const UpdateModal: React.FC<props> = (props) => {
  const { values, columns, visible , onCancel, onSubmit} = props;
  
  const formRef = useRef<ProFormInstance>();
  
  useEffect(() => {
      if (formRef) {
          formRef.current?.setFieldsValue(values);
      }
  }, [values])
  
  return <Modal open={visible} footer={null} onCancel={()=>onCancel?.() } >
      <ProTable
          type="form"
          columns={columns}
          formRef={formRef}
          onSubmit={async (value) => {
            await onSubmit?.(value);
      }}/>
  </Modal>;
  
      

};
export default UpdateModal;
