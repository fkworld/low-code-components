import type { Meta, StoryObj } from "@storybook/react-vite";
import { BaseNullBig } from "components";
import { expect } from "storybook/internal/test";

const meta: Meta<typeof BaseNullBig> = {
  title: "Base/BaseNullBig",
  component: BaseNullBig,
};

export default meta;

export const Default: StoryObj<typeof BaseNullBig> = {
  play: async ({ canvas }) => {
    expect(canvas.getByText("无数据")).toBeInTheDocument();
  },
};
