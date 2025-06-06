import type { Meta, StoryObj } from "@storybook/react-vite";
import { Node } from "components";
import { expect } from "storybook/test";

import { wait } from "./utils/wait";

const meta: Meta<typeof Node> = {
  title: "Node-Display/NodeDisplayId",
  component: Node,
  argTypes: {
    type: {
      control: false,
    },
  },
};

export default meta;

const TEST_OPTIONS = [
  { id: "1", name: "Option 1", color: "green" },
  { id: "2", name: "Option 2", color: "red" },
];

export const StaticOptions: StoryObj<typeof Node> = {
  args: {
    type: "displayId",
    value: "1",
    options: [
      { id: "1", name: "Option 1" },
      { id: "2", name: "Option 2" },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Option 1")).toBeInTheDocument();
  },
};

export const DynamicOptions: StoryObj<typeof Node> = {
  args: {
    type: "displayId",
    value: "1",
    getOptions: async () => {
      await wait(1000);
      return TEST_OPTIONS;
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("1")).toBeInTheDocument();
    await wait(1000);
    await expect(canvas.getByText("Option 1")).toBeInTheDocument();
  },
};

export const ShowTypeStatus: StoryObj<typeof Node> = {
  args: {
    type: "displayId",
    value: "1",
    options: TEST_OPTIONS,
    showType: "status",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Option 1")).toBeInTheDocument();
  },
};

export const ShowTypeTag: StoryObj<typeof Node> = {
  args: {
    type: "displayId",
    value: "1",
    options: TEST_OPTIONS,
    showType: "tag",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Option 1")).toBeInTheDocument();
  },
};

export const ErrorNoMatchedOption: StoryObj<typeof Node> = {
  args: {
    type: "displayId",
    value: "3",
    options: [
      { id: "1", name: "Option 1" },
      { id: "2", name: "Option 2" },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("ERROR")).toBeInTheDocument();
  },
};

export const ErrorGetOptionsError: StoryObj<typeof Node> = {
  args: {
    type: "displayId",
    value: "1",
    getOptions: async () => {
      await wait(1000);
      throw new Error("Dynamic function error");
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("1")).toBeInTheDocument();
    await wait(1000);
    await expect(canvas.getByText("ERROR")).toBeInTheDocument();
  },
};
