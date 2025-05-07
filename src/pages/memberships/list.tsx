import { useTable, FilterDropdown } from "@refinedev/antd";
import { List, Table, Space, Input, Form, Button } from "antd";
import {
  ShowButton,
  EditButton,
  DeleteButton,
  DateField,
} from "@refinedev/antd";
import type { IMembership } from "../../types";

export const MembershipsList = () => {
  const { tableProps, searchFormProps } = useTable<IMembership>({
    filters: {
      initial: [
        { field: "userId", operator: "contains", value: "" },
        { field: "company", operator: "contains", value: "" },
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
          <Form.Item name="company" noStyle>
            <Input placeholder="Search by Company" />
          </Form.Item>
          <Button type="primary" onClick={searchFormProps.form?.submit}>
            Search
          </Button>
        </Space>
      </Form>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="userId" title="User ID" />
        <Table.Column dataIndex="company" title="Company" />
        <Table.Column dataIndex="position" title="Position" />
        <Table.Column dataIndex="membershipType" title="Membership Type" />
        <Table.Column
          dataIndex="startDate"
          title="Start Date"
          render={(value) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex="endDate"
          title="End Date"
          render={(value) => <DateField value={value} />}
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
