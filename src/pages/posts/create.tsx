import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";
import type { IPost } from "../../types";

export const PostCreate = () => {
  const { formProps, saveButtonProps } = useForm<IPost>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Title is required",
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
              message: "Content is required",
            },
          ]}>
          <Input.TextArea rows={6} />
        </Form.Item>
      </Form>
    </Create>
  );
};
