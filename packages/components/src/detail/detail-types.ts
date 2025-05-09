import type { ReactNode } from "react";
import type { Paths } from "type-fest";

import type { NodePropsAll } from "../node/node-types";

export type DetailProps<T> = {
  items?: Array<DetailItemProps<T>>;
  data?: T;
  columnsCount?: number;
};

export type DetailItemProps<T> = {
  customRender?: (data: T | undefined) => ReactNode;
  columnSpan?: number;

  label?: string;
  labelCustomRender?: (data: T | undefined) => string;
  labelHelper?: ReactNode;
  labelHelperCustomRender?: (data: T | undefined) => ReactNode;
  labelSecondary?: ReactNode;
  labelSecondaryCustomRender?: (data: T | undefined) => ReactNode;

  content?: ReactNode;
  contentCustomRender?: (data: T | undefined) => ReactNode;
  valueKey?: Paths<T>;
  valueNodeProps?: NodePropsAll;
};
