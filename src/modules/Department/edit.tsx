import { message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DepartmentEdit = () => {
	const navigate = useNavigate();
	const { departmentId } = useParams();
	const [messageApi, contextHolder] = message.useMessage();
	const [departmentIdFromPath, setDepartmentIdFromPath] = useState(0);

	useEffect(() => {
		if (departmentId) {
			setDepartmentIdFromPath(parseInt(departmentId as string));
		}
	}, [departmentId]);

	return <h1>Edit a department</h1>;
};

export default DepartmentEdit;
