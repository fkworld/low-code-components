import type { ComponentProps, FC } from "react";

import { BaseErrorSmall } from "../base/base-error-small";
import { NodeDisplayId } from "./node-display/node-display-id";
import { NodeDisplayText } from "./node-display/node-display-text";
import { NodeDisplayTime } from "./node-display/node-display-time";
import { NodeDisplayTitle } from "./node-display/node-display-title";
import { NodeInputSingleSelect } from "./node-input/node-input-single-select";
import { NodeInputText } from "./node-input/node-input-text";

const NODES = {
  displayId: NodeDisplayId,
  displayText: NodeDisplayText,
  displayTime: NodeDisplayTime,
  displayTitle: NodeDisplayTitle,
  inputText: NodeInputText,
  inputSingleSelect: NodeInputSingleSelect,
} as const;

export type NodeProps = ComponentProps<(typeof NODES)[keyof typeof NODES]>;

export const Node: FC<NodeProps> = (props) => {
  const { type } = props;

  const Component = NODES[type] as FC<NodeProps>;

  if (!Component) {
    return <BaseErrorSmall errorReason={`node.type=${type} 配置错误`} />;
  }

  return <Component {...props} />;
};
