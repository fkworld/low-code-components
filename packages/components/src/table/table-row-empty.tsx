import type { Table } from "@tanstack/react-table";

import { BaseNullBig } from "../base/base-null-big";

export function TableRowEmpty<T>(props: { tableIns: Table<T> }) {
  const { tableIns } = props;

  const isEmpty = tableIns?.getRowModel().rows.length === 0;

  if (!isEmpty) {
    return null;
  }

  return (
    <tr className="border-b6 h-64 border-b">
      <div className="pointer-events-none absolute inset-0">
        <BaseNullBig />
      </div>
    </tr>
  );
}
