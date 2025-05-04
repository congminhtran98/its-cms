import React from "react";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker } from "antd";
import type { IMembership } from "../../types";
import dayjs from "dayjs";

export const MembershipEdit: React.FC = () => {
  const { formProps, saveButtonProps, queryResult } = useForm<IMembership>();

  const { selectProps: userSelectProps } = useSelect({
    resource: "users",
    optionLabel: "id",
    defaultValue: queryResult?.data?.data?.userId,
  });

  const statusOptions = [
    {
      label: "Active",
      value: "active",
    },
    {
      label: "Inactive",
      value: "inactive",
    },
    {
      label: "Pending",
      value: "pending",
    },
    {
      label: "Expired",
      value: "expired",
    },
  ];

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="User" name="userId" rules={[{ required: true }]}>
          <Select {...userSelectProps} />
        </Form.Item>
        <Form.Item label="Status" name="status" rules={[{ required: true }]}>
          <Select options={statusOptions} />
        </Form.Item>
        <Form.Item
          label="Start Date"
          name="startDate"
          rules={[{ required: true }]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="End Date"
          name="endDate"
          rules={[{ required: true }]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
