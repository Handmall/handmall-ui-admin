import departmentService from "@/services/department.service.ts";
import { CategoryRequest } from "@/types/category/CategoryRequest.ts";
import categoryService from "@services/category.service.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert, Button, Form, Input, message, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const CategoryEdit = () => {
	const navigate = useNavigate();
	const { categoryId } = useParams();
	const [messageApi, contextHolder] = message.useMessage();
	const [categoryIdFromPath, setCategoryIdFromPath] = useState(0);

	useEffect(() => {
		if (categoryId) {
			setCategoryIdFromPath(parseInt(categoryId as string));
		}
	}, [categoryId]);

	const success = () => {
		messageApi.open({
			type: "success",
			content: "Category changed",
		});
		setTimeout(messageApi.destroy, 2000);
	};

	const fetchCategory = async () => {
		const { data } = await categoryService.getById(categoryIdFromPath);
		return data;
	};

	const fetchDepartments = async () => {
		const { data } = await departmentService.getAll();
		return data;
	};

	const {
		data: category,
		isError: isloadError,
		error: loadError,
	} = useQuery({
		queryKey: ["category", categoryIdFromPath],
		queryFn: () => fetchCategory(),
		enabled: categoryIdFromPath != 0,
	});

	const { data: departments } = useQuery({
		queryKey: ["departments"],
		queryFn: () => fetchDepartments(),
	});

	const mutation = useMutation({
		mutationFn: (updateCategory: CategoryRequest) =>
			categoryService.update(updateCategory, categoryIdFromPath),
	});

	const updateCategoryFun = (values: CategoryRequest) => {
		mutation.mutate(values);
	};

	useEffect(() => {
		if (mutation.isSuccess) {
			success();
			setTimeout(() => {
				navigate("/category");
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
				{category ? (
					<>
						<h1 style={{ textAlign: "center" }}>Edit category</h1>
						<Form
							name="category"
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 16 }}
							style={{
								display: "flex",
								width: "75%",
								justifyContent: "center",
								flexDirection: "column",
							}}
							onFinish={updateCategoryFun}
							initialValues={category}
						>
							<Form.Item label="Category name" name="name">
								<Input />
							</Form.Item>
				
							<Form.Item
								label="Category description"
								name="description"
							>
								<Input />
							</Form.Item>
							{departments ? (
						<Form.Item label="Department" name="departmentId">
							<Select
								showSearch
								placeholder="Select a department"
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
				) : isloadError ? (
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
};

export default CategoryEdit;
