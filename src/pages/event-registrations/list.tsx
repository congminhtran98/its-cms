import { List, useTable, FilterDropdown } from "@refinedev/antd";
import { Table, Form, Input, Button, DatePicker, Select } from "antd";
import type { IEventRegistration } from "../../types";
import { CrudFilters } from "@refinedev/core";

interface ISearchForm {
  status?: string;
  id?: string;
  dateRange?: [string, string];
}

export const EventRegistrationList: React.FC = () => {
  const { tableProps, searchFormProps } = useTable<IEventRegistration, any, ISearchForm>({
    onSearch: (values) => {
      const filters: CrudFilters = [
        {
          field: "status",
          operator: "contains",
          value: values.status,
        },
        {
          field: "id",
          operator: "eq",
          value: values.id,
        },
      ];

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
        <Table.Column dataIndex="id" title="ID" sorter />
        <Table.Column
          dataIndex="status"
          title="Status"
          sorter
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ minWidth: 200 }}
                placeholder="Filter by status"
                options={[
                  { label: "Pending", value: "pending" },
                  { label: "Completed", value: "completed" },
                  { label: "Canceled", value: "canceled" },
                ]}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="createdAt"
          title="Created At"
          render={(value: string) => {
            return new Date(value).toLocaleString();
          }}
          sorter
        />
        <Table.Column
          dataIndex="updatedAt"
          title="Updated At"
          render={(value: string) => {
            return new Date(value).toLocaleString();
          }}
          sorter
        />
        <Table.Column
          dataIndex="canceledAt"
          title="Canceled At"
          render={(value: string) => {
            return value ? new Date(value).toLocaleString() : "-";
          }}
          sorter
        />
      </Table>
    </List>
  );
};
