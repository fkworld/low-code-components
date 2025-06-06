import { get } from "lodash-es";

import { BaseHelper } from "../base/base-helper";
import { Node } from "../node/node";
import type { DetailItemProps } from "./detail-types";

export function DetailItem<T>(props: { data: T | undefined; item: DetailItemProps<T> }) {
  const {
    data,
    item: {
      itemSpan = 1,
      customRender,
      label,
      labelCustomRender,
      labelHelper,
      labelHelperCustomRender,
      labelSecondary,
      labelSecondaryCustomRender,
      contentNodeValueKey,
      contentNodeProps,
      content,
      contentCustomRender,
    } = {},
  } = props;

  if (customRender) {
    return customRender(data);
  }

  const labelString = labelCustomRender ? labelCustomRender(data) : label;
  const labelHelperNode = labelHelperCustomRender ? labelHelperCustomRender(data) : labelHelper;
  const labelSecondaryNode = labelSecondaryCustomRender ? labelSecondaryCustomRender(data) : labelSecondary;
  const contentNode = contentNodeValueKey ? (
    <Node
      type={contentNodeProps?.type || "displayText"}
      {...contentNodeProps}
      value={get(data, contentNodeValueKey)}
    />
  ) : contentCustomRender ? (
    contentCustomRender(data)
  ) : (
    content
  );

  return (
    <div
      style={{
        gridColumn: `span ${itemSpan}`,
      }}
    >
      <div>
        <span className="text-b50">{labelString}</span>
        <span> </span>
        <BaseHelper helper={labelHelperNode} />
      </div>
      {labelSecondaryNode && <div className="text-size-s1 text-b20">{labelSecondaryNode}</div>}
      <div>{contentNode}</div>
    </div>
  );
}
