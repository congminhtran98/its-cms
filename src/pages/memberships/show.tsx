import { useShow } from "@refinedev/core";
import { DateField, Show, TextField } from "@refinedev/antd";
import { Typography } from "antd";
import { type IMembership } from "../../types";

const { Title } = Typography;

export const MembershipShow = () => {
  const { queryResult } = useShow<IMembership>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>ID</Title>
      <TextField value={record?.id} />

      <Title level={5}>User ID</Title>
      <TextField value={record?.userId} />

      <Title level={5}>Status</Title>
      <TextField value={record?.status} />

      <Title level={5}>Start Date</Title>
      <DateField value={record?.startDate} format="LLL" />

      <Title level={5}>End Date</Title>
      <DateField value={record?.endDate} format="LLL" />
    </Show>
  );
};
