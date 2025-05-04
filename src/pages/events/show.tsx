import { Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Descriptions, Tag } from "antd";
import type { IEvent } from "../../types";
import dayjs from "dayjs";

const { Title } = Typography;

export const EventShow = () => {
  const { queryResult } = useShow<IEvent>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  // Dựa trên eventDate để xác định trạng thái
  const isEventEnded =
    record?.eventDate && dayjs().isBefore(record.eventDate) === false;

  return (
    <Show isLoading={isLoading}>
      <Descriptions title={record?.title} bordered column={1}>
        <Descriptions.Item label="Status">
          {isEventEnded ? (
            <Tag color="red">Event Ended</Tag>
          ) : (
            <Tag color="green">Upcoming</Tag>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          <TextField value={record?.description} />
        </Descriptions.Item>
        <Descriptions.Item label="Location">
          <TextField value={record?.location} />
        </Descriptions.Item>
        <Descriptions.Item label="Event Date">
          <TextField
            value={dayjs(record?.eventDate).format("YYYY-MM-DD HH:mm")}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Capacity">
          <TextField value={record?.capacity?.toString()} />
        </Descriptions.Item>
      </Descriptions>
    </Show>
  );
};
