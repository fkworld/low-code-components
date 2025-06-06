import type { Meta, StoryObj } from "@storybook/react-vite";
import { Node } from "components";
import { expect } from "storybook/test";

const meta: Meta<typeof Node> = {
  title: "Node-Display/NodeDisplayTime",
  component: Node,
  argTypes: {
    type: {
      control: false,
    },
  },
};

export default meta;

export const DefaultTime: StoryObj<typeof Node> = {
  args: {
    type: "displayTime",
    value: 1749168000000,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("2025-06-06 00:00:00")).toBeInTheDocument();
  },
};

export const SimpleTime: StoryObj<typeof Node> = {
  args: {
    type: "displayTime",
    value: 1749168000000,
    format: "YYYY-MM-DD",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("2025-06-06")).toBeInTheDocument();
  },
};
