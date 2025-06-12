import { getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";

import { TableColumnCell } from "./table-column-cell";
import { TableColumnHeader } from "./table-column-header";
import type { UseTableProps, UseTableResult } from "./table-types";

export function useTable<T>(props: UseTableProps<T>): UseTableResult<T> {
  const {
    items = [],
    data = [],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getRowId = (data) => (data as any).id,
  } = props;

  const tableIns = useReactTable<T>({
    columns: items
      .filter((item) => !item.hidden)
      .map((item, itemIndex) => {
        return {
          id: item.label + "__" + itemIndex,
          size: item.size,
          header: (headerCtx) => {
            return (
              <TableColumnHeader
                headerCtx={headerCtx}
                item={item}
              />
            );
          },
          cell: (cellCtx) => {
            return (
              <TableColumnCell
                cellCtx={cellCtx}
                item={item}
              />
            );
          },
        };
      }),
    data: data,
    getRowId: getRowId,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      columnPinning: {
        left: items
          .map((item, itemIndex) => {
            return { id: item.label + "__" + itemIndex, ...item };
          })
          .filter((item) => item.pinning === "left")
          .map((item) => item.id),
        right: items
          .map((item, itemIndex) => {
            return { id: item.label + "__" + itemIndex, ...item };
          })
          .filter((item) => item.pinning === "right")
          .map((item) => item.id),
      },
    },
  });

  return {
    tableIns,
  };
}
