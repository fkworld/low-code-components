import type { ReactNode } from "react";
import type { Paths } from "type-fest";

import type { NodeProps } from "../node/node";

export type UseDetailProps<T> = {
  data?: T;
  items?: Array<DetailItemDef<T>>;
  columnsCount?: number;
};

export type UseDetailResult<T> = {
  detailIns: DetailIns<T>;
};

export type DetailIns<T> = {
  data?: T;
  items?: Array<DetailItemDef<T>>;
  columnsCount?: number;
  getItems: () => Array<DetailItemIns<T>>;
};

export type DetailItemDef<T> = {
  id?: string;

  itemSpan?: number;
  itemCustomRender?: (data: T | undefined) => ReactNode;

  label?: string;
  labelCustomRender?: (data: T | undefined) => string;
  labelHelper?: ReactNode;
  labelHelperCustomRender?: (data: T | undefined) => ReactNode;
  labelSecondary?: ReactNode;
  labelSecondaryCustomRender?: (data: T | undefined) => ReactNode;

  content?: ReactNode;
  contentCustomRender?: (data: T | undefined) => ReactNode;
  contentNodeValueKey?: Paths<T>;
  contentNodeProps?: NodeProps;
};

export type DetailItemIns<T> = {
  id: string;
  itemDef: DetailItemDef<T>;
  toggleExpanded: (expanded?: boolean) => void;
  getIsSelfExpanded: () => boolean;
  getIsFinalExpanded: () => boolean;
};
