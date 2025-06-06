import type { Meta, StoryObj } from "@storybook/react-vite";
import { BaseHelper } from "components";

const meta: Meta<typeof BaseHelper> = {
  title: "Base/BaseHelper",
  component: BaseHelper,
};

export default meta;

export const Default: StoryObj<typeof BaseHelper> = {
  args: {
    helper: "helper text",
  },
};
