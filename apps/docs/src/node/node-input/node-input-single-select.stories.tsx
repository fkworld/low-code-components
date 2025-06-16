import type { Meta, StoryObj } from "@storybook/react-vite";
import { Node } from "components";

const meta: Meta<typeof Node> = {
  title: "Node-Input/NodeInputSingleSelect",
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
    type: "inputSingleSelect",
    options: [
      { id: "1", name: "option1" },
      { id: "2", name: "option2" },
    ],
  },
};

export const SearchNames: StoryObj<typeof Node> = {
  args: {
    type: "inputSingleSelect",
    options: [
      { id: "1", name: "option1" },
      { id: "2", name: "option2" },
    ],
  },
};
