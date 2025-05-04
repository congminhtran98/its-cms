import { Show, DateField, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography } from "antd";
import { type IEventRegistration } from "../../types";

const { Title } = Typography;

export const EventRegistrationShow = () => {
  const { queryResult } = useShow<IEventRegistration>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>ID</Title>
      <TextField value={record?.id} />

      <Title level={5}>Status</Title>
      <TextField value={record?.status} />

      <Title level={5}>Created At</Title>
      <DateField value={record?.createdAt} format="YYYY-MM-DD HH:mm:ss" />

      <Title level={5}>Updated At</Title>
      <DateField value={record?.updatedAt} format="YYYY-MM-DD HH:mm:ss" />

      {record?.canceledAt && (
        <>
          <Title level={5}>Canceled At</Title>
          <DateField value={record.canceledAt} format="YYYY-MM-DD HH:mm:ss" />
        </>
      )}
    </Show>
  );
};
