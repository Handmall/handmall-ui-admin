import mainHeroService from "@/services/mainHero.service";
import { MainHeroRequest } from "@/types/mainHero/MainHeroRequest";
import { useMutation } from "@tanstack/react-query";
import { Alert, Button, ColorPicker, Form, Input, message, Space, Upload } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { UploadOutlined } from '@ant-design/icons';

function MainHeroCreate() {
  const [imageBase64, setImageBase64] = useState<string>(""); 
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Hero added",
    });
    setTimeout(messageApi.destroy, 2000);
  };

  const mutation = useMutation({
    mutationFn: (newHero: MainHeroRequest) =>
      mainHeroService.addNew(newHero)
  });

  const createHero = (values: MainHeroRequest) => {
    const heroData: MainHeroRequest = {
      ...values,
      img: imageBase64, 
    };

    console.log("Values - " + values.description, values.borderColorHex, values.colorHex, values.title, values.imgUrl + " Img: " + imageBase64)

    mutation.mutate(heroData);
  };

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImageBase64(base64);
    };
    reader.readAsDataURL(file); 
    return false; 
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      success();
      setTimeout(() => {
        navigate("/mainHero");
      }, 2500);
    }
  }, [mutation]);

  return (
    <>
      {contextHolder}
      <Space
        direction="vertical"
        style={{ display: "flex" }}
        size={"large"}
      >
        {mutation.isError ? (
          <Alert
            message={`Error: ${mutation.error}`}
            type="warning"
            closable
            style={{
              marginBottom: "20px",
            }}
          />
        ) : null}
        <h1 style={{ textAlign: "center" }}>Create a Hero</h1>
        <Form
          name="hero"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={createHero}
        >
          <Form.Item
            label="Hero name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input hero name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Hero title"
            name="title"

          >
            <Input />
          </Form.Item>
          <Form.Item label="Hero description" name="description">
            <Input />
          </Form.Item>

          <Form.Item label="Upload image" name="img">
            <Upload
              beforeUpload={handleImageChange} // Şəkil base64-ə çevrilir
              listType="picture"
            >
              <Button type="primary" icon={<UploadOutlined />}>
                Upload Image
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Img URL" name="imgUrl">
            <Input />
          </Form.Item>

          {/* Color Hex */}
          <Form.Item label="Color Hex" name="colorHex">
            <ColorPicker
              defaultValue="#1677ff"
              showText={(color) => <span>Color Hex ({color.toHexString()})</span>}
            />
          </Form.Item>

          {/* Border Color Hex */}
          <Form.Item label="Border Color Hex" name="borderColorHex">
            <ColorPicker
              defaultValue="#1677ff"
              showText={(color) => (
                <span>Border Color Hex ({color.toHexString()})</span>
              )}
            />
          </Form.Item>

          <Form.Item>
            <Space
              style={{
                display: "flex",
                justifyContent: "center",
              }}
              size={"large"}
            >
              <Button onClick={() => navigate(-1)}>Go back</Button>
              <Button type="primary" htmlType="submit" loading={mutation.isPending}>
                Create
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Space>
    </>
  );
}

export default MainHeroCreate;
