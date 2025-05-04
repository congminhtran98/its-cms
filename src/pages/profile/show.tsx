import { useState, useEffect } from "react";
import { HttpError, useGetIdentity } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import {
  Form,
  Input,
  Typography,
  Card,
  Row,
  Col,
  Button,
  Space,
  message,
  Switch,
} from "antd";
import { getProfile } from "../../api/user";
import { IUser } from "../../types";

const { Title } = Typography;

export const ProfileShow = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [form] = Form.useForm();
  const { refetch: refetchIdentity } = useGetIdentity();

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getProfile();
        setUser(res);
      } catch (err) {
        message.error("Failed to load profile");
      }
    })();
  }, []);

  const { formProps: passwordFormProps } = useForm<{
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    resource: "users",
    action: "create",
    id: "me",
    meta: { action: "changePassword" },
    redirect: false,
    errorNotification: (error) => {
      return {
        message: "Error",
        description: error?.message || "Something went wrong",
        type: "error",
      };
    },
    successNotification: () => {
      return {
        message: "Success",
        description: "Password changed successfully",
        type: "success",
      };
    },
    onMutationSuccess: () => {
      setShowPasswordForm(false);
      form.resetFields();
    },
  });

  if (showPasswordForm) {
    return (
      <Card title={<Title level={3}>Change Password</Title>}>
        <Form
          {...passwordFormProps}
          form={form}
          layout="vertical"
          onFinish={async (values) => {
            if (values.newPassword !== values.confirmPassword) {
              return message.error("Passwords do not match");
            }
            const authProvider = (window as any).authProvider;
            const isValid = await authProvider.verifyPassword(
              values.currentPassword
            );
            if (!isValid) {
              return message.error("Current password is incorrect");
            }
            await passwordFormProps.onFinish?.(values);
            await refetchIdentity();
          }}
        >
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[{ required: true }]}
          >
            {" "}
            <Input.Password />{" "}
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[{ required: true }]}
          >
            {" "}
            <Input.Password />{" "}
          </Form.Item>
          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            rules={[{ required: true }]}
          >
            {" "}
            <Input.Password />{" "}
          </Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              {" "}
              Change Password{" "}
            </Button>
            <Button onClick={() => setShowPasswordForm(false)}>Cancel</Button>
          </Space>
        </Form>
      </Card>
    );
  }

  if (isEditing && user) {
    return (
      <Edit
        saveButtonProps={{ onClick: () => message.success("Saved") }}
        headerProps={{
          extra: null,
          title: <Title level={3}>Edit Profile</Title>,
        }}
      >
        <Form initialValues={user} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[{ required: true }]}
              >
                {" "}
                <Input />{" "}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[{ required: true }]}
              >
                {" "}
                <Input />{" "}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            {" "}
            <Input type="email" />{" "}
          </Form.Item>
        </Form>
      </Edit>
    );
  }

  return (
    <Card
      title={<Title level={3}>Profile</Title>}
      extra={
        <a onClick={() => setIsEditing(true)} href="#">
          Edit Profile
        </a>
      }
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Title level={5}>Full Name</Title>
          <p>{user?.fullName}</p>
        </Col>
        <Col span={12}>
          <Title level={5}>Phone Number</Title>
          <p>{user?.phoneNumber}</p>
        </Col>
      </Row>
      <Title level={5}>Email</Title>
      <p>{user?.email}</p>
      <Title level={5}>Role</Title>
      <p>{user?.role}</p>
      <Button type="link" onClick={() => setShowPasswordForm(true)}>
        Change Password
      </Button>
    </Card>
  );
};
