import type { Meta, StoryObj } from "@storybook/react-vite";
import { BaseErrorSmall } from "components";
import { expect } from "storybook/internal/test";

const meta: Meta<typeof BaseErrorSmall> = {
  title: "Base/BaseErrorSmall",
  component: BaseErrorSmall,
};

export default meta;

export const HasErrorReason: StoryObj<typeof BaseErrorSmall> = {
  args: {
    errorReason: "错误原因",
  },
  play: async ({ canvas }) => {
    expect(canvas.getByText("ERROR")).toBeInTheDocument();
  },
};

export const NoErrorReason: StoryObj<typeof BaseErrorSmall> = {
  args: {},
};
