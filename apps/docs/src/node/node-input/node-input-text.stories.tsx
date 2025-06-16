import type { Meta, StoryObj } from "@storybook/react-vite";
import { Node } from "components";

const meta: Meta<typeof Node> = {
  title: "Node-Input/NodeInputText",
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
    type: "inputText",
  },
};
