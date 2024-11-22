import { Alert, Button, Empty, message, Popconfirm, Space } from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import Table, { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import vendorService from "@/services/vendor.service.ts";
import { VendorResponse } from "@/types/vendor/VendorResponseType.ts";

const Vendor = () => {

	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();

	const fetchVendors = async () => {
		const { data } = await vendorService.getAll();
		return data;
	}

	const { data: vendors, isError, error, } = useQuery({
		queryKey: ["vendors"],
		queryFn: () => fetchVendors()
	});

	const success = () => {
		messageApi.open({
			type: "success",
			content: "Vendor deleted",
		});
		setTimeout(messageApi.destroy, 2000);
	};

	const deleteVendorMutation = useMutation({
		mutationFn: (id: number) => vendorService.delete(id)
	});

	const deleteVendor = (id: number) => {
		deleteVendorMutation.mutate(id)
	}

	useEffect(() => {
		if (deleteVendorMutation.isSuccess) {
			success();
			setTimeout(() => {
				navigate(0);
			}, 2500);
		}
	}, [deleteVendorMutation]);

	const columns: ColumnsType<VendorResponse> = [
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
			title: "Phone Number",
			dataIndex: "phoneNumber",
			key: "phoneNumber",
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "desciption",
		},
		{
			title: "Action",
			key: "action",
			render: (_, record: VendorResponse) => (
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
						title="Delete the vendor"
						description="Are you sure to delete this vendor?"
						okText="Yes"
						cancelText="No"
						onConfirm={() => deleteVendor(record?.id)}
						okButtonProps={{
							loading: deleteVendorMutation.isPending,
						}}
					>
						<a key={_ + 1}>Delete</a>
					</Popconfirm>
				</Space>
			),
		},
	]

	return (
		<div>
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
				{vendors ? (
					<Table
						columns={columns}
						dataSource={vendors}
						rowKey={"id"}
					/>
				) : (
					<Empty />
				)}
			</Space>
		</div>
	);
};

export default Vendor;
