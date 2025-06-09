import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { clsx } from "clsx";
import type { FC } from "react";

import type { BaseNodeProps } from "../node-types";

export const NodeDisplayTitle: FC<
  BaseNodeProps<number> & {
    type: "displayTitle";
    title?: string;
    level?: 1 | 2 | 3;
    collapsed?: boolean;
    onToggleCollapsed?: () => void;
  }
> = (props) => {
  const { level = 1, title, collapsed, onToggleCollapsed } = props;

  return (
    <div className="relative">
      <div
        className={clsx({
          "text-size-h1": level === 1,
          "text-size-h2": level === 2,
          "text-size-h3": level === 3,
        })}
      >
        {title}
      </div>
      <Button
        icon={collapsed ? <CaretDownOutlined /> : <CaretRightOutlined />}
        size="small"
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translate(-100%,-50%)",
        }}
        type="text"
        onClick={() => onToggleCollapsed?.()}
      />
    </div>
  );
};
