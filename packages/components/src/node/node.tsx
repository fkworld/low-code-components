import type { ComponentProps, FC } from "react";

import { NodeDisplayId } from "./node-display/node-display-id";
import { NodeDisplayText } from "./node-display/node-display-text";
import { NodeInputText } from "./node-input/node-input-text";

const NODES = {
  displayId: NodeDisplayId,
  displayText: NodeDisplayText,
  inputText: NodeInputText,
} as const;

export type NodeProps = ComponentProps<(typeof NODES)[keyof typeof NODES]>;

export const Node: FC<NodeProps> = (props) => {
  const { type } = props;

  const Component = NODES[type] as FC<NodeProps>;

  if (!Component) {
    return <div>Error Node</div>;
  }

  return <Component {...props} />;
};
