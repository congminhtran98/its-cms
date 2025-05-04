import { useTable, FilterDropdown } from "@refinedev/antd";
import { List, Table, Space, Input, Form, Button } from "antd";
import { ShowButton, EditButton, DeleteButton, DateField } from "@refinedev/antd";
import type { IMembership } from "../../types";

export const MembershipsList = () => {
  const { tableProps, searchFormProps } = useTable<IMembership>({
    filters: {
      initial: [
        { field: "userId", operator: "contains", value: "" },
        { field: "status", operator: "eq", value: "" },
      ],
    },
  });

  return (
    <List>
      <Form {...searchFormProps} layout="vertical" style={{ marginBottom: 16 }}>
        <Space>
          <Form.Item name="userId" noStyle>
            <Input placeholder="Search by User ID" />
          </Form.Item>
          <Form.Item name="status" noStyle>
            <Input placeholder="Search by Status" />
          </Form.Item>
          <Button type="primary" onClick={searchFormProps.form?.submit}>
            Search
          </Button>
        </Space>
      </Form>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="userId"
          title="User ID"
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search User ID" />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="status"
          title="Status"
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search Status" />
            </FilterDropdown>
          )}
        />
        <Table.Column dataIndex="startDate" title="Start Date" render={(value) => <DateField value={value} />} />
        <Table.Column dataIndex="endDate" title="End Date" render={(value) => <DateField value={value} />} />
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
