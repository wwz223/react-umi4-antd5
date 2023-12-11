import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Spin } from 'antd';

export default ({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading?: boolean;
}) => {
  return (
    <PageContainer title={false}>
      <ProCard>
        <Spin spinning={loading}>{children}</Spin>
      </ProCard>
    </PageContainer>
  );
};
