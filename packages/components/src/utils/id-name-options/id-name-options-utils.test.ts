import { expect, it } from "vitest";

import type { IdNameOptions } from "./id-name-options";
import { findNode, getChildrenIds, getIsHalfChecked } from "./id-name-options-utils";

const ID_NAME_OPTIONS: IdNameOptions = [
  {
    id: "1",
    name: "1",
    children: [
      {
        id: "1-1",
        name: "1-1",
        children: [
          { id: "1-1-1", name: "1-1-1" },
          { id: "1-1-2", name: "1-1-2" },
          { id: "1-1-3", name: "1-1-3" },
        ],
      },
      {
        id: "1-2",
        name: "1-2",
        children: [
          { id: "1-2-1", name: "1-2-1" },
          { id: "1-2-2", name: "1-2-2" },
          { id: "1-2-3", name: "1-2-3" },
        ],
      },
    ],
  },
];

it("should return node", () => {
  const node = findNode(ID_NAME_OPTIONS, "1-1-1");
  expect(node?.id).toBe("1-1-1");
});

it("should return all children ids", () => {
  const childrenIds = getChildrenIds(ID_NAME_OPTIONS, "1");
  expect(childrenIds).toEqual(["1-1", "1-2", "1-1-1", "1-1-2", "1-1-3", "1-2-1", "1-2-2", "1-2-3"]);
});

it("should return half checked", () => {
  const isHalfChecked = getIsHalfChecked(ID_NAME_OPTIONS, "1-1", ["1-1-1"]);
  expect(isHalfChecked).toBe(true);
});

it("should return not half checked", () => {
  const isHalfChecked = getIsHalfChecked(ID_NAME_OPTIONS, "1-1", ["1-1-1", "1-1-2", "1-1-3"]);
  expect(isHalfChecked).toBe(false);
});
