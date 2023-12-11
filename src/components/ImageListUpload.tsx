import React, { useState, useEffect } from 'react';
import {
  Upload,
  Button,
  message,
  UploadProps,
  Modal,
  UploadFile,
  Image,
} from 'antd';
import {
  UploadOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { getToken } from '@/aop/request';

const ImageListUpload = (props: any) => {
  const { value = [], valueType, onChange, ...otherProps } = props;
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImageCount, setPreviewImageCount] = useState<number>(-1);
  const [previewTitle, setPreviewTitle] = useState('');
  const token = getToken() || '';

  useEffect(() => {
    setFileList(
      value?.map((item: any) => {
        return {
          uid: item,
          name: item,
          status: 'done',
          url: item,
        };
      }) || [],
    );
  }, [value]);

  const defaultProps: UploadProps = {
    name: 'file',
    listType: 'picture-card',
    action: process.env.PUBLIC_API_URL + '/files/upload', // 你的上传处理接口
    headers: {
      Authorization: 'Bearer ' + token.replaceAll('"', ''),
    },
    onChange(info: any) {
      console.log('info', info);
      setFileList(info.fileList);

      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }
      if (info.file.status === 'done') {
        if (info.file.response.code === 'OK') {
          setLoading(false);
          const newList = info.fileList.filter(
            (file: any) => file.status === 'done',
          );
          console.log(
            'info.file.response.data.url',
            info.file.response.data.url,
          );
          onChange([...(props.value || []), info.file.response.data.url]);
        } else {
          setLoading(false);
          message.error(`${info.file.name} file upload failed.`);
        }
      } else if (info.file.status === 'error') {
        setLoading(false);
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    showUploadList: {
      showDownloadIcon: true,
      showPreviewIcon: true,
      showRemoveIcon: true,
    },
    fileList,
    ...otherProps,
  };
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    setPreviewImageCount(value.indexOf(file.url || (file.preview as string)));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
    );
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload {...defaultProps} onPreview={handlePreview}>
        {fileList.length >= props.maxCount ? null : uploadButton}
      </Upload>
      {previewOpen && previewImageCount >= 0 && (
        <Image.PreviewGroup
          preview={{
            visible: previewOpen,
            // title: previewTitle,
            current: previewImageCount,
            onChange: (index) => {
              setPreviewImageCount(index);
            },
            onVisibleChange: (visible) => {
              if (!visible) {
                handleCancel();
              }
            },
          }}
          items={value}
        />
      )}
    </>
  );
};

export default ImageListUpload;
