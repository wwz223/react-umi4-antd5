import { Popconfirm, Button, message } from 'antd';

export default (props: {
  handleDelete: () => Promise<any>;
  trigger: () => void;
}) => {
  const { handleDelete, trigger } = props;
  return (
    <Popconfirm
      title="是否确定要删除？"
      onConfirm={() => {
        handleDelete()
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
  );
};
