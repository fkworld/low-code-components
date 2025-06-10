import { Badge, Tag } from "antd";
import type { FC } from "react";
import { z } from "zod/v4";

import { BaseErrorSmall } from "../../base/base-error-small";
import { BaseNullSmall } from "../../base/base-null-small";
import { useIdNameOptions } from "../../utils/id-name-options/id-name-options";
import { isMatchId } from "../../utils/id-name-options/match-utils";
import type { BaseNodeProps } from "../node-types";

export const NodeDisplayId: FC<
  BaseNodeProps<string | number> & {
    type: "displayId";
    showType?: "text" | "tag" | "status";
  }
> = (props) => {
  const { value, options, getOptions, showType = "text" } = props;

  const { idNameOptions, idNameOptionsLoading, idNameOptionsError } = useIdNameOptions({ options, getOptions });

  if (z.union([z.undefined(), z.null(), z.literal("")]).safeParse(value).success) {
    return <BaseNullSmall />;
  }

  if (!z.union([z.string(), z.number()]).safeParse(value).success) {
    return <BaseErrorSmall errorReason="[类型错误] value" />;
  }

  if (idNameOptionsError) {
    return <BaseErrorSmall errorReason="[配置错误] options/getOptions" />;
  }

  if (idNameOptionsLoading) {
    return value;
  }

  const matchedOption = idNameOptions.find((option) => isMatchId(value, option.id));

  if (!matchedOption) {
    return <BaseErrorSmall errorReason="[配置错误] value 未找到匹配的 option" />;
  }

  if (showType === "tag") {
    return (
      <Tag
        bordered={false}
        color={matchedOption.color}
        style={{ marginRight: 0 }}
      >
        {matchedOption.name}
      </Tag>
    );
  }

  if (showType === "status") {
    return (
      <Badge
        color={matchedOption.color}
        text={matchedOption.name}
      />
    );
  }

  return <div>{matchedOption.name}</div>;
};
