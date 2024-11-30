import mainHeroService from "@services/mainHero.service.ts";
import { MainHeroResponse } from "@/types/mainHero/MainHeroResponse.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
	Alert,
	Badge,
	Button,
	Empty,
	Image,
	message,
	Popconfirm,
	Space,
} from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";

const MainHero = () => {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();

	const fetchHeroes = async () => {
		const { data } = await mainHeroService.getAll();
		return data;
	};

	const {
		isError,
		error,
		data: heroes,
	} = useQuery({
		queryKey: ["heroes"],
		queryFn: () => fetchHeroes(),
	});

	const success = () => {
		messageApi.open({
			type: "success",
			content: "Hero deleted",
		});
		setTimeout(messageApi.destroy, 2000);
	};

	const deleteHeroMutation = useMutation({
		mutationFn: (id: number) => mainHeroService.delete(id),
	});

	const deleteHero = (id: number) => {
		deleteHeroMutation.mutate(id);
	};

	useEffect(() => {
		if (deleteHeroMutation.isSuccess) {
			success();
			setTimeout(() => {
				navigate(0);
			}, 2500);
		}
	}, [deleteHeroMutation]);

	const columns: ColumnsType<MainHeroResponse> = [
		{
			title: "№",
			key: "index",
			render: (_, _record, index) => <b>{index + 1}</b>,
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Title",
			dataIndex: "title",
			key: "title",
		},
		{
			title: "Img",
			dataIndex: "imgUrl",
			key: "imgUrl",
			render: (imgUrl) => (
				<div style={{ width: "72px", height: "72px" }}>
					<Image
						preview={false}
						src={import.meta.env.VITE_BE_PUBLIC + imgUrl}
					/>
				</div>
			),
		},
		{
			title: "Color Hex",
			dataIndex: "colorHex",
			key: "colorHex",
			render: (colorHex) => (
				<span>
					{colorHex ? (
						<Badge color={colorHex} text={colorHex} />
					) : (
						"No color"
					)}
				</span>
			),
		},
		{
			title: "Border Color Hex",
			dataIndex: "borderColorHex",
			key: "borderColorHex",
			render: (borderColorHex) => (
				<span>
					{borderColorHex ? (
						<Badge color={borderColorHex} text={borderColorHex} />
					) : (
						"No color"
					)}
				</span>
			),
		},
		{
			title: "Text Color Hex",
			dataIndex: "textColorHex",
			key: "textColorHex",
			render: (textColorHex) => (
				<span>
					{textColorHex ? (
						<Badge color={textColorHex} text={textColorHex} />
					) : (
						"No color"
					)}
				</span>
			),
		},
		{
			title: "Action",
			key: "action",
			render: (_, record: MainHeroResponse) => (
				<Space size="middle">
					<a
						key={_}
						onClick={() => {
							navigate(`edit/${record.id}`);
						}}
					>
						Edit
					</a>
					<Popconfirm
						title="Delete the hero"
						description="Are you sure to delete this hero?"
						okText="Yes"
						cancelText="No"
						onConfirm={() => deleteHero(record?.id)}
						okButtonProps={{
							loading: deleteHeroMutation.isPending,
						}}
					>
						<a key={_ + 1}>Delete</a>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<>
			{contextHolder}
			{isError ? (
				<Alert
					message={`There is some error. ${error}`}
					type="warning"
					closable
					style={{
						marginBottom: "20px",
					}}
				/>
			) : null}
			<Space
				direction="vertical"
				style={{ display: "flex" }}
				size={"large"}
			>
				<Button
					type="primary"
					icon={<PlusOutlined />}
					onClick={() => navigate("create")}
				>
					Add new
				</Button>
				{heroes ? (
					<Table
						columns={columns}
						dataSource={heroes}
						rowKey={"id"}
					/>
				) : (
					<Empty />
				)}
			</Space>
		</>
	);
};

export default MainHero;
