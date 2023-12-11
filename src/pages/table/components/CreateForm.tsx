// import {
//   FormDialog,
//   FormItem,
//   FormLayout,
//   Input,
//   Space,
//   Switch,
//   FormGrid,
//   NumberPicker,
//   Select,
// } from '@formily/antd-v5';
// import { createSchemaField, connect } from '@formily/react';
// import { Button } from 'antd';
// import ImageUpload from '@/components/ImageUpload';
// import ImageListUpload from '@/components/ImageListUpload';

// const SchemaField = createSchemaField({
//   components: {
//     FormItem,
//     Input,
//     Select,
//     Switch,
//     Space,
//     NumberPicker,
//     ImageUpload: connect(ImageUpload),
//     ImageListUpload: connect(ImageListUpload),
//     FormGrid,
//   },
// });

// const schema = {
//   type: 'object',
//   properties: {
//     modelName: {
//       type: 'string',
//       title: '模型名称',
//       required: true,
//       'x-decorator': 'FormItem',
//       'x-decorator-props': {
//         gridSpan: 2,
//       },
//       'x-component': 'Input',
//     },
//     enable: {
//       type: 'boolean',
//       title: '是否启用',
//       required: true,
//       'x-decorator': 'FormItem',
//       'x-component': 'Switch',
//     },
//     description: {
//       type: 'string',
//       title: '模型描述',
//       required: true,
//       'x-decorator': 'FormItem',
//       'x-component': 'Input.TextArea',
//     },
//     modelType: {
//       type: 'string',
//       title: '模型类型',
//       required: true,
//       'x-decorator': 'FormItem',
//       'x-component': 'Select',
//       enum: ['checkpoint', 'lora'],
//     },
//     image: {
//       type: 'string',
//       title: '预览图',
//       required: true,
//       'x-decorator': 'FormItem',
//       'x-component': 'ImageUpload',
//     },
//     images: {
//       type: 'array.string',
//       title: '图片组',
//       required: true,
//       'x-decorator': 'FormItem',
//       'x-component': 'ImageListUpload',
//     },
//     version: {
//       type: 'number',
//       title: '版本',
//       required: true,
//       'x-decorator': 'FormItem',
//       'x-component': 'NumberPicker',
//     },
//     categories: {
//       type: 'string',
//       title: '类别',
//       required: true,
//       'x-decorator': 'FormItem',
//       'x-component': 'Select',
//       'x-component-props': {
//         mode: 'tags',
//       },
//     },
//     tags: {
//       type: 'string',
//       title: '标签',
//       required: true,
//       'x-decorator': 'FormItem',
//       'x-component': 'Select',
//       'x-component-props': {
//         mode: 'tags',
//       },
//     },
//     samplerName: {
//       type: 'string',
//       title: '采样器名称',
//       required: true,
//       'x-decorator': 'FormItem',
//       'x-component': 'Input',
//     },

//     steps: {
//       type: 'number',
//       title: '步数',
//       required: true,
//       'x-decorator': 'FormItem',
//       'x-component': 'NumberPicker',
//     },
//     cfgScale: {
//       type: 'number',
//       title: 'CFG Scale',
//       required: true,
//       'x-decorator': 'FormItem',
//       'x-component': 'NumberPicker',
//     },
//     seed: {
//       type: 'number',
//       title: '随机种子',
//       required: true,
//       'x-decorator': 'FormItem',
//       'x-component': 'NumberPicker',
//     },
//     source: {
//       type: 'string',
//       title: '来源',
//       required: true,
//       'x-decorator': 'FormItem',
//       'x-component': 'Input',
//     },
//   },
// };

// const FormModal: React.FC<{
//   type: 'add' | 'update';
//   record?: any;
// }> = ({ type = 'add', record }) => {
//   const portal_id = type === 'add' ? 'add_form' : `update_form_${record.id}`;
//   return (
//     <FormDialog.Portal id={portal_id}>
//       <Button
//         type={type === 'add' ? 'primary' : 'link'}
//         onClick={() => {
//           return FormDialog(
//             {
//               title: type === 'add' ? '新增模型' : '编辑模型',
//               width: '80%',
//             },
//             () => {
//               return (
//                 <FormLayout labelCol={4} labelAlign="right" wrapperCol={18}>
//                   <FormGrid maxColumns={2}>
//                     <SchemaField schema={schema} />
//                   </FormGrid>
//                 </FormLayout>
//               );
//             },
//           )
//             .forOpen((payload, next) => {
//               next({
//                 initialValues: {
//                   ...record,
//                   images: record?.images.map((item: any) => item.url),
//                 },
//               });
//             })
//             .forConfirm((payload, next) => {
//               console.log('payload', payload.values);
//               next(payload);
//             })
//             .forCancel((payload, next) => {
//               next(payload);
//             })
//             .open()
//             .then(console.log);
//         }}
//       >
//         {type === 'add' ? '新增' : '编辑'}
//       </Button>
//     </FormDialog.Portal>
//   );
// };

// export default FormModal;
