import { Empty } from "antd";
import type { FC } from "react";

export const BaseNullBig: FC = () => {
  return (
    <div className="flex size-full items-center justify-center">
      <Empty description="无数据" />
    </div>
  );
};
