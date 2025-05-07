import { useEffect, useState } from "react";
import { getProfile } from "../../api/user";
import { IUser } from "../../types";
import {
  Card,
  Row,
  Col,
  Avatar,
  Typography,
  Button,
  Space,
  Divider,
  Skeleton,
  message,
} from "antd";
import {
  UserOutlined,
  ReloadOutlined,
  EditOutlined,
  LockOutlined,
  PhoneOutlined,
  MailOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

export const ProfileShow: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await getProfile();
      setUser(res);
    } catch (err) {
      message.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <Card
      title="User Profile"
      extra={
        <Space>
          <Button icon={<ReloadOutlined />} onClick={fetchProfile}>
            Refresh
          </Button>
          <Button icon={<EditOutlined />} type="primary">
            Edit
          </Button>
        </Space>
      }
      style={{ maxWidth: 1800, margin: "0 auto" }}
    >
      {loading ? (
        <Skeleton active />
      ) : (
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={6} style={{ textAlign: "center" }}>
            <Avatar size={100} icon={<UserOutlined />} />
            <Title level={4} style={{ marginTop: 12 }}>
              {user?.fullName}
            </Title>
            <Text type="secondary">{user?.email}</Text>
          </Col>

          <Col xs={24} md={18}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Text strong>
                  <PhoneOutlined /> Phone Number
                </Text>
                <br />
                <Text>{user?.phoneNumber || "N/A"}</Text>
              </Col>
              <Col span={12}>
                <Text strong>
                  <IdcardOutlined /> Role
                </Text>
                <br />
                <Text>{user?.role}</Text>
              </Col>
            </Row>

            <Divider />

            <Button icon={<LockOutlined />} type="link">
              Change Password
            </Button>
          </Col>
        </Row>
      )}
    </Card>
  );
};
