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
  DatePicker,
  ArrayTable,
  ArrayItems
} from '@formily/antd-v5';
import { createSchemaField, connect, ISchema } from '@formily/react';
import ImageUpload from './ImageUpload';
import ImageListUpload from './ImageListUpload';
import SelectMultiple from './SelectMultiple';

const CommonSchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
    Switch,
    Space,
    NumberPicker,
    DatePicker,
    ArrayTable,
    ArrayItems,
    SelectMultiple: connect(SelectMultiple),
    ImageUpload: connect(ImageUpload),
    ImageListUpload: connect(ImageListUpload),
    FormGrid,
  },
});

export default CommonSchemaField;
