import {
  CalendarOutlined,
  UserOutlined,
  BellOutlined,
  TeamOutlined,
  ContactsOutlined,
  FileDoneOutlined,
  SettingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const { Sider } = Layout;

export const Sidebar = () => {
  const location = useLocation();
  const selectedKey = location.pathname.split("/")[1];
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      width={220}
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      style={{ background: "#fff" }}
    >
      <div
        style={{
          height: 64,
          padding: "16px",
          fontWeight: "bold",
          fontSize: 18,
          textAlign: "center",
        }}
      >
        {!collapsed ? "MBW Admin" : "MBW"}
      </div>

      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        defaultOpenKeys={["admin"]}
      >
        <Menu.Item key="posts" icon={<AppstoreOutlined />}>
          <Link to="/posts">Posts</Link>
        </Menu.Item>

        <Menu.Item key="events" icon={<CalendarOutlined />}>
          <Link to="/events">Events</Link>
        </Menu.Item>

        <Menu.Item key="users" icon={<UserOutlined />}>
          <Link to="/users">Users</Link>
        </Menu.Item>

        <Menu.SubMenu
          key="admin"
          icon={<SettingOutlined />}
          title="Administration"
        >
          <Menu.Item key="notifications" icon={<BellOutlined />}>
            <Link to="/notifications">Notifications</Link>
          </Menu.Item>
          <Menu.Item key="memberships" icon={<TeamOutlined />}>
            <Link to="/memberships">Memberships</Link>
          </Menu.Item>
          <Menu.Item key="event-registrations" icon={<FileDoneOutlined />}>
            <Link to="/event-registrations">Registrations</Link>
          </Menu.Item>
          <Menu.Item key="contacts" icon={<ContactsOutlined />}>
            <Link to="/contacts">Contacts</Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Sider>
  );
};
