import { Create, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker } from "antd";
import type { IMembership } from "../../types";
import dayjs from "dayjs";

export const MembershipCreate = () => {
  const { formProps, saveButtonProps } = useForm<IMembership>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="User ID" name="userId" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Status" name="status" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Start Date"
          name="startDate"
          rules={[{ required: true }]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}>
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="End Date"
          name="endDate"
          rules={[{ required: true }]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}>
          <DatePicker />
        </Form.Item>
      </Form>
    </Create>
  );
};
