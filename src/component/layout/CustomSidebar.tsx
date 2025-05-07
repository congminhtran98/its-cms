import { Layout, Menu, Button } from "antd";
import {
  UnorderedListOutlined,
  CalendarOutlined,
  UserOutlined,
  BellOutlined,
  TeamOutlined,
  ContactsOutlined,
  FileDoneOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const { Sider } = Layout;

export const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const selectedKey = location.pathname.split("/")[1] || "posts";

  return (
    <Sider
      width={220}
      collapsible
      collapsed={collapsed}
      trigger={null}
      style={{
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // 👈 đẩy collapse xuống đáy
        position: "relative",
        height: "100vh",
      }}
    >
      {/* Logo + Menu */}
      <div>
        <div
          style={{
            margin: "16px",
            marginLeft: collapsed ? "16px" : "26px",
            fontWeight: "bold",
            fontSize: 18,
            textAlign: collapsed ? "center" : "left",
          }}
        >
          {collapsed ? "ITS" : "ITS Admin"}
        </div>

        <Menu mode="inline" selectedKeys={[selectedKey]}>
          <Menu.Item key="posts" icon={<UnorderedListOutlined />}>
            <Link to="/posts">Posts</Link>
          </Menu.Item>
          <Menu.Item key="events" icon={<CalendarOutlined />}>
            <Link to="/events">Events</Link>
          </Menu.Item>
          <Menu.Item key="users" icon={<UserOutlined />}>
            <Link to="/users">Users</Link>
          </Menu.Item>
          {/* <Menu.Item key="notifications" icon={<BellOutlined />}>
            <Link to="/notifications">Notifications</Link>
          </Menu.Item> */}
          <Menu.Item key="memberships" icon={<TeamOutlined />}>
            <Link to="/memberships">Memberships</Link>
          </Menu.Item>
          <Menu.Item key="event-registrations" icon={<FileDoneOutlined />}>
            <Link to="/event-registrations">Event Registrations</Link>
          </Menu.Item>
          {/* <Menu.Item key="contacts" icon={<ContactsOutlined />}>
            <Link to="/contacts">Contacts</Link>
          </Menu.Item> */}
        </Menu>
      </div>

      {/* Collapse toggle button */}
      <div
        style={{
          padding: 12,
          textAlign: "center",
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <Button
          type="text"
          icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>
    </Sider>
  );
};

// src/components/layout/Sidebar.tsx
// import { useMenu, CanAccess, Link } from "@refinedev/core";
// import { Layout, Menu } from "antd";
// import { useState } from "react";

// const { Sider } = Layout;

// export const Sidebar = () => {
//   const { menuItems, selectedKey, defaultOpenKeys } = useMenu();
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <Sider
//       collapsible
//       collapsed={collapsed}
//       onCollapse={(value) => setCollapsed(value)}
//       width={200}
//       style={{ background: "#fff" }}
//     >
//       <Menu
//         mode="inline"
//         selectedKeys={[selectedKey]}
//         defaultOpenKeys={defaultOpenKeys}
//         style={{ height: "100%", borderRight: 0 }}
//       >
//         {menuItems.map((item) => (
          
//           <CanAccess key={item.key} resource={item.name} action="list">
//             {item.key}
//             <Menu.Item key={item.key} icon={item.icon}>
//               <Link to={item.route ?? "#"}>{item.label}</Link>
//             </Menu.Item>
//           </CanAccess>
//         ))}
//       </Menu>
//     </Sider>
//   );
// };
