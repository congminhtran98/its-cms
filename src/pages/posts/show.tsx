import { Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography } from "antd";
import type { IPost } from "../../types";

const { Title } = Typography;

export const PostShow = () => {
  const { queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      {/* <Title level={5}>Id</Title>
      <TextField value={record?.id} /> */}

      <Title level={5}>Title</Title>
      <TextField value={record?.title} />

      <Title level={5}>Content</Title>
      <TextField value={record?.content} />
    </Show>
  );
};
