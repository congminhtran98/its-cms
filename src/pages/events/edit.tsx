import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker, InputNumber } from "antd";
import type { IEvent } from "../../types";
import dayjs from "dayjs";

export const EventEdit = () => {
  const { formProps, saveButtonProps } = useForm<IEvent>();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Title is required" },
            { min: 3, message: "Title must be at least 3 characters" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Description is required" },
            { min: 10, message: "Description must be at least 10 characters" },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Event Date"
          name="eventDate"
          rules={[
            { required: true, message: "Event date is required" },
            {
              validator: (_, value) => {
                if (value && value < dayjs()) {
                  return Promise.reject("Event date cannot be in the past");
                }
                return Promise.resolve();
              },
            },
          ]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker showTime />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "Location is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Capacity"
          name="capacity"
          rules={[
            { required: true, message: "Capacity is required" },
            { type: "number", min: 1, message: "Minimum 1 participant" },
            { type: "number", max: 1000, message: "Maximum 1000 participants" },
          ]}
        >
          <InputNumber min={1} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
