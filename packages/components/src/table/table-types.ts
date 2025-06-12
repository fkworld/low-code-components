import type { Table } from "@tanstack/react-table";
import type { ReactNode } from "react";
import type { Paths } from "type-fest";

import type { NodeProps } from "../node/node";

export type UseTableProps<T> = {
  /**
   * @description 表格数据
   */
  data?: Array<T>;
  items?: Array<TableItemDef<T>>;
  getRowId?: (row: T) => string;
};

export type UseTableResult<T> = {
  tableIns: TableIns<T>;
};

export type TableIns<T> = Table<T>;

export type TableItemDef<T> = {
  label?: string;
  labelHelper?: ReactNode;

  content?: ReactNode;
  contentCustomRender?: (row: T | undefined) => ReactNode;
  contentNodeValueKey?: Paths<T>;
  contentNodeProps?: NodeProps;

  hidden?: boolean;
  pinning?: false | "left" | "right";

  /**
   * 列宽
   * - 对 fixed 列而言，应当必填
   *    - 如果不配置，则会使用默认值 200px，默认值可配置
   * - 对非 fixed 列而言，可选
   *    - 如果不配置，则会使用默认值 undefined，即自动计算宽度
   * - 列宽最小值 100px，最大值 400px
   *
   * 列宽的配置，主要为了解决两个问题：
   * - 为了解决 fixed 列 sticky 时需要计算列宽的问题
   * - 为了解决在可修改表格中，表格项内容变化导致列宽变化，出现闪烁的问题
   *
   * 列宽的配置，实际控制的是 header 的宽度，进而控制了列的宽度
   */
  size?: number;
};
