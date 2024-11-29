import vendorService from '@/services/vendor.service.ts';
import { VendorDetailResponse } from '@/types/vendor/VendorDetailResponse.ts';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Alert, Input, message, Space, Form, Button } from 'antd';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const VendorEdit = () => {
    const navigate = useNavigate();
    const { vendorId } = useParams();
    const [messageApi, contextHolder] = message.useMessage();
    const [vendorIdFromPath, setVendorIdFromPath] = useState(0);

    useEffect(() => {
        if (vendorId) {
            setVendorIdFromPath(parseInt(vendorId as string));
        }
    }, [vendorId]);

    const success = () => {
        messageApi.open({
            type: "success",
            content: "Vendor changed",
        });
        setTimeout(messageApi.destroy, 2000);
    };

    const fetchVendor = async () => {
        const { data } = await vendorService.getById(vendorIdFromPath)
        return data;
    }

    const {
        data: vendor,
        isError: isLoadError,
        error: loadError
    } = useQuery({
        queryKey: ["vendor", vendorIdFromPath],
        queryFn: fetchVendor,
        enabled: !!vendorIdFromPath,
    });

    const mutation = useMutation({
        mutationFn: (updateVendor: VendorDetailResponse) =>
            vendorService.update(updateVendor, vendorIdFromPath),
    })

    const updateVendorFun = (values: VendorDetailResponse) => {
        mutation.mutate(values)
        
    }

    useEffect(() => {
        if (mutation.isSuccess) {
            success();
            setTimeout(() => {
                navigate("/vendor");
                window.location.reload();
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
                {vendor ? (
                    <>
                        <h1 style={{ textAlign: "center" }}>Edit vendor</h1>
                        <Form
                            name="vendor"
                            initialValues={vendor}
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{
                                display: "flex",
                                width: "75%",
                                justifyContent: "center",
                                flexDirection: "column",
                            }}
                            onFinish={updateVendorFun}
                        >
                            <Form.Item label="Vendor name" name="name">
                                <Input />
                            </Form.Item>

                            <Form.Item label="First name" name="firstName">
                                <Input />
                            </Form.Item>

                            <Form.Item label="Last name" name="lastName">
                                <Input />
                            </Form.Item>

                            <Form.Item label="Email" name="email">
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Phone number"
                                name="phoneNumber"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Vendor description"
                                name="description"
                            >
                                <Input />
                            </Form.Item>
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
                ) : isLoadError ? (
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
    )
}

export default VendorEdit