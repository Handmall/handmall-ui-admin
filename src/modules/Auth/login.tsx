import { Alert, Form, Space, Input, Button } from "antd";
import { useEffect } from "react";
import { LoginRequest } from "../../types/auth/LoginRequest";
import { useLoginMutation } from "@/services/auth.service";

const Login = () => {
	const [login, { isLoading, isSuccess, error, isError }] =
		useLoginMutation();

	useEffect(() => {
		isSuccess ? console.log("success") : console.log(error);
	}, [isLoading]);

	const onLogin = (values: LoginRequest) => {
		login(values);
	};

	return (
		<Space
			direction="horizontal"
			style={{
				width: "100%",
				height: "100vh",
				justifyContent: "center",
				backgroundColor: "white",
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
				{isError ? (
					<Alert
						message="Email or password is incorrect"
						type="warning"
						closable
						style={{
							marginBottom: "20px",
						}}
					/>
				) : null}
				<Form.Item
					label="Email"
					name="email"
					rules={[
						{
							required: true,
							message: "Please input your email!",
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
							message: "Please input your password!",
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
	);
};

export default Login;
