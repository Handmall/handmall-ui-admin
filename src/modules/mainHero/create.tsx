import mainHeroService from "@services/mainHero.service.ts";
import { MainHeroRequest } from "@/types/mainHero/MainHeroRequest.ts";
import { useMutation } from "@tanstack/react-query";
import {
	Alert,
	Button,
	ColorPicker,
	Form,
	Input,
	message,
	Space,
	Upload,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";

const MainHeroCreate = () => {
	// useState icinde "" qoyusansa string ehtiyac yoxdi, 0 qoyusansa number yazmaga ehtiyac yoxdi
	//const [imageBase64, setImageBase64] = useState<string>("");
	// burda ici bowdi, ona gore type olaraq vermiwem ona
	const [uploadImg, setUploadImg] = useState<File>();
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();
	const [selectColorHex, setSelectColorHex] = useState("#1677ff");
	const [selectBorderColorHex, setSelectBorderColorHex] = useState("#1677ff");

	const success = () => {
		messageApi.open({
			type: "success",
			content: "Hero added",
		});
		setTimeout(messageApi.destroy, 2000);
	};

	const mutation = useMutation({
		mutationFn: (newHero: MainHeroRequest) =>
			mainHeroService.addNew(newHero),
	});

	const createHero = (values: MainHeroRequest) => {
		const heroData: MainHeroRequest = {
			...values,
			img: uploadImg ?? null,
			colorHex: selectColorHex,
			borderColorHex: selectBorderColorHex,
		};
		mutation.mutate(heroData);
	};

	const handleImageChange = (file: File) => {
		setUploadImg(file);
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
					<Form.Item label="Hero title" name="title">
						<Input />
					</Form.Item>
					<Form.Item label="Hero description" name="description">
						<Input />
					</Form.Item>

					<Form.Item label="Upload image" name="img">
						<Upload
							beforeUpload={handleImageChange}
							listType="picture"
							accept="image/*"
						>
							<Button type="primary" icon={<UploadOutlined />}>
								Upload Image
							</Button>
						</Upload>
					</Form.Item>

					<Form.Item
						label="Color Hex"
						name="colorHex"
						initialValue={selectColorHex}
					>
						<ColorPicker
							showText={(color) => (
								<span>Color Hex ({color.toHexString()})</span>
							)}
							onChangeComplete={(value) =>
								setSelectColorHex(value.toHexString())
							}
						/>
					</Form.Item>

					{/* Border Color Hex */}
					<Form.Item
						label="Border Color Hex"
						name="borderColorHex"
						initialValue={selectBorderColorHex}
					>
						<ColorPicker
							showText={(color) => (
								<span>
									Border Color Hex ({color.toHexString()})
								</span>
							)}
							onChangeComplete={(value) =>
								setSelectBorderColorHex(value.toHexString())
							}
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
	);
};

export default MainHeroCreate;
