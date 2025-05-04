import { List, useTable, EditButton, ShowButton, DeleteButton, CreateButton } from "@refinedev/antd";
import { Table } from "antd";
import type { IPost } from "../../types";

export const PostList: React.FC = () => {
  const { tableProps } = useTable<IPost>();

  return (
    <List headerButtons={<CreateButton />}>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column<IPost>
          title="Actions"
          dataIndex="actions"
          fixed="right"
          render={(_, record) => (
            <>
              <ShowButton size="small" recordItemId={record.id} style={{ marginRight: 8 }} />
              <EditButton size="small" recordItemId={record.id} style={{ marginRight: 8 }} />
              <DeleteButton size="small" recordItemId={record.id} />
            </>
          )}
        />
      </Table>
    </List>
  );
};
