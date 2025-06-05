import type { ValueOf } from "type-fest";

import type { IdNameOptions } from "../utils/id-name-options/id-name-options";

type PortalNodeParams = {
  displayText: {
    value: string | number;
  };
  displayId: {
    value: string | number;
    showType?: "text" | "status" | "tag";
  };

  inputText: {
    value: string;
  };
};

export type NodeTypes = keyof PortalNodeParams;

export type NodeProps<T extends NodeTypes> = {
  type: T;
  defaultValue?: PortalNodeParams[T]["value"];
  value?: PortalNodeParams[T]["value"];
  onChange?: (value?: PortalNodeParams[T]["value"]) => void;

  options?: IdNameOptions;
  getOptions?: () => Promise<IdNameOptions | undefined>;

  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
} & PortalNodeParams[T];

export type NodePropsAll = ValueOf<{
  [K in NodeTypes]: K extends NodeTypes ? NodeProps<K> : never;
}>;
