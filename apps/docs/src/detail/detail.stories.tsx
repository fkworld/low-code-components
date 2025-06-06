import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tag } from "antd";
import { Detail } from "components";
import { expect } from "storybook/test";

const meta: Meta<typeof Detail> = {
  title: "Detail/Detail",
  component: Detail,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const data = {
  field1: "字段1内容",
  field2: "字段2内容",
};

export const Default: StoryObj<typeof Detail<typeof data>> = {
  args: {
    data: data,
    items: [
      {
        label: "字段1",
        contentNodeValueKey: "field1",
      },
      {
        label: "字段2",
        contentNodeValueKey: "field2",
      },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("字段1内容")).toBeInTheDocument();
    await expect(canvas.getByText("字段2内容")).toBeInTheDocument();
  },
};

export const ItemSpan: StoryObj<typeof Detail<typeof data>> = {
  args: {
    data: data,
    items: [
      {
        label: "字段1",
        contentNodeValueKey: "field1",
        itemSpan: 2,
      },
      {
        label: "字段2",
        contentNodeValueKey: "field2",
      },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("字段1内容")).toBeInTheDocument();
    await expect(canvas.getByText("字段2内容")).toBeInTheDocument();
  },
};

export const LabelHelper: StoryObj<typeof Detail<typeof data>> = {
  args: {
    data: data,
    items: [
      {
        label: "字段1",
        labelHelper: "一段帮助文字",
        contentNodeValueKey: "field1",
      },
      {
        label: "字段2",
        labelHelperCustomRender: () => {
          return <Tag>自定义样式的帮助文字</Tag>;
        },
        contentNodeValueKey: "field2",
      },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("字段1")).toBeInTheDocument();
    await expect(canvas.getByText("字段1内容")).toBeInTheDocument();
    await expect(canvas.getByText("字段2")).toBeInTheDocument();
    await expect(canvas.getByText("字段2内容")).toBeInTheDocument();
  },
};

export const LabelSecondary: StoryObj<typeof Detail<typeof data>> = {
  args: {
    data: data,
    items: [
      {
        label: "字段1",
        labelHelper: "一段帮助文字",
        labelSecondary: "一段说明文字",
        contentNodeValueKey: "field1",
      },
      {
        label: "字段2",
        labelHelperCustomRender: () => {
          return <Tag>一段自定义样式的帮助文字</Tag>;
        },
        labelSecondaryCustomRender: () => {
          return <Tag>一段自定义样式的说明文字</Tag>;
        },
        contentNodeValueKey: "field2",
      },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("一段说明文字")).toBeInTheDocument();
  },
};

export const CustomItem: StoryObj<typeof Detail<typeof data>> = {
  args: {
    data: data,
    items: [
      {
        label: "字段1",
        contentNodeValueKey: "field1",
      },
      {
        label: "字段2",
        contentNodeValueKey: "field2",
      },
      {
        label: "字段3",
        customRender: () => {
          return <div>整体自定义渲染</div>;
        },
      },
      {
        label: "字段4",
        contentCustomRender: () => {
          return <div>内容自定义渲染</div>;
        },
      },
    ],
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvasElement).not.toHaveTextContent("字段3");
    await expect(canvas.getByText("整体自定义渲染")).toBeInTheDocument();
    await expect(canvas.getByText("字段4")).toBeInTheDocument();
    await expect(canvas.getByText("内容自定义渲染")).toBeInTheDocument();
  },
};
