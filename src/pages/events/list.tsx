import {
  List,
  useTable,
  EditButton,
  DeleteButton,
  ShowButton,
} from "@refinedev/antd";
import {
  Table,
  Space,
  Tag,
  Form,
  Input,
  Button,
  DatePicker,
  Switch,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import type { IEvent } from "../../types";
import {
  getAuthHeader,
  searchEvents,
  getUpcomingEvents,
} from "../../api/event";

const { RangePicker } = DatePicker;

interface ISearch {
  title?: string;
  location?: string;
  dateRange?: [dayjs.Dayjs, dayjs.Dayjs];
}

export const EventList: React.FC = () => {
  const [form] = Form.useForm<ISearch>();
  const [customData, setCustomData] = useState<IEvent[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [showUpcoming, setShowUpcoming] = useState(false);

  const tableResult = useTable<IEvent>({
    pagination: {
      pageSize: 10,
    },
  });

  const { tableProps } = tableResult;

  const fetchUpcoming = async () => {
    setLoading(true);
    try {
      const res = await getUpcomingEvents();
      setCustomData(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchResults = async (values?: ISearch) => {
    setLoading(true);
    try {
      const res = await searchEvents({
        name: values?.title,
        location: values?.location,
        startDate: values?.dateRange?.[0]?.toISOString(),
        endDate: values?.dateRange?.[1]?.toISOString(),
      });
      setCustomData(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  const onSearch = () => {
    const values = form.getFieldsValue();
    fetchSearchResults(values);
  };

  const handleToggleUpcoming = async (checked: boolean) => {
    setShowUpcoming(checked);
    if (checked) {
      await fetchUpcoming();
    } else {
      setCustomData(null);
    }
  };

  const finalData = customData ?? tableProps.dataSource;

  return (
    <List>
      <Form
        form={form}
        layout="inline"
        style={{ marginBottom: 16 }}
        onFinish={onSearch}
      >
        <Form.Item name="title">
          <Input placeholder="Search title" prefix={<SearchOutlined />} />
        </Form.Item>
        <Form.Item name="location">
          <Input placeholder="Search location" />
        </Form.Item>
        <Form.Item name="dateRange">
          <RangePicker
            showTime
            format="YYYY-MM-DD HH:mm"
            placeholder={["From", "To"]}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
        <Form.Item label="Upcoming only">
          <Switch checked={showUpcoming} onChange={handleToggleUpcoming} />
        </Form.Item>
      </Form>

      <Table
        {...tableProps}
        dataSource={finalData || []}
        loading={loading || tableProps.loading}
        rowKey="id"
      >
        <Table.Column dataIndex="title" title="Title" sorter />
        <Table.Column dataIndex="location" title="Location" sorter />
        <Table.Column
          dataIndex="eventDate"
          title="Event Date"
          render={(value) => {
            const now = dayjs();
            const date = dayjs(value);
            const isPast = now.isAfter(date);
            return (
              <Space>
                {date.format("DD/MM/YYYY HH:mm")}
                {isPast ? (
                  <Tag color="error">Ended</Tag>
                ) : (
                  <Tag color="success">Upcoming</Tag>
                )}
              </Space>
            );
          }}
          sorter
        />
        <Table.Column dataIndex="capacity" title="Capacity" sorter />
        <Table.Column<IEvent>
          title="Actions"
          dataIndex="actions"
          fixed="right"
          render={(_, record) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record.id}
                mutationMode="optimistic"
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
