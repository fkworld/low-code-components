import { Badge, Tag } from "antd";
import type { FC } from "react";

import { BaseErrorSmall } from "../../base/base-error-small";
import { useIdNameOptions } from "../../utils/id-name-options/id-name-options";
import { isMatchId } from "../../utils/id-name-options/match-utils";
import type { NodeProps } from "../node-types";

export const NodeDisplayId: FC<NodeProps<"displayId">> = (props) => {
  const { value, options, getOptions, showType = "text" } = props;

  const { idNameOptions, idNameOptionsLoading, idNameOptionsError } = useIdNameOptions({ options, getOptions });

  if (idNameOptionsLoading) {
    return value;
  }

  if (idNameOptionsError) {
    return <BaseErrorSmall errorReason="获取配置失败" />;
  }

  const matchedOption = idNameOptions.find((option) => isMatchId(value, option.id));

  if (!matchedOption) {
    return <BaseErrorSmall errorReason="未找到对应的 ID" />;
  }

  if (showType === "tag") {
    return (
      <Tag
        bordered={false}
        color={matchedOption.color}
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

  return matchedOption.name;
};
