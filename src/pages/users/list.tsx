import { List, DateField, useTable, FilterDropdown } from "@refinedev/antd";
import { Table, Form, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { IUser } from "../../types";

export const UserList = () => {
  const { tableProps, searchFormProps } = useTable<IUser>();

  return (
    <List>
      <Form {...searchFormProps} layout="inline" style={{ marginBottom: 16 }}>
        <Form.Item name="q">
          <Input placeholder="Search users..." prefix={<SearchOutlined />} />
        </Form.Item>
      </Form>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="ID"
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search ID" />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="firstName"
          title="First Name"
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search first name" />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="lastName"
          title="Last Name"
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search last name" />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="email"
          title="Email"
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search email" />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="status"
          title="Status"
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search status" />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="createdAt"
          title="Created At"
          render={(value) => <DateField value={value} format="LLL" />}
        />
        <Table.Column
          dataIndex="updatedAt"
          title="Updated At"
          render={(value) => <DateField value={value} format="LLL" />}
        />
      </Table>
    </List>
  );
};
