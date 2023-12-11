import React, { useState } from 'react';
import { Upload, message, UploadProps } from 'antd';
import {
  UploadOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { getToken } from '@/aop/request';

const ImageUpload = (props: any) => {
  const { value, valueType, onChange, ...otherProps } = props;
  const [loading, setLoading] = useState(false);
  const token = getToken() || '';
  const defaultProps: UploadProps = {
    name: 'file',
    listType: 'picture-card',
    action: process.env.PUBLIC_API_URL + '/files/upload', // 你的上传处理接口
    headers: {
      Authorization: 'Bearer ' + token.replaceAll('"', ''),
    },
    onChange(info: any) {
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }
      if (info.file.status === 'done') {
        if (info.file.response.code === 'OK') {
          setLoading(false);
          onChange(info?.file?.response?.data?.url);
          message.success(`${info.file.name} file uploaded successfully`);
        } else {
          setLoading(false);
          message.error(`${info.file.name} file upload failed.`);
        }
      } else if (info.file.status === 'error') {
        setLoading(false);
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    ...otherProps,
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Upload {...defaultProps} showUploadList={false}>
      {props.value && !loading ? (
        <img
          src={props.value}
          alt="avatar"
          className="object-contain border cursor-pointer w-[100px] h-[100px] max-h-[100px] max-w-[100px]"
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default ImageUpload;
