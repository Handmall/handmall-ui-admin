import { Outlet } from "react-router-dom"
import Header from "./AppHeader"
import Sidebar from "./Sidebar"
import { Layout } from 'antd'
import "../assets/scss/common.scss"

const { Content } = Layout

const AppLayout = () => {

    return (
        <Layout style={{ minHeight: '100vh' }}>
			<Sidebar/>
			<Layout>
				<Header />
				<Content style={{ margin: '0 16px' }}>
				<div
                    style={{
                        padding: 24,
                        minHeight: 360,
                        background: '#fff',
                    }}
                >
					<Outlet />
				</div>
				</Content>
			</Layout>
		</Layout>
    )
}

export default AppLayout