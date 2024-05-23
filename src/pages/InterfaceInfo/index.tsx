import { PageContainer } from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {Button, Card, Descriptions, message, Form, Input, Divider} from 'antd';
import {
  getInterfaceInfoVoByIdUsingGet, invokeUsingPost
} from '@/services/api-backend/interfaceInfoController';
import {useParams} from 'react-router';

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfoVO>();
  const params = useParams()
  const [invokeRes, setInvokeRes] = useState<any>();
  const [invokeLoading, setInvokeLoading] = useState(false);
  const loadData = async () => {
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    setLoading(true);
    try {
      const res = await getInterfaceInfoVoByIdUsingGet({
        id: Number(params.id)
      });
        setData(res.data);
    } catch (error: any) {
      message.error(error.message);
    }
    setLoading(false);
   
  }
  
  useEffect(() => {
    loadData()
  }, [])
  
  const onFinish = async (values: any) => {
    if (!params.id) {
      message.error('接口不存在');
      return;
    }
    setInvokeLoading(true);
    try {
      const res = await invokeUsingPost({
        id: params.id,
        ...values
      });
      setInvokeRes(res.data);
      message.success('调用成功')
    } catch (error) {
      message.error('调用失败')
    }
    setInvokeLoading(false);
    
  }
  
  return (
      <PageContainer title={'接口文档'}>
      <Card>
        {
        data ? (<Descriptions title={data?.name} column={1}>
          <Descriptions.Item label="状态">{data.status === 0 ? '关闭' : '开启'}</Descriptions.Item>
          <Descriptions.Item label="接口描述">{data.name}</Descriptions.Item>
          <Descriptions.Item label="接口地址">{data.url}</Descriptions.Item>
          <Descriptions.Item label="接口参数">{data.requestParams}</Descriptions.Item>
          <Descriptions.Item label="请求方式">{data.method}</Descriptions.Item>
          <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
          <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
          </Descriptions>) : (<>接口不存在</>)
        }
      </Card>
      <Divider/>
      <Card title="在线测试">
        <Form
            name="invoke"
            layout="vertical"
            onFinish={onFinish}
        >
          <Form.Item
              label="请求参数"
              name="userRequestParams"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16}}>
            <Button type="primary" htmlType="submit">
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider/>
      <Card title="返回结果" loading={invokeLoading}>
        {invokeRes}
      </Card>
    </PageContainer>
  );
};

export default Index;
