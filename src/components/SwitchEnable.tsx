import { Switch, message } from 'antd';

export default ({
  checked,
  handleChange,
  trigger,
}: {
  checked: boolean;
  handleChange: () => Promise<any>;
  trigger: () => void;
}) => {
  return (
    <Switch
      checked={checked}
      checkedChildren="可用"
      unCheckedChildren="禁用"
      onClick={() => {
        handleChange()
          .then(() => {
            trigger();
            message.success('更新成功');
          })
          .catch(() => {
            trigger();
            message.error('更新失败');
          });
      }}
    />
  );
};
