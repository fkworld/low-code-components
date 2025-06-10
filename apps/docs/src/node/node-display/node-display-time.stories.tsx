import type { Meta, StoryObj } from "@storybook/react-vite";
import { Typography } from "antd";
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

export const NullAndErrorValues: StoryObj<typeof Node> = {
  render: () => {
    return (
      <div className="grid grid-cols-2 gap-2">
        <div>Value</div>
        <div>Node</div>

        <Typography.Text code>{"undefined"}</Typography.Text>
        <Node
          type="displayTime"
          value={undefined}
        />

        <Typography.Text code>{"null"}</Typography.Text>
        <Node
          type="displayTime"
          // @ts-expect-error value 类型错误
          value={null}
        />

        <Typography.Text code>{'""'}</Typography.Text>
        {/* @ts-expect-error value 类型错误 */}
        <Node
          type="displayTime"
          value={""}
        />

        <Typography.Text code>{"0"}</Typography.Text>
        <Node
          type="displayTime"
          value={0}
        />

        <Typography.Text code>{"false"}</Typography.Text>
        {/* @ts-expect-error value 类型错误 */}
        <Node
          type="displayTime"
          value={false}
        />

        <Typography.Text code>{"[]"}</Typography.Text>
        <Node
          type="displayTime"
          // @ts-expect-error value 类型错误
          value={[]}
        />

        <Typography.Text code>{"{}"}</Typography.Text>
        <Node
          type="displayTime"
          // @ts-expect-error value 类型错误
          value={{}}
        />

        <Typography.Text code>{"()=>{}"}</Typography.Text>
        <Node
          type="displayTime"
          // @ts-expect-error value 类型错误
          value={() => {}}
        />
      </div>
    );
  },
  play: async ({ canvas }) => {
    expect(canvas.getByText("undefined", { selector: "code" }).parentElement?.nextSibling).toHaveTextContent("--");
    expect(canvas.getByText("null", { selector: "code" }).parentElement?.nextSibling).toHaveTextContent("--");
    expect(canvas.getByText('""', { selector: "code" }).parentElement?.nextSibling).toHaveTextContent("ERROR");
    expect(canvas.getByText("0", { selector: "code" }).parentElement?.nextSibling).toHaveTextContent("--");
    expect(canvas.getByText("false", { selector: "code" }).parentElement?.nextSibling).toHaveTextContent("ERROR");
    expect(canvas.getByText("[]", { selector: "code" }).parentElement?.nextSibling).toHaveTextContent("ERROR");
    expect(canvas.getByText("{}", { selector: "code" }).parentElement?.nextSibling).toHaveTextContent("ERROR");
    expect(canvas.getByText("()=>{}", { selector: "code" }).parentElement?.nextSibling).toHaveTextContent("ERROR");
  },
};
