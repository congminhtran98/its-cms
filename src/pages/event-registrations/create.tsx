import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Select } from "antd";
import {
  useWarnAboutChange,
  useNavigation,
  useNotification,
} from "@refinedev/core";
import type { IEventRegistration } from "../../types";
import { createEventRegistration } from "api/eventRegis";
import { useNavigate } from "react-router-dom";

export const EventRegistrationCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<
    IEventRegistration,
    any,
    { eventId: string; status: string }
  >();
  const { push } = useNavigation();

  const { open: notify } = useNotification();

  const navigate = useNavigate();

  const { selectProps: eventSelectProps } = useSelect({
    resource: "events",
    optionLabel: "title",
    optionValue: "id",
  });

  const { setWarnWhen } = useWarnAboutChange();

  return (
    <Create
      saveButtonProps={{
        ...saveButtonProps,
        onClick: () => formProps.form?.submit(),
      }}
    >
      <Form
        {...formProps}
        layout="vertical"
        onFinish={async (values) => {
          try {
            await createEventRegistration(values);
            if (notify) {
              notify({
                type: "success",
                message: "Tạo đăng ký thành công!",
                description: "Bạn đã đăng ký tham gia sự kiện.",
              });
            }
            navigate("/event-registrations"); // đi thẳng về list
          } catch (err) {
            if (notify) {
              notify({
                type: "error",
                message: "Lỗi khi tạo đăng ký",
                description:
                  (err as Error).message || "Đã xảy ra lỗi không xác định.",
              });
            }
            console.error("Error:", (err as Error).message);
          }
        }}
      >
        <Form.Item label="Event" name="eventId" rules={[{ required: true }]}>
          <Select {...eventSelectProps} />
        </Form.Item>
        <Form.Item label="Status" name="status" rules={[{ required: true }]}>
          <Select
            options={[
              { label: "Pending", value: "pending" },
              { label: "Confirmed", value: "confirmed" },
            ]}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
