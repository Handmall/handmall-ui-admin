import { Button, Form, Input, Select, Space } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CategoryCreate = () => {
	const navigate = useNavigate();
	const { data: departments } = useGetDepartmentsQuery(1);
	const createCategory = () => {
		console.log("create");
	};

	return (
		<Space direction="vertical" style={{ display: "flex" }} size={"large"}>
			<h1 style={{ textAlign: "center" }}>Create a category</h1>
			<Form
				name="category"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 600 }}
				onFinish={createCategory}
			>
				<Form.Item
					label="Category name"
					name="name"
					rules={[
						{
							required: true,
							message: "Please input category name!",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item label="Category description" name="description">
					<Input />
				</Form.Item>
				{departments ? (
					<Form.Item label="Department" name="departmentId">
						<Select
							showSearch
							placeholder="Select a department"
							onChange={(value, options) => console.log()}
						>
							{departments.map((department, index) => (
								<Option key={index} value={department.id}>
									{department.name}
								</Option>
							))}
						</Select>
					</Form.Item>
				) : null}
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

export default CategoryCreate;
