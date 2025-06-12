import type { CellContext } from "@tanstack/react-table";
import { get } from "lodash-es";

import { Node } from "../node/node";
import type { TableItemDef } from "./table-types";

export function TableColumnCell<T>(props: { cellCtx: CellContext<T, unknown>; item: TableItemDef<T> }) {
  const {
    cellCtx,
    item: { content, contentCustomRender, contentNodeValueKey, contentNodeProps },
  } = props;

  if (contentNodeValueKey) {
    return (
      <Node
        type={contentNodeProps?.type || "displayText"}
        {...contentNodeProps}
        value={get(cellCtx.row.original, contentNodeValueKey)}
      />
    );
  }

  if (contentCustomRender) {
    return contentCustomRender(cellCtx.row.original);
  }

  return content;
}
