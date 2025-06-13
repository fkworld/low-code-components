import { CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import type { ButtonProps } from "antd";
import { Button, message, Popover } from "antd";
import type { FC, MouseEventHandler } from "react";
import { useRef, useState } from "react";

import type { DisabledOptions } from "../utils/disabled-options";
import { getDisabledOption } from "../utils/disabled-options";

const MESSAGE_KEY = "OP_BUTTON";
const MESSAGE_DELAY = 2;

export const BaseOpButton: FC<
  ButtonProps & {
    disabledOptions?: DisabledOptions;
  }
> = (props) => {
  const { disabledOptions, onClick, type = "link", size = "small", icon, ...otherProps } = props;

  const [state, setState] = useState<"idle" | "loading" | "success" | "fail">("idle");
  const timeout = useRef<NodeJS.Timeout>(undefined);
  const disabledOption = getDisabledOption(disabledOptions);

  const onClickProcessed = async (...args: Parameters<MouseEventHandler<HTMLElement>>) => {
    try {
      setState("loading");
      message.open({
        key: MESSAGE_KEY,
        type: "loading",
        content: "操作中",
      });

      await onClick?.(...args);

      setState("success");
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setState("idle"), MESSAGE_DELAY * 1000);
      message.open({
        key: MESSAGE_KEY,
        type: "success",
        content: "操作成功",
        duration: MESSAGE_DELAY,
      });
    } catch {
      setState("fail");
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setState("idle"), MESSAGE_DELAY * 1000);
      message.open({
        key: MESSAGE_KEY,
        type: "error",
        content: "操作失败",
        duration: MESSAGE_DELAY,
      });
    }
  };

  return (
    <Popover content={disabledOption?.disabledReason}>
      <Button
        {...otherProps}
        disabled={disabledOption?.disabled}
        icon={
          state === "loading" ? (
            <LoadingOutlined />
          ) : state === "success" ? (
            <CheckCircleOutlined style={{ color: "#34c759" }} />
          ) : state === "fail" ? (
            <CloseCircleOutlined style={{ color: "#ff3b30" }} />
          ) : (
            icon
          )
        }
        loading={state === "loading"}
        size={size}
        type={type}
        onClick={onClickProcessed}
      />
    </Popover>
  );
};
