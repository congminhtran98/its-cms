import { Layout } from "antd";
import { PropsWithChildren } from "react";
import { Sidebar } from "./CustomSidebar";
import { Navbar } from "./Navbar";

const { Content } = Layout;

export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Navbar />
        <Content style={{ margin: "24px", background: "#fff", padding: 24 }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
