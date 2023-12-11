import { RunTimeLayoutConfig } from '@umijs/max';

const layout: RunTimeLayoutConfig = (initialState) => {
  return {
    // logo: 'https://aws-langchain-upload.s3.us-east-1.amazonaws.com/13329b01-d794-437f-8455-89254a83abbf-logo.png',
    menu: {
      locale: false,
    },
    layout: 'mix',
    // breadcrumbRender: false,

    logout: () => {
      localStorage.clear();
      window.location.reload();
    },
    menuFooterRender: (props) => {
      if (props?.collapsed) return undefined;
      return (
        <p
          style={{
            textAlign: 'center',
            paddingBlockStart: 12,
          }}
        >
          Power by Heylisa
        </p>
      );
    },
  };
};

export default layout;
