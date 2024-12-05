import tagService from "@/services/tag.service";
import { TagRequest } from "@/types/tag/TagRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert, Button, Form, Input, message, Space } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TagEdit = () => {
    const navigate = useNavigate();
	const { tagId } = useParams();
	const [messageApi, contextHolder] = message.useMessage();
	const [tagIdFromPath, setTagIdFromPath] = useState(0);

	useEffect(() => {
		if (tagId) {
			setTagIdFromPath(parseInt(tagId as string));
		}
	}, [tagId]);

	const success = () => {
		messageApi.open({
			type: "success",
			content: "Tag changed",
		});
		setTimeout(messageApi.destroy, 2000);
	};

	const fetchTag = async () => {
		const { data } = await tagService.getById(tagIdFromPath);
		return data;
	};

	const {
		data: tag,
		isError: isLoadError,
		error: loadError,
	} = useQuery({
		queryKey: ["tag", tagIdFromPath],
		queryFn: () => fetchTag(),
		enabled: tagIdFromPath != 0,
	});

	const mutation = useMutation({
		mutationFn: (updateTag: TagRequest) =>
			tagService.update(updateTag, tagIdFromPath),
	});

	const updateTagFun = (values: TagRequest) => {
		mutation.mutate(values);
	};

	useEffect(() => {
		if (mutation.isSuccess) {
			success();
			setTimeout(() => {
				navigate("/tag");
				window.location.reload();
			}, 2500);
		}
	}, [mutation]);

  return (
    <>
			{contextHolder}
			<Space
				direction="vertical"
				style={{
					display: "flex",
					width: "100%",
					justifyContent: "center",
				}}
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
				{tag ? (
					<>
						<h1 style={{ textAlign: "center" }}>Edit tag</h1>
						<Form
							name="tag"
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 16 }}
							style={{
								display: "flex",
								width: "75%",
								justifyContent: "center",
								flexDirection: "column",
							}}
							onFinish={updateTagFun}
							initialValues={tag}
						>
							<Form.Item label="Tag name" name="name">
								<Input />
							</Form.Item>
						
							<Form.Item>
								<Space
									direction="horizontal"
									style={{
										display: "flex",
										justifyContent: "center",
										width: "100%",
									}}
									size={"large"}
								>
									<Button onClick={() => navigate(-1)}>
										Back
									</Button>
									<Button
										type="primary"
										htmlType="submit"
										loading={mutation.isPending}
									>
										Edit
									</Button>
								</Space>
							</Form.Item>
						</Form>
					</>
				) : isLoadError ? (
					<Alert
						message={`Error while fetch ${loadError}`}
						type="warning"
						closable
						style={{
							marginBottom: "20px",
						}}
					/>
				) : null}
			</Space>
		</>
  )
}

export default TagEdit