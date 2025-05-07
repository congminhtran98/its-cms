import { List, useTable, FilterDropdown } from "@refinedev/antd";
import { Table, Form, Input, Button, DatePicker, Select, Space } from "antd";
import type { IEventRegistration } from "../../types";
import { CrudFilters } from "@refinedev/core";
import {
  ShowButton,
  EditButton,
  DeleteButton,
  DateField,
} from "@refinedev/antd";

interface ISearchForm {
  status?: string;
  id?: string;
  dateRange?: [string, string];
}

export const EventRegistrationList: React.FC = () => {
  const { tableProps, searchFormProps } = useTable<IEventRegistration, any, ISearchForm>({
    onSearch: (values) => {
      const filters: CrudFilters = [];

      if (values.status) {
        filters.push({
          field: "status",
          operator: "contains",
          value: values.status,
        });
      }

      if (values.id) {
        filters.push({
          field: "id",
          operator: "eq",
          value: values.id,
        });
      }

      if (values.dateRange?.[0]) {
        filters.push({
          field: "createdAt",
          operator: "gte",
          value: values.dateRange[0],
        });
      }

      if (values.dateRange?.[1]) {
        filters.push({
          field: "createdAt",
          operator: "lte",
          value: values.dateRange[1],
        });
      }

      return filters;
    },
  });

  return (
    <List>
      <Form {...searchFormProps} layout="inline" style={{ marginBottom: 16 }}>
        <Form.Item name="status">
          <Input placeholder="Search by status" />
        </Form.Item>
        <Form.Item name="id">
          <Input placeholder="Search by ID" />
        </Form.Item>
        <Form.Item name="dateRange">
          <DatePicker.RangePicker />
        </Form.Item>
        <Button type="primary" onClick={searchFormProps.form?.submit}>
          Search
        </Button>
      </Form>
      <Table {...tableProps} rowKey="id">
        <Table.Column title="ID" dataIndex="id" sorter />
        <Table.Column
          title="User"
          render={(_, record: IEventRegistration) => record.user?.fullName}
        />
        <Table.Column
          title="Event"
          render={(_, record: IEventRegistration) => record.event?.title}
        />
        <Table.Column dataIndex="status" title="Status" sorter />
        <Table.Column
          dataIndex="registeredAt"
          title="Registered At"
          render={(value: string) => new Date(value).toLocaleString()}
          sorter
        />
        <Table.Column
          dataIndex="canceledAt"
          title="Canceled At"
          render={(value: string) =>
            value ? new Date(value).toLocaleString() : "-"
          }
          sorter
        />
                <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
          fixed="right"
        />
      </Table>
    </List>
  );
};

