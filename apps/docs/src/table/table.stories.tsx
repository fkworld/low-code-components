import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table } from "components";
import { expect } from "storybook/test";

const meta: Meta<typeof Table> = {
  title: "Table/Table",
  component: Table,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Data = { id: number; field0: string; field1: string };

const DEFAULT_DATA: Array<Data> = [
  {
    id: 0,
    field0: "行0列0",
    field1: "行0列1",
  },
  {
    id: 1,
    field0: "行1列0",
    field1: "行1列1",
  },
];

export const Default: StoryObj<typeof Table<Data>> = {
  args: {
    data: DEFAULT_DATA,
    items: [
      {
        label: "列0",
        contentNodeValueKey: "field0",
      },
      {
        label: "列1",
        contentNodeValueKey: "field1",
      },
    ],
  },
  play: async ({ canvasElement }) => {
    expect(canvasElement).toHaveTextContent("列0");
    expect(canvasElement).toHaveTextContent("列1");
    expect(canvasElement).toHaveTextContent("行0列0");
    expect(canvasElement).toHaveTextContent("行0列1");
    expect(canvasElement).toHaveTextContent("行1列0");
    expect(canvasElement).toHaveTextContent("行1列1");
  },
};

export const LabelHelper: StoryObj<typeof Table<Data>> = {
  args: {
    data: DEFAULT_DATA,
    items: [
      {
        label: "列0",
        contentNodeValueKey: "field0",
        labelHelper: "列0说明",
      },
      {
        label: "列1",
        contentNodeValueKey: "field1",
        labelHelper: "列1说明",
      },
    ],
  },
};

export const CustomRender: StoryObj<typeof Table<Data>> = {
  args: {
    data: DEFAULT_DATA,
    items: [
      {
        label: "列0",
        content: <div>列0自定义渲染</div>,
      },
      {
        label: "列1",
        contentCustomRender: (row) => <div>列1行{row?.id}自定义渲染</div>,
      },
    ],
  },
  play: async ({ canvasElement }) => {
    expect(canvasElement).toHaveTextContent("列0自定义渲染");
    expect(canvasElement).toHaveTextContent("列1行0自定义渲染");
    expect(canvasElement).toHaveTextContent("列1行1自定义渲染");
  },
};

export const ColumnHidden: StoryObj<typeof Table<Data>> = {
  args: {
    data: DEFAULT_DATA,
    items: [
      {
        label: "列0",
        contentNodeValueKey: "field0",
      },
      {
        label: "列1",
        contentNodeValueKey: "field1",
        hidden: true,
      },
    ],
  },
  play: async ({ canvasElement }) => {
    expect(canvasElement).toHaveTextContent("列0");
    expect(canvasElement).not.toHaveTextContent("列1");
    expect(canvasElement).toHaveTextContent("行0列0");
    expect(canvasElement).not.toHaveTextContent("行0列1");
    expect(canvasElement).toHaveTextContent("行1列0");
    expect(canvasElement).not.toHaveTextContent("行1列1");
  },
};

export const Empty: StoryObj<typeof Table<Data>> = {
  args: {
    data: [],
    items: [
      {
        label: "列0",
        contentNodeValueKey: "field0",
        size: 1000,
      },
      {
        label: "列1",
        contentNodeValueKey: "field0",
        size: 1000,
      },
      {
        label: "列2",
        contentNodeValueKey: "field0",
        size: 1000,
      },
      {
        label: "列3",
        contentNodeValueKey: "field0",
        size: 1000,
      },
    ],
  },
};

export const ClientSidePagination: StoryObj<typeof Table<Data>> = {
  args: {
    data: new Array(50).fill(0).map((_, index) => {
      return {
        id: index,
        field0: `列0行${index}`,
        field1: `列1行${index}`,
      };
    }),
    items: [
      {
        label: "列0",
        contentNodeValueKey: "field0",
      },
      {
        label: "列1",
        contentNodeValueKey: "field1",
      },
    ],
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    expect(canvasElement).toHaveTextContent("共 50 条 - 5 页");
    expect(canvasElement).not.toHaveTextContent("列0行99");
    await userEvent.click(canvas.getByText("4"));
    expect(canvasElement).toHaveTextContent("列0行39");
    await userEvent.click(canvas.getByText("1"));
    expect(canvasElement).not.toHaveTextContent("列0行39");
  },
};

export const Scroll: StoryObj<typeof Table<Data>> = {
  args: {
    data: DEFAULT_DATA,
    items: [
      {
        label: "列1",
        content: "xxxxxxxxxx",
      },
      {
        label: "列2",
        content: "xxxxxxxxxx",
      },
      {
        label: "列3",
        content: "xxxxxxxxxx",
      },
      {
        label: "列4",
        content: "xxxxxxxxxx",
      },
      {
        label: "列5",
        content: "xxxxxxxxxx",
      },
      {
        label: "列6",
        content: "xxxxxxxxxx",
      },
      {
        label: "列7",
        content: "xxxxxxxxxx",
      },
      {
        label: "列8",
        content: "xxxxxxxxxx",
      },
      {
        label: "列9",
        content: "xxxxxxxxxx",
      },
      {
        label: "列10",
        content: "xxxxxxxxxx",
      },
      {
        label: "列11",
        content: "xxxxxxxxxx",
      },
      {
        label: "列12",
        content: "xxxxxxxxxx",
      },
      {
        label: "列13",
        content: "xxxxxxxxxx",
      },
      {
        label: "列14",
        content: "xxxxxxxxxx",
      },
      {
        label: "列15",
        content: "xxxxxxxxxx",
      },
      {
        label: "列16",
        content: "xxxxxxxxxx",
      },
      {
        label: "列17",
        content: "xxxxxxxxxx",
      },
      {
        label: "列18",
        content: "xxxxxxxxxx",
      },
      {
        label: "列19",
        content: "xxxxxxxxxx",
      },
      {
        label: "列20",
        content: "xxxxxxxxxx",
      },
    ],
  },
  play: async ({ canvas }) => {
    const tableContainer = canvas.getByRole("table").parentElement;
    expect(tableContainer).toBeInTheDocument();
    expect(tableContainer!.scrollWidth).toBeGreaterThan(tableContainer!.clientWidth);
  },
};

export const ColumnPinning: StoryObj<typeof Table<Data>> = {
  args: {
    data: DEFAULT_DATA,
    items: [
      {
        label: "列0",
        content: "xxxxxxxxxx",
        pinning: "right",
      },
      {
        label: "列1",
        content: "xxxxxxxxxx",
        pinning: "right",
      },
      {
        label: "列2",
        content: "xxxxxxxxxx",
        pinning: "left",
      },
      {
        label: "列3",
        content: "xxxxxxxxxx",
        pinning: "left",
      },
      {
        label: "列4",
        content: "xxxxxxxxxx",
      },
      {
        label: "列5",
        content: "xxxxxxxxxx",
      },
      {
        label: "列6",
        content: "xxxxxxxxxx",
      },
      {
        label: "列7",
        content: "xxxxxxxxxx",
      },
      {
        label: "列8",
        content: "xxxxxxxxxx",
      },
      {
        label: "列9",
        content: "xxxxxxxxxx",
      },
      {
        label: "列10",
        content: "xxxxxxxxxx",
      },
      {
        label: "列11",
        content: "xxxxxxxxxx",
      },
      {
        label: "列12",
        content: "xxxxxxxxxx",
      },
      {
        label: "列13",
        content: "xxxxxxxxxx",
      },
      {
        label: "列14",
        content: "xxxxxxxxxx",
      },
      {
        label: "列15",
        content: "xxxxxxxxxx",
      },
      {
        label: "列16",
        content: "xxxxxxxxxx",
      },
      {
        label: "列17",
        content: "xxxxxxxxxx",
      },
      {
        label: "列18",
        content: "xxxxxxxxxx",
      },
      {
        label: "列19",
        content: "xxxxxxxxxx",
      },
    ],
  },
  play: async ({ canvas }) => {
    const headers = canvas.getAllByRole("columnheader");
    expect(headers.at(0)).toHaveTextContent("列2");
    expect(headers.at(1)).toHaveTextContent("列3");
    expect(headers.at(-1)).toHaveTextContent("列1");
    expect(headers.at(-2)).toHaveTextContent("列0");
  },
};
