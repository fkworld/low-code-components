import type { Column } from "@tanstack/react-table";
import type { CSSProperties } from "react";

export function getColumnPinningStyles<T>(column: Column<T>): CSSProperties {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn = column.getIsPinned() === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn = column.getIsPinned() === "right" && column.getIsFirstColumn("right");

  return {
    left: isPinned === "left" ? column.getStart("left") : undefined,
    right: isPinned === "right" ? column.getAfter("right") : undefined,
    position: isPinned ? "sticky" : undefined,
    zIndex: isPinned ? 1 : undefined,
    width: isPinned ? column.getSize() : column.columnDef.size,
    boxShadow: isLastLeftPinnedColumn
      ? "inset -1px 0 0 0 #0000000f"
      : isFirstRightPinnedColumn
        ? "inset 1px 0 0 0 #0000000f"
        : undefined,
  };
}
