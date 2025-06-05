import { Popover, Tag } from "antd";
import type { FC, ReactNode } from "react";

export const BaseErrorBig: FC<{
  errorReason?: ReactNode;
}> = ({ errorReason }) => {
  // TODO: 目前与 BaseErrorSmall 相同，后续可以考虑区分大错误和小错误的样式
  return (
    <Popover content={errorReason}>
      <Tag color="red">ERROR</Tag>
    </Popover>
  );
};
