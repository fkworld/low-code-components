import type { ReactNode } from "react";
import type { Paths } from "type-fest";

import type { NodeProps } from "../node/node";

export type DetailProps<T> = {
  items?: Array<DetailItemProps<T>>;
  data?: T;
  columnsCount?: number;
};

export type DetailItemProps<T> = {
  itemSpan?: number;

  customRender?: (data: T | undefined) => ReactNode;

  label?: string;
  labelCustomRender?: (data: T | undefined) => string;
  labelHelper?: ReactNode;
  labelHelperCustomRender?: (data: T | undefined) => ReactNode;
  labelSecondary?: ReactNode;
  labelSecondaryCustomRender?: (data: T | undefined) => ReactNode;

  contentNodeValueKey?: Paths<T>;
  contentNodeProps?: NodeProps;
  content?: ReactNode;
  contentCustomRender?: (data: T | undefined) => ReactNode;
};
