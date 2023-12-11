import { deleteModelCategory, queryModelCategories } from '@/services/models';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { useRef } from 'react';
import FormModal from './form';
import { Button, Popconfirm, message } from 'antd';

const TableList = () => {
  const actionRef = useRef<ActionType>();

  const trigger = () => {
    actionRef.current?.reload();
  };

  const columns: ProColumns<any, 'text'>[] = [
    {
      title: '名称',
      dataIndex: 'name',
    },

    // {
    //   title: '是否启用',
    //   dataIndex: 'enable',
    //   valueType: 'switch',
    // },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_: any, record: any) => (
        <>
          <FormModal type="update" trigger={trigger} record={record} />
          <Popconfirm
            title="是否确定要删除？"
            onConfirm={() => {
              deleteModelCategory({ id: record.id })
                .then(() => {
                  trigger();
                  message.success('删除成功');
                })
                .catch(() => {
                  message.error('删除失败');
                });
            }}
          >
            <Button danger type="link">
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <PageContainer title={false}>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        // search={{
        //   labelWidth: 120,
        // }}
        search={false}
        toolBarRender={() => [<FormModal trigger={trigger} type="add" />]}
        request={async (params, sorter, filter) => {
          const res = await queryModelCategories();
          return {
            data: res,
            total: res.length,
            success: true,
          };
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
