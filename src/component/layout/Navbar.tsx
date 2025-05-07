import { Layout, Menu, Avatar, Dropdown, Space } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetIdentity, useLogout } from "@refinedev/core";
import {
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

import { IUser } from "../../types"; // Import your IUser type

const { Header } = Layout;

export const Navbar = () => {
  const location = useLocation();
  const selectedKey = location.pathname.split("/")[1] || "posts";

  const navigate = useNavigate();
  const { mutate: logout } = useLogout();
  const { data: user } = useGetIdentity<IUser>(); // IUser nếu có type

  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<ProfileOutlined />}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        <Link to="/settings">Settings</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="logout"
        danger
        icon={<LogoutOutlined />}
        onClick={() => logout()}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 24px",
        display: "flex",
        justifyContent: "end",
      }}
    >
      {/* <Menu mode="horizontal" selectedKeys={[selectedKey]} style={{ flex: 1 }}>
        <Menu.Item key="posts">
          <Link to="/posts">Posts</Link>
        </Menu.Item>
        <Menu.Item key="events">
          <Link to="/events">Events</Link>
        </Menu.Item>
      </Menu> */}

      <Dropdown overlay={menu} trigger={["click"]}>
        <Space style={{ cursor: "pointer" }}>
          <Avatar icon={<UserOutlined />} />
          {user?.fullName || "User"}
        </Space>
      </Dropdown>
    </Header>
  );
};
