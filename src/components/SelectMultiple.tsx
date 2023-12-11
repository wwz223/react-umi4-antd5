import { Select } from '@formily/antd-v5';
import { SelectProps } from 'antd';

export default (props: SelectProps) => {
  return (
    <Select
      mode="multiple"
      style={{ width: '100%' }}
      placeholder="Please select"
      defaultValue={['a10', 'c12']}
      optionLabelProp="label"
      {...props}
    />
  );
};
