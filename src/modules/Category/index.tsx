import { Button, Space } from "antd"
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined'
import { useNavigate } from "react-router-dom"

const Category = () => {
	const navigate = useNavigate()

    return(
		<>
			<Space direction="vertical" style={{ display: 'flex' }} size={'large'}>
				<Button
					type="primary"
					icon={<PlusOutlined />}
					onClick={() => navigate("create")}
				>
					Add new
				</Button>
			</Space>
		</>

	)
}

export default Category