import { useAddDepartmentMutation } from "@/services/department.service";
import { DepartmentRequest } from "@/types/department/DepartmentRequest";
import { Button, Form, Input, Space } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DepartmentCreate = () => {
	const navigate = useNavigate();
	const [addDepartment, { isLoading, isSuccess, error, isError, data }] =
		useAddDepartmentMutation();

	const createDepartment = (values: DepartmentRequest) => {
		addDepartment(values);
	};

	useEffect(() => {
		if (isSuccess) {
			console.log(data);
		}
	}, [isLoading]);

	return (
		<Space direction="vertical" style={{ display: "flex" }} size={"large"}>
			<h1 style={{ textAlign: "center" }}>Create a department</h1>
			<Form
				name="department"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 600 }}
				onFinish={createDepartment}
			>
				<Form.Item
					label="Department name"
					name="name"
					rules={[
						{
							required: true,
							message: "Please input department name!",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item label="Department description" name="description">
					<Input />
				</Form.Item>
				<Form.Item>
					<Space
						style={{
							display: "flex",
						}}
						size={"large"}
					>
						<Button onClick={() => navigate(-1)}>Go back</Button>
						<Button type="primary" htmlType="submit">
							Create
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</Space>
	);
};

export default DepartmentCreate;
