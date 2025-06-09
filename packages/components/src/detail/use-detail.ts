import { fromPairs } from "lodash-es";
import { useImmer } from "use-immer";

import type { DetailItemIns, UseDetailProps, UseDetailResult } from "./detail-types";

export function useDetail<T>(props: UseDetailProps<T>): UseDetailResult<T> {
  const { items = [], columnsCount = 3, data } = props;

  const [expandedState, updateExpandedState] = useImmer(
    fromPairs(
      items.map((item, itemIndex) => {
        const id = item.label + "__" + itemIndex;
        return [id, true];
      }),
    ),
  );

  const itemsIns = items.map<DetailItemIns<T>>((item, itemIndex) => {
    const id = item.label + "__" + itemIndex;
    return {
      id,
      itemDef: item,
      getIsSelfExpanded: () => expandedState[id],
      getIsFinalExpanded: () => {
        let stack: Array<{
          id: string;
          titleLevel: number;
        }> = [];

        for (let i = 0; i < items.length; i += 1) {
          const curItem = items[i];
          const curItemId = curItem.label + "__" + i;

          if (curItemId === id) {
            break;
          }

          if (curItem.contentNodeProps?.type === "displayTitle") {
            const curItemTitleLevel = curItem.contentNodeProps.level ?? 1;
            stack = stack.filter((v) => v.titleLevel < curItemTitleLevel);
            stack.push({
              id: curItemId,
              titleLevel: curItemTitleLevel,
            });
          }
        }

        const isExpanded = stack.every((v) => expandedState[v.id]);

        return isExpanded;
      },
      toggleExpanded: (expanded) => {
        updateExpandedState((draft) => {
          draft[id] = expanded ?? !draft[id];
        });
      },
    };
  });

  return {
    detailIns: {
      data,
      items,
      columnsCount,
      getItems: () => itemsIns,
    },
  };
}
