import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import type { FC } from "react";

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

  if (!value) {
    return <BaseNullSmall />;
  }

  return dayjs.utc(value).format(format);
};
