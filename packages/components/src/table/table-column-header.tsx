import type { HeaderContext } from "@tanstack/react-table";

import { BaseHelper } from "../base/base-helper";
import type { TableItemDef } from "./table-types";

export function TableColumnHeader<T>(props: { headerCtx: HeaderContext<T, unknown>; item: TableItemDef<T> }) {
  const {
    item: { label, labelHelper },
  } = props;

  return (
    <div>
      <span>{label}</span>
      <span> </span>
      <BaseHelper helper={labelHelper} />
    </div>
  );
}
