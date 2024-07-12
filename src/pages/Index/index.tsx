import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { List, message } from 'antd';
import {
  listInterfaceInfoByPageUsingPost,
  listInterfaceInfoVoByPageUsingPost
} from '@/services/api-backend/interfaceInfoController';

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const [total, setTotal] = useState<number>(0);
  const defaultPageSize: number = 5;

  const loadData = async (current = 1, pageSize = defaultPageSize) => {
    setLoading(true);
    try {
      const res = await listInterfaceInfoVoByPageUsingPost({
        current,
        pageSize,
      });
      setList(res?.data?.records ?? []);
      setTotal(res?.data?.total ?? 0);
    } catch (error: any) {
      message.error(error.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageContainer title={'在线接口平台'}>
      <List
        className="interface-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => {
          const apiLink = `/interface_info/${item.id}`;
          return (
            <List.Item
              actions={[
                <a key={item.id} href={apiLink}>
                  查看
                </a>,
              ]}
            >
              <List.Item.Meta
                title={<a href={apiLink}>{item.name}</a>}
                description={item.description}
              />
            </List.Item>
          );
        }}
        pagination={{
          showTotal(total) {
            return '总数: ' + total;
          },
          pageSize: defaultPageSize,
          total: total,
          onChange(page, pageSize) {
            loadData(page, pageSize);
          },
        }}
      />
    </PageContainer>
  );
};

export default Index;
