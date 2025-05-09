import type { FC } from "react";

import { NodeDisplayText } from "./node-display/node-display-text";
import { NodeInputText } from "./node-input/node-input-text";
import type { NodeProps, NodePropsAll, NodeTypes } from "./node-types";

export const Node: FC<NodePropsAll> = (props) => {
  const { type } = props;

  const Component = NODES[type] as FC<NodePropsAll>;

  if (!Component) {
    return <div>Error Node</div>;
  }

  return <Component {...props} />;
};

const NODES: {
  [type in NodeTypes]: FC<NodeProps<type>>;
} = {
  displayText: NodeDisplayText,

  inputText: NodeInputText,
};
