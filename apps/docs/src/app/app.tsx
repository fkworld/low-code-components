import { Button } from "antd";
import { Node } from "components";
import type { FC } from "react";

export const App: FC = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Node
        type="displayText"
        value="Hello World"
      />
      <Button type="primary">Button</Button>
    </div>
  );
};
