import { useControllableValue } from "ahooks";
import { Input } from "antd";
import type { FC } from "react";

import type { BaseNodeProps } from "../node-types";

export const NodeInputText: FC<
  BaseNodeProps<string> & {
    type: "inputText";
  }
> = (props) => {
  const [value, onChange] = useControllableValue<(typeof props)["value"]>(props);
  const { placeholder, readonly, disabled } = props;

  return (
    <Input
      allowClear
      disabled={disabled}
      placeholder={placeholder}
      readOnly={readonly}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
