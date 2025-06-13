import type { Meta, StoryObj } from "@storybook/react-vite";
import { BaseOpButton } from "components";
import { expect } from "storybook/test";

import { wait } from "../utils/wait";

const meta: Meta<typeof BaseOpButton> = {
  title: "Base/BaseOpButton",
  component: BaseOpButton,
};

export default meta;

export const Default: StoryObj<typeof BaseOpButton> = {
  args: {
    children: "操作",
  },
  play: async ({ canvasElement }) => {
    expect(canvasElement).toHaveTextContent("操作");
  },
};

export const OperateSuccess: StoryObj<typeof BaseOpButton> = {
  args: {
    children: "操作",
    onClick: () => {},
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText("操作"));
    await wait(100);
    expect(canvas.getByLabelText("check-circle")).toBeInTheDocument();
    await wait(2000);
    expect(canvas.queryByLabelText("check-circle")).not.toBeInTheDocument();
  },
};

export const OperateFail: StoryObj<typeof BaseOpButton> = {
  args: {
    children: "操作",
    onClick: async () => {
      throw new Error();
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText("操作"));
    await wait(100);
    expect(canvas.getByLabelText("close-circle")).toBeInTheDocument();
    await wait(2000);
    expect(canvas.queryByLabelText("close-circle")).not.toBeInTheDocument();
  },
};

export const AsyncOperateSuccess: StoryObj<typeof BaseOpButton> = {
  args: {
    children: "操作",
    onClick: async () => {
      await wait(2000);
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText("操作"));
    await wait(100);
    expect(canvas.getByLabelText("loading")).toBeInTheDocument();
    await wait(2000);
    expect(canvas.getByLabelText("check-circle")).toBeInTheDocument();
    await wait(2000);
    expect(canvas.queryByLabelText("check-circle")).not.toBeInTheDocument();
  },
};

export const AsyncOperateFail: StoryObj<typeof BaseOpButton> = {
  args: {
    children: "操作",
    onClick: async () => {
      await wait(2000);
      throw new Error("");
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText("操作"));
    await wait(100);
    expect(canvas.getByLabelText("loading")).toBeInTheDocument();
    await wait(2000);
    expect(canvas.getByLabelText("close-circle")).toBeInTheDocument();
    await wait(2000);
    expect(canvas.queryByLabelText("close-circle")).not.toBeInTheDocument();
  },
};

export const Disabled: StoryObj<typeof BaseOpButton> = {
  args: {
    children: "操作",
    disabledOptions: [{ disabled: true, disabledReason: "禁用原因" }],
  },
  play: async ({ canvas }) => {
    expect(canvas.getByRole("button")).toBeDisabled();
  },
};
