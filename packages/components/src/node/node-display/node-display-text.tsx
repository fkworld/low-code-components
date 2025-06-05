import type { FC } from "react";

import type { BaseNodeProps } from "../node-types";

export const NodeDisplayText: FC<
  BaseNodeProps<string | number> & {
    type: "displayText";
  }
> = (props) => {
  const { value } = props;

  if (!value && value !== 0) {
    return "--";
  }

  return String(value);
};
