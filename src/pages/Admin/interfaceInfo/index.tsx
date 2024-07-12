import CreateModal from '@/pages/Admin/interfaceInfo/components/CreateModal';
import UpdateModal from '@/pages/Admin/interfaceInfo/components/UpdateModal';
import ViewModal from '@/pages/Admin/interfaceInfo/components/ViewModal';
import {
  addInterfaceInfoUsingPost,
  deleteInterfaceInfoUsingPost,
  listInterfaceInfoByPageUsingPost,
  offlineInterfaceInfoUsingPost,
  onlineInterfaceInfoUsingPost,
  updateInterfaceInfoUsingPost,
} from '@/services/api-backend/interfaceInfoController';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { PageContainer, ProDescriptions, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';

const TableList: React.FC = () => {
  /**
   * 新建弹窗
   */
  const [createModalOpen, handleCreateModalOpen] = useState<boolean>(false);
  /**
   * 修改弹窗
   */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [viewModalOpen, handleViewModalOpen] = useState<boolean>(false);
  const [viewTitle, setViewTitle] = useState<string>('');
  const [viewValue, setViewValue] = useState<string>('');
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  /**
   * 选择单行
   */
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfo>();

  /**
   * 新增触发方法
   * @param fields
   */
  const handleAdd = async (fields: API.InterfaceInfo) => {
    const hide = message.loading('正在添加');
    try {
      await addInterfaceInfoUsingPost({
        ...fields,
      });
      hide();
      message.success('创建成功');
      handleCreateModalOpen(false);
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('创建失败, ' + error.message);
      return false;
    }
  };

  /**
   * 修改触发
   * @param fields
   */
  const handleUpdate = async (fields: API.InterfaceInfo) => {
    if (!currentRow) {
      return;
    }
    const hide = message.loading('修改中');
    try {
      await updateInterfaceInfoUsingPost({
        id: currentRow?.id,
        ...fields,
      });
      hide();
      message.success('修改成功');
      handleUpdateModalOpen(false);
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error(error.message);
      return false;
    }
  };

  /**
   * 删除触发方法
   * @param selectedRows
   */
  const handleRemove = async (record: API.InterfaceInfo) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await deleteInterfaceInfoUsingPost({
        id: record.id,
      });
      hide();
      message.success('删除成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error(error.message);
      return false;
    }
  };

  /**
   * 接口上线
   * @param record
   */
  const handleOnline = async (record: API.IdRequest) => {
    const hide = message.loading('发布中');
    if (!record) return true;
    try {
      await onlineInterfaceInfoUsingPost({
        id: record.id,
      });
      hide();
      message.success('发布成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error(error.message);
      return false;
    }
  };

  /**
   * 接口下线
   * @param record
   */
  const handleOffline = async (record: API.IdRequest) => {
    const hide = message.loading('下线中');
    if (!record) return true;
    try {
      await offlineInterfaceInfoUsingPost({
        id: record.id,
      });
      hide();
      message.success('下线成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error(error.message);
      return false;
    }
  };

  const columns: ProColumns<API.InterfaceInfo>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      valueType: 'index',
    },
    {
      title: '接口名称',
      dataIndex: 'name',
      valueType: 'text',
      align: 'center',
      formItemProps: {
        rules: [{ required: true, message: '接口名称为空' }],
      },
    },
    {
      title: '接口描述',
      align: 'center',
      dataIndex: 'description',
      valueType: 'textarea',
      ellipsis: true,
      hideInSearch: true,
      formItemProps: {
        rules: [{ required: true, message: '接口描述为空' }],
      },
      render: (_, record) => [
        <Button
          key="view"
          onClick={() => {
            handleViewModalOpen(true);
            setViewTitle('接口描述');
            setViewValue(record.description || '');
          }}
        >
          查看
        </Button>,
      ],
    },
    {
      title: '请求方法',
      align: 'center',
      dataIndex: 'method',
      valueType: 'text',
      formItemProps: {
        rules: [{ required: true, message: '请求方法为空' }],
      },
    },
    {
      title: '接口地址',
      align: 'center',
      dataIndex: 'url',
      formItemProps: {
        rules: [{ required: true, message: '接口地址为空' }],
      },
      render: (_, record) => [
        <Button
          key="view"
          onClick={() => {
            handleViewModalOpen(true);
            setViewTitle('接口地址');
            setViewValue(record.url || '');
          }}
        >
          查看
        </Button>,
      ],
    },
    {
      title: '请求参数',
      align: 'center',
      dataIndex: 'requestParams',
      hideInSearch: true,
      render: (_, record) => [
        <Button
          key="view"
          onClick={() => {
            handleViewModalOpen(true);
            setViewTitle('请求参数');
            setViewValue(record.requestParams || '');
          }}
        >
          查看
        </Button>,
      ],
    },
    {
      title: '请求头',
      align: 'center',
      dataIndex: 'requestHeader',
      hideInSearch: true,
      render: (_, record) => [
        <Button
          key="view"
          onClick={() => {
            handleViewModalOpen(true);
            setViewTitle('请求头');
            setViewValue(record.requestHeader || '');
          }}
        >
          查看
        </Button>,
      ],
    },
    {
      title: '响应头',
      align: 'center',
      dataIndex: 'responseHeader',
      hideInSearch: true,
      render: (_, record) => [
        <Button
          key="view"
          onClick={() => {
            handleViewModalOpen(true);
            setViewTitle('响应头');
            setViewValue(record.responseHeader || '');
          }}
        >
          查看
        </Button>,
      ],
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '开启',
          status: 'Processing',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      align: 'center',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <div
          style={{
            display: 'flex', // 使用Flexbox布局
            flexWrap: 'wrap', // 允许按钮换行
            alignItems: 'center',
            justifyContent: 'space-around', // 对齐方式
            overflow: 'auto', // 自动滚动，如果内容超出
            maxWidth: '100%', // 最大宽度为单元格宽度
          }}
        >
          <Button
            key="update"
            type="text"
            onClick={() => {
              handleUpdateModalOpen(true);
              setCurrentRow(record);
            }}
          >
            修改
          </Button>
          {record.status === 0 ? (
            <Button
              key="online"
              type="text"
              onClick={() => {
                handleOnline(record);
                setCurrentRow(record);
              }}
            >
              发布
            </Button>
          ) : null}
          {record.status === 1 ? (
            <Button
              danger
              key="offline"
              type="text"
              onClick={() => {
                handleOffline(record);
                setCurrentRow(record);
              }}
            >
              下线
            </Button>
          ) : null}
          <Button
            danger
            key="remove"
            type="text"
            onClick={() => {
              handleRemove(record);
            }}
          >
            删除
          </Button>
        </div>
      ),
    },
  ];

  // @ts-ignore
  return (
    <PageContainer>
      <div style={{ margin: '0 auto' }}>
        <ProTable<API.RuleListItem, API.PageParams>
          actionRef={actionRef}
          rowKey="key"
          search={{
            labelWidth: 120,
          }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                handleCreateModalOpen(true);
              }}
            >
              <PlusOutlined /> 新建
            </Button>,
          ]}
          request={async (params: { pageSize?: number; current?: number; keyword?: string }) => {
            const res: any = await listInterfaceInfoByPageUsingPost({
              ...params,
            });
            if (res?.data) {
              return {
                data: res?.data.records || [],
                success: true,
                total: res.data.total || 0,
              };
            } else {
              return {
                data: [],
                success: false,
                total: 0,
              };
            }
          }}
          columns={columns}
        />

        <Drawer
          width={600}
          open={showDetail}
          onClose={() => {
            setCurrentRow(undefined);
            setShowDetail(false);
          }}
          closable={false}
        >
          {currentRow?.name && (
            <ProDescriptions<API.RuleListItem>
              column={2}
              title={currentRow?.name}
              request={async () => ({
                data: currentRow || {},
              })}
              params={{
                id: currentRow?.name,
              }}
              columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
            />
          )}
        </Drawer>

        <CreateModal
          columns={columns}
          onCancel={() => {
            handleCreateModalOpen(false);
          }}
          onSubmit={async (values) => {
            await handleAdd(values);
          }}
          visible={createModalOpen}
        />
        <UpdateModal
          columns={columns}
          onCancel={() => {
            handleUpdateModalOpen(false);
          }}
          onSubmit={async (value) => {
            await handleUpdate(value);
            setCurrentRow(undefined);
          }}
          visible={updateModalOpen}
          values={currentRow || {}}
        />
        <ViewModal
          title={viewTitle}
          values={viewValue}
          onCancel={() => handleViewModalOpen(false)}
          visible={viewModalOpen}
        />
      </div>
    </PageContainer>
  );
};
export default TableList;
