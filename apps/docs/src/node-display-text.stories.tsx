import type { Meta, StoryObj } from "@storybook/react-vite";
import { Node } from "components";
import { expect } from "storybook/test";

const meta: Meta<typeof Node> = {
  title: "Node-Display/NodeDisplayText",
  component: Node,
  argTypes: {
    type: {
      control: false,
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Node> = {
  args: {
    type: "displayText",
    value: "This is a node display text.",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("This is a node display text.")).toBeInTheDocument();
  },
};
