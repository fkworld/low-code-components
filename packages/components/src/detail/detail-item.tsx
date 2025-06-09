import { get } from "lodash-es";

import { BaseHelper } from "../base/base-helper";
import { Node } from "../node/node";
import type { DetailItemIns } from "./detail-types";

export function DetailItem<T>(props: { data: T | undefined; itemIns: DetailItemIns<T> }) {
  const { data, itemIns } = props;

  const {
    itemDef: {
      itemSpan = 1,
      itemCustomRender,
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
    },
  } = itemIns;

  if (!itemIns.getIsFinalExpanded()) {
    return null;
  }

  if (itemCustomRender) {
    return (
      <div
        style={{
          gridColumn: `span ${itemSpan}`,
        }}
      >
        {itemCustomRender(data)}
      </div>
    );
  }

  if (contentNodeProps?.type === "displayTitle") {
    return (
      <div className="col-span-full">
        <Node
          {...contentNodeProps}
          collapsed={itemIns.getIsSelfExpanded()}
          onToggleCollapsed={itemIns.toggleExpanded}
        />
      </div>
    );
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
