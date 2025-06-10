import type { FC } from "react";
import { z } from "zod/v4";

import { BaseErrorSmall } from "../../base/base-error-small";
import { BaseNullSmall } from "../../base/base-null-small";
import type { BaseNodeProps } from "../node-types";

export const NodeDisplayText: FC<
  BaseNodeProps<string | number | boolean> & {
    type: "displayText";
  }
> = (props) => {
  const { value } = props;

  if (z.union([z.undefined(), z.null(), z.literal("")]).safeParse(value).success) {
    return <BaseNullSmall />;
  }

  if (!z.union([z.string(), z.number(), z.boolean()]).safeParse(value).success) {
    return <BaseErrorSmall errorReason="[类型错误] value" />;
  }

  return <div>{String(value)}</div>;
};
