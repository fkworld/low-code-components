import { QuestionCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import type { FC, ReactNode } from "react";

export const BaseHelper: FC<{
  helper?: ReactNode;
}> = (props) => {
  const { helper } = props;

  if (!helper) {
    return null;
  }

  return (
    <Tooltip title={helper}>
      <QuestionCircleOutlined
        style={{
          color: "var(--color-b70)",
        }}
      />
    </Tooltip>
  );
};
