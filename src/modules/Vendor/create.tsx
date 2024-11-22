import vendorService from "@/services/vendor.service";
import { VendorRequest } from "@/types/vendor/VendorRequestType.ts";
import { useMutation } from "@tanstack/react-query";
import { Alert, Button, Form, Input, message, Space } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

function VendorCreate() {

	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();

	const success = () => {
		messageApi.open({
			type: "success",
			content: "Vendor added",
		});
		setTimeout(messageApi.destroy, 2000);
	};

	const mutation = useMutation({
		mutationFn: (newVendor: VendorRequest) =>
			vendorService.addNew(newVendor)
	});

	const createVendor = (values: VendorRequest) => {
		mutation.mutate(values);
	}

	useEffect(() => {
		if (mutation.isSuccess) {
			success();
			setTimeout(() => {
				navigate("/vendor");
			}, 2500);
		}
	}, [mutation]);
	return (
		<div>
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
				<h1 style={{ textAlign: "center" }}>Create a vendor</h1>
				<Form
					name="vendor"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600 }}
					onFinish={createVendor}
				>
					<Form.Item
						label="Vendor name"
						name="name"
						rules={[
							{
								required: true,
								message: "Please input vendor name!",
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Phone number"
						name="phoneNumber"
						rules={[
							{
								required: true,
								message: "Please input phone number!"
							}
						]}>
						<Input />
					</Form.Item>


					<Form.Item label="Vendor description" name="description">
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
		</div>
	)
}

export default VendorCreate