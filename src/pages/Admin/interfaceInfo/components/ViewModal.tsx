import { ProCard } from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React from 'react';

export type props = {
  title: string;
  values: string;
  onCancel: () => void;
  visible: boolean;
};

const ViewModal: React.FC<props> = (props) => {
  const { visible, onCancel } = props;

  return (
    <Modal open={visible} footer={null} onCancel={() => onCancel?.()}>
      <ProCard title={props.title} layout="center" direction="column">
        <div
          style={{
            whiteSpace: 'pre-wrap', // 保持换行和缩进
            fontSize: '12px', // 可选：调整字体大小
            fontFamily: 'monospace', // 可选：使用等宽字体
            padding: '10px', // 可选：内边距
            backgroundColor: '#f5f5f5', // 可选：背景颜色
            borderRadius: '4px', // 可选：边框圆角
          }}
        >
          {props.values}
        </div>
      </ProCard>
    </Modal>
  );
};
export default ViewModal;
