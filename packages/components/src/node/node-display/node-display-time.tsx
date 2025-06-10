import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import type { FC } from "react";
import z from "zod/v4";

import { BaseErrorSmall } from "../../base/base-error-small";
import { BaseNullSmall } from "../../base/base-null-small";
import type { BaseNodeProps } from "../node-types";

dayjs.extend(timezone);
dayjs.extend(utc);

export const NodeDisplayTime: FC<
  BaseNodeProps<number> & {
    type: "displayTime";
    format?: "YYYY-MM-DD HH:mm:ss" | "YYYY-MM-DD";
  }
> = (props) => {
  const { value, format = "YYYY-MM-DD HH:mm:ss" } = props;

  if (z.union([z.undefined(), z.null(), z.literal(0)]).safeParse(value).success) {
    return <BaseNullSmall />;
  }

  if (!z.number().safeParse(value).success) {
    return <BaseErrorSmall errorReason="[类型错误] value" />;
  }

  return dayjs.utc(value).format(format);
};
