import { CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm, Popover } from "antd";
import type { ButtonProps } from "antd";
import { useRef, useState } from "react";
import type { FC } from "react";

import { getDisabledOption } from "../utils/disabled-options";
import type { DisabledOptions } from "../utils/disabled-options";

const MESSAGE_KEY = "OP_BUTTON";
const MESSAGE_DELAY = 2;

export const BaseOpConfirmButton: FC<
  Omit<ButtonProps, "onClick"> & {
    onClick?: () => void;
    disabledOptions?: DisabledOptions;
    confirmTitle?: string;
  }
> = (props) => {
  const {
    confirmTitle = "是否确认操作？",
    disabledOptions,
    onClick,
    type = "link",
    size = "small",
    icon,
    ...otherProps
  } = props;

  const [state, setState] = useState<"idle" | "loading" | "success" | "fail">("idle");
  const timeout = useRef<NodeJS.Timeout>(undefined);
  const disabledOption = getDisabledOption(disabledOptions);

  const onClickProcessed = async () => {
    try {
      setState("loading");
      message.open({
        key: MESSAGE_KEY,
        type: "loading",
        content: "操作中",
      });

      await onClick?.();

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
    <Popconfirm
      cancelButtonProps={{
        autoInsertSpace: false,
      }}
      cancelText="取消"
      getPopupContainer={(triggerNode) => triggerNode}
      icon={null}
      okButtonProps={{
        autoInsertSpace: false,
      }}
      okText="确认"
      title={confirmTitle}
      onConfirm={() => {
        // ! 注意：不能直接使用 onClickProcessed；因为 Popconfirm 组件支持异步 onConfirm，会使得 Popconfirm 组件无法同步关闭
        onClickProcessed();
      }}
    >
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
          onClick={undefined}
        />
      </Popover>
    </Popconfirm>
  );
};
