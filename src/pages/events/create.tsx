import { Create, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, DatePicker } from "antd";
import type { IEvent } from "../../types";
import dayjs from "dayjs";

export const EventCreate = () => {
  const { formProps, saveButtonProps } = useForm<IEvent>();

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
            {
              min: 3,
              message: "Title must be at least 3 characters",
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Description is required",
            },
            {
              min: 10,
              message: "Description must be at least 10 characters",
            },
          ]}>
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[
            {
              required: true,
              message: "Location is required",
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Event Date"
          name="eventDate"
          rules={[
            {
              required: true,
              message: "Event date is required",
            },
            // {
            //   validator: (_, value) => {
            //     if (value && value < dayjs()) {
            //       return Promise.reject("Start date cannot be in the past");
            //     }
            //     return Promise.resolve();
            //   },
            // },
          ]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}>
          <DatePicker showTime style={{ width: "100%" }} />
        </Form.Item>

        {/* <Form.Item
          label="End Date"
          name="endDate"
          rules={[
            {
              required: true,
              message: "End date is required",
            },
            {
              validator: (_, value) => {
                const startDate = formProps.form?.getFieldValue("startDate");
                if (value && startDate && value < startDate) {
                  return Promise.reject("End date must be after start date");
                }
                return Promise.resolve();
              },
            },
          ]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}>
          <DatePicker showTime style={{ width: "100%" }} />
        </Form.Item> */}
{/* 
        <Form.Item
          label="Registration Deadline"
          name="registrationDeadline"
          rules={[
            {
              required: true,
              message: "Registration deadline is required",
            },
            {
              validator: (_, value) => {
                const startDate = formProps.form?.getFieldValue("startDate");
                if (value && startDate && value >= startDate) {
                  return Promise.reject("Registration deadline must be before start date");
                }
                return Promise.resolve();
              },
            },
          ]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}>
          <DatePicker showTime style={{ width: "100%" }} />
        </Form.Item> */}

        <Form.Item
          label="Capacity"
          name="capacity"
          rules={[
            {
              required: true,
              message: "Maximum participants is required",
            },
            {
              type: "number",
              min: 1,
              message: "Minimum 1 participant required",
            },
            {
              type: "number",
              max: 1000,
              message: "Maximum 1000 participants allowed",
            },
          ]}>
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Create>
  );
};
