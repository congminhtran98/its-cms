import { Create, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker } from "antd";
import type { IEventRegistration } from "../../types";

export const EventRegistrationCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IEventRegistration>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Status" name="status" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Canceled At" name="canceledAt">
          <DatePicker showTime style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Create>
  );
};
