import { Popover, Tag } from "antd";
import type { FC, ReactNode } from "react";

export const BaseErrorSmall: FC<{
  errorReason?: ReactNode;
}> = ({ errorReason }) => {
  return (
    <Popover content={errorReason}>
      <Tag
        bordered={false}
        color="red"
      >
        ERROR
      </Tag>
    </Popover>
  );
};
