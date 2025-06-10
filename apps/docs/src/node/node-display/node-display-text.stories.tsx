import type { Meta, StoryObj } from "@storybook/react-vite";
import { Typography } from "antd";
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

export const Null: StoryObj<typeof Node> = {
  render: () => {
    return (
      <div className="grid grid-cols-2 gap-2">
        <div>Value</div>
        <div>Node</div>

        <Typography.Text code>{'""'}</Typography.Text>
        <Node
          type="displayText"
          value={""}
        />

        <Typography.Text code>{"0"}</Typography.Text>
        <Node
          type="displayText"
          value={0}
        />

        <Typography.Text code>{"false"}</Typography.Text>
        <Node
          type="displayText"
          value={false}
        />

        <Typography.Text code>{"undefined"}</Typography.Text>
        <Node
          type="displayText"
          value={undefined}
        />

        <Typography.Text code>{"null"}</Typography.Text>
        <Node
          type="displayText"
          // @ts-expect-error value 类型错误
          value={null}
        />
      </div>
    );
  },
  play: async ({ canvas }) => {
    expect(canvas.getByText('""', { selector: "code" }).parentElement?.nextSibling).toHaveTextContent("--");
    expect(canvas.getByText("0", { selector: "code" }).parentElement?.nextSibling).toHaveTextContent("0");
    expect(canvas.getByText("false", { selector: "code" }).parentElement?.nextSibling).toHaveTextContent("false");
    expect(canvas.getByText("undefined", { selector: "code" }).parentElement?.nextSibling).toHaveTextContent("--");
    expect(canvas.getByText("null", { selector: "code" }).parentElement?.nextSibling).toHaveTextContent("--");
  },
};

export const Error: StoryObj<typeof Node> = {
  render: () => {
    return (
      <div className="grid grid-cols-2 gap-2">
        <div>Value</div>
        <div>Node</div>

        <Typography.Text code>{"[]"}</Typography.Text>
        <Node
          type="displayText"
          // @ts-expect-error value 类型错误
          value={[]}
        />

        <Typography.Text code>{"{}"}</Typography.Text>
        <Node
          type="displayText"
          // @ts-expect-error value 类型错误
          value={{}}
        />

        <Typography.Text code>{"()=>{}"}</Typography.Text>
        <Node
          type="displayText"
          // @ts-expect-error value 类型错误
          value={() => {}}
        />
      </div>
    );
  },
  play: async ({ canvas }) => {
    expect(canvas.getByText("[]", { selector: "code" }).parentElement?.nextSibling).toHaveTextContent("ERROR");
    expect(canvas.getByText("{}", { selector: "code" }).parentElement?.nextSibling).toHaveTextContent("ERROR");
    expect(canvas.getByText("()=>{}", { selector: "code" }).parentElement?.nextSibling).toHaveTextContent("ERROR");
  },
};
