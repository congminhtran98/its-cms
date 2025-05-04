import { useShow } from "@refinedev/core";
import { Show, DateField } from "@refinedev/antd";
import { Typography } from "antd";

import type { IUser } from "../../types";

const { Title, Text } = Typography;

export const UserShow = () => {
  const { queryResult } = useShow<IUser>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>First Name</Title>
      <Text>{record?.firstName}</Text>

      <Title level={5}>Last Name</Title>
      <Text>{record?.lastName}</Text>

      <Title level={5}>Email</Title>
      <Text>{record?.email}</Text>

      <Title level={5}>Status</Title>
      <Text>{record?.status}</Text>

      <Title level={5}>Created At</Title>
      <DateField value={record?.createdAt} format="LLL" />

      <Title level={5}>Updated At</Title>
      <DateField value={record?.updatedAt} format="LLL" />
    </Show>
  );
};
