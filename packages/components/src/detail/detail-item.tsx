import { get } from "lodash-es";

import { BaseHelper } from "../base/base-helper";
import { Node } from "../node/node";
import type { DetailItemProps } from "./detail-types";

export function DetailItem<T>(props: { data: T | undefined; item: DetailItemProps<T> }) {
  const {
    data,
    item: {
      customRender: itemCustomRender,
      columnSpan: itemColumnSpan = 1,
      label,
      labelCustomRender,
      labelHelper,
      labelHelperCustomRender,
      labelSecondary,
      labelSecondaryCustomRender,
      valueKey,
      valueNodeProps,
      content,
      contentCustomRender,
    } = {},
  } = props;

  if (itemCustomRender) {
    return itemCustomRender(data);
  }

  const labelString = labelCustomRender ? labelCustomRender(data) : label;
  const labelHelperNode = labelHelperCustomRender ? labelHelperCustomRender(data) : labelHelper;
  const labelSecondaryNode = labelSecondaryCustomRender ? labelSecondaryCustomRender(data) : labelSecondary;
  const contentNode = valueKey ? (
    <Node
      type={valueNodeProps?.type || "displayText"}
      {...valueNodeProps}
      value={get(data, valueKey)}
    />
  ) : contentCustomRender ? (
    contentCustomRender(data)
  ) : (
    content
  );

  return (
    <div
      style={{
        gridColumn: `span ${itemColumnSpan ?? 1}`,
      }}
    >
      <div className="text-b50">
        <span>{labelString}</span>
        <span> </span>
        <BaseHelper helper={labelHelperNode} />
      </div>
      {labelSecondaryNode && <div className="text-size-s1 text-b20">{labelSecondaryNode}</div>}
      <div>{contentNode}</div>
    </div>
  );
}
