import { difference } from "lodash-es";

import type { IdNameOption, IdNameOptions } from "./id-name-options";

export function findNode(options: IdNameOptions, id: string | number): IdNameOption | undefined {
  for (const option of options) {
    if (option.id === id) {
      return option;
    }
    if (option.children) {
      const node = findNode(option.children, id);
      if (node) {
        return node;
      }
    }
  }
}

export function getChildrenIds(options: IdNameOptions, id: string | number): Array<string | number> {
  const node = findNode(options, id);
  if (!node) {
    return [];
  }
  if (!node.children) {
    return [];
  }

  const result: Array<string | number> = [];
  const queue = [...node.children];
  while (queue.length) {
    const current = queue.shift();
    if (!current) {
      continue;
    }
    if (current.children) {
      queue.push(...current.children);
    }
    result.push(current.id);
  }
  return result;
}

export function getIsHalfChecked(options: IdNameOptions, id: string | number, ids: Array<string | number>): boolean {
  const childIds = getChildrenIds(options, id);
  return difference(childIds, ids).length !== 0;
}
