import { useGetDepartmentsQuery } from "@/services/department.service";
import { DepartmentResponse } from "@/types/department/DepartmentResponse";
import { Button, Empty, Popconfirm, Space } from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import Table, { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";

const Department = () => {
	const navigate = useNavigate();
	const { data: departments } = useGetDepartmentsQuery(1);

	const columns: ColumnsType<DepartmentResponse> = [
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
			title: "Action",
			key: "action",
			render: (_, record: DepartmentResponse) => (
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
						title="Delete the department"
						description="Are you sure to delete this department?"
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
				{departments ? (
					<Table
						columns={columns}
						dataSource={departments}
						rowKey={"id"}
					/>
				) : (
					<Empty />
				)}
			</Space>
		</>
	);
};

export default Department;
