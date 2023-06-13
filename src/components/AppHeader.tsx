import { Layout, Row, Col, Dropdown, Avatar, MenuProps } from 'antd'
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined'

const { Header } = Layout

const AppHeader = () => {

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <a>Logout</a>,
        },
    ]

    return (
		<Header style={{ padding: 0, background: '#fff' }}>
			<Row>
				<Col span={1} offset={22}>
                    <Dropdown menu={{ items }} placement="bottomRight">
						<Avatar icon={<UserOutlined />} />
                    </Dropdown>
                </Col>
			</Row>
		</Header>
    )
}

export default AppHeader