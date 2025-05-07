import type { IResourceItem } from "@refinedev/core";
import {
  FileTextOutlined,
  CalendarOutlined,
  UserOutlined,
  NotificationOutlined,
  TeamOutlined,
  ContactsOutlined,
} from "@ant-design/icons";

export const resources: IResourceItem[] = [
  {
    name: "posts",
    list: "/posts",
    create: "/posts/create",
    edit: "/posts/:id/edit",
    show: "/posts/:id",
    meta: {
      label: "Posts",
      icon: <FileTextOutlined />,
    },
  },
  {
    name: "events",
    list: "/events",
    create: "/events/create",
    edit: "/events/:id/edit",
    show: "/events/:id",
    meta: {
      label: "Events",
      icon: <CalendarOutlined />,
    },
  },
  {
    name: "users",
    list: "/users",
    create: "/users/create",
    edit: "/users/:id/edit",
    show: "/users/:id",
    meta: {
      label: "Users",
      icon: <UserOutlined />,
    },
  },
  {
    name: "notifications",
    list: "/notifications",
    create: "/notifications/create",
    edit: "/notifications/:id/edit",
    show: "/notifications/:id",
    meta: {
      label: "Notifications",
      icon: <NotificationOutlined />,
    },
  },
  {
    name: "memberships",
    list: "/memberships",
    create: "/memberships/create",
    edit: "/memberships/:id/edit",
    show: "/memberships/:id",
    meta: {
      label: "Memberships",
      icon: <TeamOutlined />,
    },
  },
  {
    name: "contacts",
    list: "/contacts",
    create: "/contacts/create",
    edit: "/contacts/:id/edit",
    show: "/contacts/:id",
    meta: {
      label: "Contacts",
      icon: <ContactsOutlined />,
    },
  },
  {
    name: "event-registrations",
    list: "/event-registrations",
    create: "/event-registrations/create",
    edit: "/event-registrations/:id/edit",
    show: "/event-registrations/:id",
    meta: {
      label: "Registrations",
      icon: <TeamOutlined />,
    },
  },
  {
    name: "profile",
    list: "/profile", // thêm vào để tránh lỗi key undefined
    show: "/profile",
    meta: {
      label: "Profile",
      icon: <UserOutlined />, // optional
    },
  },
];
