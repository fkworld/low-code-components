import "../src/main.css";

import "@ant-design/v5-patch-for-react-19";

import type { Preview } from "@storybook/react-vite";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";

export default {
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      return (
        <ConfigProvider locale={zhCN}>
          <Story />
        </ConfigProvider>
      );
    },
  ],
} satisfies Preview;
