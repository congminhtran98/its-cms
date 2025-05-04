import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker } from "antd";
import type { IEventRegistration } from "../../types";
import dayjs from "dayjs";

export const EventRegistrationEdit: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IEventRegistration>();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Status" name="status" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Canceled At"
          name="canceledAt"
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}>
          <DatePicker showTime />
        </Form.Item>
      </Form>
    </Edit>
  );
};
