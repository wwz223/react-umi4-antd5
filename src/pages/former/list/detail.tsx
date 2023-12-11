import { useMemo, useState, useEffect, useCallback } from 'react';
import { useParams } from '@umijs/max';
import { FormGrid, Form, FormButtonGroup, Submit } from '@formily/antd-v5';
import { ISchema } from '@formily/react';
import { Button, Spin, message, Breadcrumb } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import { createForm, onFormMount, onFormSubmit } from '@formily/core';
import {
  addModel,
  updateModel,
  detailModel,
  queryModelTags,
  queryModelCategories,
} from '@/services/models';
import { getImageMsg } from '@/utils/image';
import { ModelTypeList, Sampleroptions } from './const';
import CommonSchemaField from '@/components/CommonSchemaField';

const schema = (isAdd: boolean): ISchema => ({
  type: 'object',
  properties: {
    modelName: {
      type: 'string',
      title: '模型名称',
      required: true,
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        gridSpan: 3,
      },
      'x-component': 'Input',
    },
    description: {
      type: 'string',
      title: '模型描述',
      required: true,
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        gridSpan: 3,
      },
      'x-component': 'Input.TextArea',
    },
    modelId: {
      type: 'number',
      title: '模型ID',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    modelType: {
      type: 'string',
      title: '模型类型',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      enum: ModelTypeList,
    },
    modelVersion: {
      type: 'string',
      title: '模型版本',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    modelVersionId: {
      type: 'number',
      title: '模型版本ID',
      required: true,
      'x-disabled': !isAdd,
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    baseModel: {
      type: 'string',
      title: '基础模型',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    baseModelType: {
      type: 'string',
      title: '基础模型类型',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    downloadCount: {
      type: 'number',
      title: '下载次数',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    commentCount: {
      type: 'number',
      title: '评论次数',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },

    ratingCount: {
      type: 'number',
      title: '评分次数',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },

    rating: {
      type: 'number',
      title: '评分',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },

    modelDisplayName: {
      type: 'string',
      title: '模型显示名称',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },

    nsfw: {
      type: 'boolean',
      title: '是否NSFW',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    poi: {
      type: 'boolean',
      title: '是否POI',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },

    trainedWords: {
      type: 'array.string',
      title: '触发词',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        mode: 'tags',
      },
    },
    downloadUrl: {
      type: 'string',
      title: '模型地址',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    priority: {
      type: 'number',
      title: '排序',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },

    samplerName: {
      type: 'string',
      title: '采样器名称',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      enum: Sampleroptions,
    },
    enable: {
      type: 'boolean',
      title: '是否启用',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    // version: {
    //   type: 'string',
    //   title: '版本',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Input',
    // },
    image: {
      type: 'string',
      title: '预览图',
      required: true,
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        gridSpan: 3,
      },
      'x-component': 'ImageUpload',
    },
    images: {
      type: 'array.string',
      title: '图片组',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        gridSpan: 3,
      },
      'x-component': 'ImageListUpload',
    },
    // images: {
    //   type: 'array',
    //   title: '图片组',
    //   'x-decorator': 'FormItem',
    //   'x-decorator-props': {
    //     gridSpan: 3,
    //   },
    //   'x-component': 'ArrayTable',
    //   items: {
    //     type: 'object',
    //     properties: {
    //       column1: {
    //         type: 'void',
    //         'x-component': 'ArrayTable.Column',
    //         'x-component-props': { width: 50, title: 'Sort', align: 'center' },
    //         properties: {
    //           sort: {
    //             type: 'void',
    //             'x-component': 'ArrayTable.SortHandle',
    //           },
    //         },
    //       },
    //       column3: {
    //         type: 'void',
    //         'x-component': 'ArrayTable.Column',
    //         'x-component-props': { width: 200, title: 'url' },
    //         properties: {
    //           a1: {
    //             type: 'string',
    //             'x-decorator': 'Editable',
    //             'x-component': 'ImageUpload',
    //           },
    //         },
    //       },
    //     },
    //   },
    // },

    categories: {
      type: 'string',
      title: '分类',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        mode: 'multiple',
      },
    },
    tags: {
      type: 'string',
      title: '标签',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        mode: 'multiple',
      },
    },
    runs: {
      type: 'number',
      title: '运行次数',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    pictures: {
      type: 'number',
      title: '生成图片数',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },

    favoriteCount: {
      type: 'number',
      title: '收藏次数',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    reactionsScore: {
      type: 'number',
      title: '反应分数',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    reactionLikeCount: {
      type: 'number',
      title: '点赞次数',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    reactionDislikeCount: {
      type: 'number',
      title: '点踩次数',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    source: {
      type: 'string',
      title: '来源',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    // steps: {
    //   type: 'number',
    //   title: '步数',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'SliderInput',
    //   'x-component-props': {
    //     min: 10,
    //     max: 40,
    //     step: 1,
    //   },
    // },
    // cfgScale: {
    //   type: 'number',
    //   title: 'CFG Scale',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'SliderInput',
    //   'x-component-props': {
    //     min: 1,
    //     max: 10,
    //     step: 1,
    //   },
    // },
    // seed: {
    //   type: 'string',
    //   title: '随机种子',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Input',
    //   'x-component-props': {
    //     min: -1,
    //   },
    // },
  },
});

const FormModal = () => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<any>();
  const params = useParams<{ modelId: string }>();

  const modelId = params.modelId;
  const isAdd = modelId === 'add';
  const potial_id = `update_model_form_${params.modelId}`;

  console.log('details', details);
  const formatImages = useCallback(
    async (imgs: string[]) => {
      console.log('details', { details, isAdd });
      let images = [];
      for (let url of imgs) {
        console.log('url', url);
        let img = null;
        if (!isAdd) {
          img = details?.images.find((i: any) => i.url === url);
        }
        console.log('img', img);
        if (img) {
          images.push(img);
        } else {
          const imgMsg = await getImageMsg(url);
          images.push({
            meta: {
              width: imgMsg.width,
              height: imgMsg.height,
            },
            url: url,
            nsfw: 'None',
          });
        }
      }
      console.log('images', images);
      return images;
    },
    [details, loading],
  );

  const refresh = () => {
    if (params.modelId === 'add' || !params.modelId) {
      form.setValues({});
      setLoading(false);
    } else {
      detailModel(params.modelId)
        .then((res) => {
          setDetails(res);
          const initialValues = {
            ...res,
            images: res?.images.map((item: any) => {
              return item.url;
            }),
          };
          form.setInitialValues(initialValues);
          setLoading(false);
        })
        .catch((err) => {
          console.log('err', err);
          setLoading(false);
        });
    }
  };

  const form = useMemo(
    () =>
      createForm({
        effects: () => {
          onFormMount(async (f) => {
            refresh();
            queryModelTags().then((tags) => {
              f.setFieldState('tags', (state) => {
                state.dataSource = tags.map((t: any) => ({
                  label: t.name,
                  value: t.id,
                }));
              });
            });
            queryModelCategories().then((categories) => {
              f.setFieldState('categories', (state) => {
                state.dataSource = categories.map((c: any) => ({
                  label: c.name,
                  value: c.id,
                }));
              });
            });
          });
          onFormSubmit((f) => {
            f.validate()
              .then(async () => {
                f.setSubmitting(true);
                setLoading(true);
                const removeKeys = [
                  'createdAt',
                  'updatedAt',
                  'version',
                  'deletedAt',
                  'baseModelId',
                  'priority',
                  'runs',
                  'pictures',
                  'favoriteCount',
                  'reactionsScore',
                  'reactionLikeCount',
                  'reactionDislikeCount',
                ];
                const values = f.values;
                Object.keys(values).map((k) => {
                  if (removeKeys.includes(k)) {
                    delete values[k];
                  }
                });
                let images = await formatImages(values.images);

                const data = {
                  ...values,
                  images,
                };
                const action = isAdd ? addModel : updateModel;
                action(data)
                  .then((res) => {
                    message.success('提交成功！');
                    f.setSubmitting(false);
                    setLoading(false);
                    // history.back();
                  })
                  .catch((err) => {
                    message.error('提交失败，请重试');
                    f.setSubmitting(false);
                    setLoading(false);
                  });
              })
              .catch((e: any) => {
                console.log('validate error', e);
                message.error('请检查表单填写是否正确！');
                return;
              });
          });
        },
      }),
    [params.modelId],
  );

  return (
    <PageContainer
      title={false}
      breadcrumbRender={() => [
        <Breadcrumb
          items={[
            {
              title: <a href="/former">模型管理</a>,
            },
            {
              title: <a href="/former/list">模型列表</a>,
            },
            {
              title: '模型详情',
            },
          ]}
        />,
      ]}
      style={{ backgroundColor: 'white' }}
    >
      <Spin spinning={loading}>
        <Form form={form} labelWidth={110} labelAlign="right" wrapperCol={12}>
          <FormGrid maxColumns={3}>
            <CommonSchemaField schema={schema(isAdd)} />
          </FormGrid>
          <FormButtonGroup.Sticky align="right">
            <FormButtonGroup.FormItem>
              <Submit>提交</Submit>
            </FormButtonGroup.FormItem>
          </FormButtonGroup.Sticky>
        </Form>
      </Spin>
    </PageContainer>
  );
};

export default FormModal;
