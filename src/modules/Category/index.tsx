import { Button, Empty, Popconfirm, Space } from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "@/services/category.service";
import Table, { ColumnsType } from "antd/es/table";
import { CategoryResponse } from "@/types/category/CategoryResponse";

const Category = () => {
	const navigate = useNavigate();
	const { data: categories } = useGetCategoriesQuery(1);

	const columns: ColumnsType<CategoryResponse> = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Department",
			dataIndex: "departmentName",
			key: "departmentName",
		},
		{
			title: "Action",
			key: "action",
			render: (_, record: CategoryResponse) => (
				<Space size="middle">
					<a
						key={_}
						onClick={() => {
							console.log("aa");
						}}
					>
						Edit {record.name}
					</a>
					<Popconfirm
						title="Delete the category"
						description="Are you sure to delete this category?"
						okText="Yes"
						cancelText="No"
						onConfirm={() => console.log(record?.id)}
					>
						<a key={_ + 1}>Delete</a>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<>
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
				{categories ? (
					<Table
						columns={columns}
						dataSource={categories}
						rowKey={"id"}
					/>
				) : (
					<Empty />
				)}
			</Space>
		</>
	);
};

export default Category;
