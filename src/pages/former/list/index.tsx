import {
  queryModelList,
  queryModelTags,
  queryModelCategories,
} from '@/services/models';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { ModelTypeList } from './const';

const TableList = () => {
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  const actionRef = useRef<ActionType>();

  // useEffect(() => {
  //   queryModelTags().then((tags) => {
  //     setTags(
  //       tags.map((t: any) => ({
  //         label: t.name,
  //         value: t.id,
  //       })),
  //     );
  //   });
  //   queryModelCategories().then((categories) => {
  //     setCategories(
  //       categories.map((c: any) => ({
  //         label: c.name,
  //         value: c.id,
  //       })),
  //     );
  //   });
  // }, []);

  const columns: ProColumns<any, 'text'>[] = [
    {
      title: 'ID',
      dataIndex: 'modelId',
    },
    {
      title: '预览图',
      dataIndex: 'image',
      valueType: 'image',
      render: (_, record) => {
        return (
          <img
            src={record.image}
            style={{ width: '100px', height: 'auto' }}
          ></img>
        );
      },
    },
    {
      title: '名称',
      dataIndex: 'modelName',
    },
    {
      title: '模型类型',
      dataIndex: 'modelType',
    },
    // {
    //   title: '标签',
    //   dataIndex: 'tags',
    //   valueType: 'select',
    //   proFieldProps: {
    //     mode: 'read',
    //     options: tags,
    //   }
    // },
    // {
    //   title: '描述',
    //   dataIndex: 'description',
    //   valueType: 'text',
    // },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_: any, record: any) => (
        <>
          <Button
            type="link"
            onClick={() => history.push(`/former/${record.id}`)}
          >
            编辑
          </Button>
        </>
      ),
    },
  ];

  return (
    <PageContainer title={false}>
      <ProTable<API.UserInfo>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        // search={{
        //   labelWidth: 120,
        // }}
        search={false}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => history.push('/former/add')}
          >
            新建
          </Button>,
        ]}
        request={async (params) => {
          const res = await queryModelList(
            {
              page: params.current,
              limit: params.pageSize,
              sortBy: 'createdAt:DESC',
            },
            {},
          );
          return {
            data: res.data,
            total: res.meta.totalItems,
            success: true,
          };
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
