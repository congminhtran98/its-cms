import { Edit, useForm } from "@refinedev/antd";
import { Form, Select, DatePicker } from "antd";
import type { IEventRegistration } from "../../types";
import { updateStatusEventRegistration } from "api/eventRegis";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useNotification } from "@refinedev/core";

export const EventRegistrationEdit: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IEventRegistration>();

  const navigate = useNavigate();
  const { open: notify } = useNotification();

  const handleSave = async (values: IEventRegistration) => {
    try {
      await updateStatusEventRegistration({
        id: values.id,
        status: values.status,
      });

      if (notify) {
        notify({
          type: "success",
          message: "Cập nhật trạng thái thành công!",
        });
      }

      navigate("/event-registrations");
    } catch (error: any) {
      if (notify) {
        notify({
          type: "error",
          message: "Cập nhật thất bại",
          description: error.message,
        });
      }
    }
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        onFinish={async (values) => {
          await handleSave(values as IEventRegistration);
        }}
      >
        {/* Hidden ID field để lấy id khi submit */}
        <Form.Item name="id" hidden>
          <input type="hidden" />
        </Form.Item>

        <Form.Item label="Status" name="status" rules={[{ required: true }]}>
          <Select
            options={[
              { label: "Pending", value: "pending" },
              { label: "Confirmed", value: "confirmed" },
              { label: "Completed", value: "completed" },
              { label: "Canceled", value: "canceled" },
            ]}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
