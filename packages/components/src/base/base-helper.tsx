import { QuestionCircleOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import type { FC, ReactNode } from "react";

export const BaseHelper: FC<{
  helper?: ReactNode;
}> = (props) => {
  const { helper } = props;

  if (!helper) {
    return null;
  }

  return (
    <Popover content={helper}>
      <QuestionCircleOutlined
        style={{
          color: "var(--color-b70)",
        }}
      />
    </Popover>
  );
};
