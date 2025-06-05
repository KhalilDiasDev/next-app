import { useNotificationContext } from "@/context/notification";
import Icons from "@/data/icons";
import { GetProp, Image, Typography, Upload, UploadProps } from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { useState } from "react";

interface UploadTabProps {
  file?: LogoProps;
  onChange: (value?: LogoProps) => void;
  limitSize?: number;
  accept?: string;
  height?: number;
  width?: number;
  label?: string;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function UploadImageComponent({
  file,
  onChange,
  limitSize = 1,
  accept = ".png,.jpg,.jpeg,.svg",
  height = 100,
  width = 100,
  label,
}: UploadTabProps) {
  const { notification } = useNotificationContext();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handlePreview = async (item: UploadFile) => {
    let preview = file?.preview as string;
    if (!file?.preview) {
      preview = await getBase64(item.originFileObj as FileType);
    }

    setPreviewImage(preview);
    setPreviewOpen(true);
  };

  const handleImageChange = (upload?: UploadChangeParam<UploadFile<any>>) => {
    //Upload verification is undefined
    if (!upload) {
      onChange(undefined);
      return;
    }
    if (upload.file.status !== "removed" && upload?.file.originFileObj) {
      const fileSize = upload.file.originFileObj?.size || 0;
      if (fileSize > limitSize * 1024 * 1024) {
        notification.error({
          message: "Error uploading image",
          description: "The image must be smaller than 1MB!",
        });
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(upload.file.originFileObj);
      reader.onload = () =>
        onChange({
          file: upload?.file,
          preview: reader.result as string,
        });
    }
  };

  return (
    <div style={{ width, height }}>
      <Upload
        onRemove={() => handleImageChange(undefined)}
        multiple={false}
        listType="picture-card"
        onChange={handleImageChange}
        fileList={file?.file ? [file.file] : []}
        onPreview={handlePreview}
        accept={accept}
      >
        {file?.preview === undefined && (
          <div>
            <Icons.Photo size={20} style={{opacity:0.6}}/>
            <Typography>Upload {label}</Typography>
          </div>
        )}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
}
