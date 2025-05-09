import type { FC } from "react";

import type { NodeProps } from "../node-types";

export const NodeDisplayText: FC<NodeProps<"displayText">> = (props) => {
  const { value } = props;

  if (!value && value !== 0) {
    return "--";
  }

  return String(value);
};
