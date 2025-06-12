import type { Table } from "@tanstack/react-table";
import { Pagination } from "antd";

export function TablePagination<T>(props: { tableIns: Table<T> }) {
  const { tableIns } = props;

  return (
    <div className="py-4">
      <Pagination
        align="end"
        current={tableIns.getState().pagination.pageIndex + 1}
        pageSize={tableIns.getState().pagination.pageSize}
        showQuickJumper
        showSizeChanger
        showTotal={() => `共 ${tableIns.getRowCount()} 条 - ${tableIns.getPageCount()} 页`}
        size="small"
        total={tableIns.getRowCount()}
        onChange={(pageIndex, pageSize) => {
          tableIns.setPagination({ pageIndex: pageIndex - 1, pageSize });
        }}
      />
    </div>
  );
}
