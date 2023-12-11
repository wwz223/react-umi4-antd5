import {
  FormDialog,
  FormItem,
  FormLayout,
  Input,
  Space,
  Switch,
  FormGrid,
  NumberPicker,
  Select,
} from '@formily/antd-v5';
import { createSchemaField, connect, ISchema } from '@formily/react';
import { Button, message } from 'antd';
import ImageUpload from '@/components/ImageUpload';
import ImageListUpload from '@/components/ImageListUpload';
import { updateModelCategory, addModelCategory } from '@/services/models';

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
    Switch,
    Space,
    NumberPicker,
    ImageUpload: connect(ImageUpload),
    ImageListUpload: connect(ImageListUpload),
    FormGrid,
  },
});

const FormModal = ({
  type,
  record,
  trigger,
}: {
  type: 'add' | 'update';
  record?: any;
  trigger?: () => void;
}) => {
  const portal_id =
    type === 'add' ? 'add_tags_form' : `update_tags_form_${record.id}`;
  return (
    <FormDialog.Portal id={portal_id}>
      <Button
        type={type === 'add' ? 'primary' : 'link'}
        onClick={() => {
          return FormDialog(
            {
              title: type === 'add' ? '新增' : '编辑',
              width: '50%',
            },
            () => {
              return (
                <FormLayout labelWidth={100} labelAlign="right" wrapperCol={18}>
                  <SchemaField
                    schema={{
                      type: 'object',
                      properties: {
                        name: {
                          type: 'string',
                          title: '名称',
                          required: true,
                          'x-decorator': 'FormItem',
                          'x-component': 'Input',
                        },
                        enable: {
                          type: 'string',
                          title: '是否启用',
                          required: true,
                          'x-visible': type === 'update',
                          'x-decorator': 'FormItem',
                          'x-component': 'Switch',
                        },
                      },
                    }}
                  />
                </FormLayout>
              );
            },
          )
            .forOpen((payload, next) => {
              if (type === 'add') next();
              next({
                initialValues: {
                  ...record,
                },
              });
            })
            .forConfirm((payload, next) => {
              console.log('payload', payload.values);
              const values = payload.values;
              const data =
                type === 'add'
                  ? values
                  : {
                      id: record.id,
                      name: values.name,
                      enable: values.enable,
                    };
              const action =
                type === 'add' ? addModelCategory : updateModelCategory;

              action(data)
                .then(() => {
                  message.success('提交成功');
                  next();
                  trigger?.();
                })
                .catch((err) => {
                  message.error('提交失败，请重试');
                  payload.setSubmitting(false);
                });
            })
            .forCancel((payload, next) => {
              next(payload);
            })
            .open()
            .then(console.log);
        }}
      >
        {type === 'add' ? '新增' : '编辑'}
      </Button>
    </FormDialog.Portal>
  );
};

export default FormModal;
