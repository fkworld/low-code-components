import type { Meta, StoryObj } from "@storybook/react-vite";
import { Node } from "components";
import { expect } from "storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Node> = {
  title: "Node-Display/NodeDisplayText",
  component: Node,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: false,
      table: {
        defaultValue: {
          summary: "displayText",
        },
      },
    },
  },
  args: {
    type: "displayText",
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
