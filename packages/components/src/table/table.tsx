import { flexRender } from "@tanstack/react-table";

import { getColumnPinningStyles } from "./table-column-pinning-utils";
import { TablePagination } from "./table-pagination";
import { TableRowEmpty } from "./table-row-empty";
import type { UseTableProps } from "./table-types";
import { useTable } from "./use-table";

export function Table<T>(props: UseTableProps<T>) {
  const { tableIns } = useTable(props);

  return (
    <>
      {/* 这一层是一些组件的绝对定位所需要的，例如 Empty 组件 */}
      <div className="relative">
        <div className="overflow-x-auto">
          {/* w-max 是为了 cell 优先不换行，撑满 400 px；min-w-full 是为了 table 撑满父容器 */}
          <table
            // TODO https://devops.wh.lotuscloud.com/projex/bug/RTIQ-3613# 《[unimo] chromium 136 版本导致 table 异常换行》
            // TODO 这是一个临时解决方案，将 table-fixed 改为了 table-auto
            className="w-max min-w-full table-auto"
          >
            <thead>
              <tr className="border-b6 border-y">
                {tableIns.getFlatHeaders().map((header) => {
                  return (
                    <th
                      key={header.id}
                      className="text-b50 max-w-[400px] bg-white p-2 text-left font-normal"
                      style={{
                        ...getColumnPinningStyles(header.column),
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <TableRowEmpty tableIns={tableIns} />
              {tableIns.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-b3 border-b-b6 border-b"
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className="max-w-[400px] bg-white p-2 text-left"
                        style={{
                          ...getColumnPinningStyles(cell.column),
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <TablePagination tableIns={tableIns} />
    </>
  );
}
