import { Alert, Form, Space, Input, Button } from "antd"
import { useState } from "react"
import { LoginRequest } from "../../types/auth/LoginRequest"


const Login = () => {
	const [authError, setAuthError] = useState(false)

	const onLogin = (values: LoginRequest) => {
        console.log(values)
    }

    return (
        <Space
			direction="horizontal"
			style={{
				width: '100%',
				height: '100vh',
				justifyContent: 'center',
				backgroundColor: 'white',
			}}
		>
			<Form
				name="login"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 800 }}
				onFinish={onLogin}
				autoComplete="off"
			>
				{authError ? (
                    <Alert
                        message="Username or password is incorrect"
                        type="warning"
                        closable
                        style={{
                            marginBottom: '20px',
                        }}
                    />
                ) : null}
				<Form.Item
					label="Username"
					name="username"
					rules={[
						{
							required: true,
							message: 'Please input your username!',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: 'Please input your password!',
						},
					]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type="primary" htmlType="submit">
						Login
					</Button>
				</Form.Item>
			</Form>
        </Space>
    )
}

export default Login