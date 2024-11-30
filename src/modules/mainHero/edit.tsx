import mainHeroService from "@/services/mainHero.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
	Alert,
	Button,
	ColorPicker,
	Form,
	Image,
	Input,
	message,
	Space,
	Upload,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { MainHeroRequest } from "@/types/mainHero/MainHeroRequest";

function MainHeroEdit() {
	const navigate = useNavigate();
	const { mainHeroId } = useParams();
	const [messageApi, contextHolder] = message.useMessage();
	const [mainHeroIdFromPath, setMainheroIdFromPath] = useState(0);
	const [selectColorHex, setSelectColorHex] = useState("#1677ff");
	const [selectBorderColorHex, setSelectBorderColorHex] = useState("#1677ff");
	const [selectTextColorHex, setSelectTextColorHex] = useState("#1677ff");
	const [uploadImg, setUploadImg] = useState<File>();

	useEffect(() => {
		if (mainHeroId) {
			setMainheroIdFromPath(parseInt(mainHeroId as string));
		}
	}, [mainHeroId]);

	const success = () => {
		messageApi.open({
			type: "success",
			content: "Main Hero changed",
		});
		setTimeout(messageApi.destroy, 2000);
	};

	const fetchMainHero = async () => {
		const { data } = await mainHeroService.getById(mainHeroIdFromPath);
		console.log(data);
		return data;
	};

	const {
		data: hero,
		isError: isLoadError,
		error: loadError,
	} = useQuery({
		queryKey: ["mainHero", mainHeroIdFromPath],
		queryFn: fetchMainHero,
		enabled: !!mainHeroIdFromPath,
	});

	const mutation = useMutation({
		mutationFn: (updateHero: MainHeroRequest) =>
			mainHeroService.update(updateHero, mainHeroIdFromPath),
	});

	const updateHeroFun = (values: MainHeroRequest) => {
		const heroData: MainHeroRequest = {
			...values,
			img: uploadImg ?? null,
			imgUrl: uploadImg ? "" : hero?.imgUrl,
			colorHex: selectColorHex,
			borderColorHex: selectBorderColorHex,
            textColorHex: selectTextColorHex,
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
				window.location.reload();
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
				{hero ? (
					<>
						<h1 style={{ textAlign: "center" }}>Edit a Hero</h1>
						<Form
							initialValues={hero}
							name="hero"
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 16 }}
							style={{ maxWidth: 600 }}
							onFinish={updateHeroFun}
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
							<Form.Item
								label="Hero description"
								name="description"
							>
								<Input />
							</Form.Item>
							<Form.Item label="Old image" name="img">
								<div style={{ width: "72px", height: "72px" }}>
									<Image
										preview={false}
										src={
											import.meta.env.VITE_BE_PUBLIC +
											hero.imgUrl
										}
									/>
								</div>
							</Form.Item>
							<Form.Item label="Upload image" name="img">
								<Upload
									beforeUpload={handleImageChange}
									listType="picture"
									accept="image/*"
								>
									<Button
										type="primary"
										icon={<UploadOutlined />}
									>
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
										<span>
											Color Hex ({color.toHexString()})
										</span>
									)}
									onChangeComplete={(value) =>
										setSelectColorHex(value.toHexString())
									}
								/>
							</Form.Item>

							<Form.Item
								label="Border Color Hex"
								name="borderColorHex"
								initialValue={selectBorderColorHex}
							>
								<ColorPicker
									showText={(color) => (
										<span>
											Border Color Hex (
											{color.toHexString()})
										</span>
									)}
									onChangeComplete={(value) =>
										setSelectBorderColorHex(
											value.toHexString()
										)
									}
								/>
							</Form.Item>

                            <Form.Item
								label="Text Color Hex"
								name="textColorHex"
								initialValue={selectTextColorHex}
							>
								<ColorPicker
									showText={(color) => (
										<span>
											Text Color Hex (
											{color.toHexString()})
										</span>
									)}
									onChangeComplete={(value) =>
										setSelectTextColorHex(
											value.toHexString()
										)
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
										Update
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
	);
}

export default MainHeroEdit;
