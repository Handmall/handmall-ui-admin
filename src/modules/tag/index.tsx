import tagService from "@/services/tag.service";
import { TagResponse } from "@/types/tag/TagResponse";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert, Button, Empty, message, Popconfirm, Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";

const TagIndex = () => {

    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const fetchData = async () => {
        const { data } = await tagService.getAll();
        return data;
    }

	const success = () => {
		messageApi.open({
			type: "success",
			content: "Tag deleted",
		});
		setTimeout(messageApi.destroy, 2000);
	};

    const deleteTagMutation = useMutation({
		mutationFn: (id: number) => tagService.delete(id),
	});

	const deleteTag = (id: number) => {
		deleteTagMutation.mutate(id);
	};

    useEffect(() => {
		if (deleteTagMutation.isSuccess) {
			success();
			setTimeout(() => {
				navigate(0);
			}, 2500);
		}
	}, [deleteTagMutation]);

    const { error, isError, data: tags} = useQuery({
        queryKey: ["tag"],
        queryFn: () => fetchData()
    })

    const columns: ColumnsType<TagResponse> = [
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
			title: "Action",
			key: "action",
			render: (_, record: TagResponse) => (
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
						title="Delete the tag"
						description="Are you sure to delete this tag?"
						okText="Yes"
						cancelText="No"
						onConfirm={() => deleteTag(record?.id)}
						okButtonProps={{
							loading: deleteTagMutation.isPending,
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
        {tags ? (
            <Table
                columns={columns}
                dataSource={tags}
                rowKey={"id"}
            />
        ) : (
            <Empty />
        )}
    </Space>
</>
  )
}

export default TagIndex