import type { Meta, StoryObj } from "@storybook/react-vite";
import { BaseNullSmall } from "components";
import { expect } from "storybook/internal/test";

const meta: Meta<typeof BaseNullSmall> = {
  title: "Base/BaseNullSmall",
  component: BaseNullSmall,
};

export default meta;

export const Default: StoryObj<typeof BaseNullSmall> = {
  play: async ({ canvas }) => {
    expect(canvas.getByText("--")).toBeInTheDocument();
  },
};
