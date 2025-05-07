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

      <Title level={5}>Company</Title>
      <TextField value={record?.company} />

      <Title level={5}>Position</Title>
      <TextField value={record?.position} />

      <Title level={5}>Membership Type</Title>
      <TextField value={record?.membershipType} />

      <Title level={5}>Start Date</Title>
      <DateField value={record?.startDate} format="LLL" />

      <Title level={5}>End Date</Title>
      <DateField value={record?.endDate} format="LLL" />
    </Show>
  );
};

