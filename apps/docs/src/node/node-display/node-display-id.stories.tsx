import type { Meta, StoryObj } from "@storybook/react-vite";
import { Typography } from "antd";
import { Node } from "components";
import { expect } from "storybook/test";

import { wait } from "../../utils/wait";

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

export const NullAndErrorValues: StoryObj<typeof Node> = {
  render: () => {
    return (
      <div className="grid grid-cols-2 gap-2">
        <div>Value</div>
        <div>Node</div>

        <Typography.Text code>{"undefined"}</Typography.Text>
        <Node
          options={TEST_OPTIONS}
          type="displayId"
          value={undefined}
        />

        <Typography.Text code>{"null"}</Typography.Text>
        <Node
          options={TEST_OPTIONS}
          type="displayId"
          // @ts-expect-error value 类型错误
          value={null}
        />

        <Typography.Text code>{'""'}</Typography.Text>
        <Node
          options={TEST_OPTIONS}
          type="displayId"
          value={""}
        />

        <Typography.Text code>{"0"}</Typography.Text>
        <Node
          options={TEST_OPTIONS}
          type="displayId"
          value={0}
        />

        <Typography.Text code>{"false"}</Typography.Text>
        {/* @ts-expect-error value 类型错误 */}
        <Node
          options={TEST_OPTIONS}
          type="displayId"
          value={false}
        />

        <Typography.Text code>{"{}"}</Typography.Text>
        <Node
          options={TEST_OPTIONS}
          type="displayId"
          // @ts-expect-error value 类型错误
          value={{}}
        />

        <Typography.Text code>{"[]"}</Typography.Text>
        <Node
          options={TEST_OPTIONS}
          type="displayId"
          // @ts-expect-error value 类型错误
          value={[]}
        />

        <Typography.Text code>{"() => {}"}</Typography.Text>
        <Node
          options={TEST_OPTIONS}
          type="displayId"
          // @ts-expect-error value 类型错误
          value={() => {}}
        />
      </div>
    );
  },
  play: async ({ canvas }) => {
    expect(canvas.getByText("undefined", { selector: "code" }).parentElement?.nextSibling).toHaveTextContent("--");
    expect(canvas.getByText("null", { selector: "code" }).parentElement?.nextSibling).toHaveTextContent("--");
    expect(canvas.getByText('""', { selector: "code" }).parentElement?.nextSibling).toHaveTextContent("--");
    expect(canvas.getByText("0", { selector: "code" }).parentElement?.nextSibling).toHaveTextContent("ERROR");
    expect(canvas.getByText("false", { selector: "code" }).parentElement?.nextSibling).toHaveTextContent("ERROR");
    expect(canvas.getByText("[]", { selector: "code" }).parentElement?.nextSibling).toHaveTextContent("ERROR");
    expect(canvas.getByText("{}", { selector: "code" }).parentElement?.nextSibling).toHaveTextContent("ERROR");
    expect(canvas.getByText("() => {}", { selector: "code" }).parentElement?.nextSibling).toHaveTextContent("ERROR");
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
