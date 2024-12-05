import tagService from "@/services/tag.service";
import { TagRequest } from "@/types/tag/TagRequest";
import { useMutation } from "@tanstack/react-query";
import { Alert, Button, Form, Input, message, Space } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TagCreate = () => {

    const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();

	const success = () => {
		messageApi.open({
			type: "success",
			content: "Tag added",
		});
		setTimeout(messageApi.destroy, 2000);
	};

    const mutation = useMutation({
		mutationFn: (newTag: TagRequest) =>
			tagService.addNew(newTag),
	});

	const createTag = (values: TagRequest) => {
		mutation.mutate(values);
	};

    useEffect(() => {
		if (mutation.isSuccess) {
			success();
			setTimeout(() => {
				navigate("/tag");
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
        <h1 style={{ textAlign: "center" }}>Create a tag</h1>
        <Form
            name="tag"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={createTag}
        >
            <Form.Item
                label="Tag name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Please input tag name!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Space
                    style={{
                        display: "flex",
                    }}
                    size={"large"}
                >
                    <Button onClick={() => navigate(-1)}>
                        Go back
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={mutation.isPending}
                    >
                        Create
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    </Space>
</>
  )
}

export default TagCreate