import type { IdNameOptionId } from "./id-name-options";

function isValidId(id: IdNameOptionId | undefined): boolean {
  return !!id || id === 0;
}

export function isMatchId(id: IdNameOptionId | undefined, optionId: IdNameOptionId | undefined): boolean {
  if (isValidId(id) && isValidId(optionId)) {
    // ! 特别注意，这里抹平了 string 和 number 的差异
    // ! 背景是后端接口在处理枚举时细节不一致，有的是 string 有的是 number
    // ! 所以这里前端统一转换为 string 来比对
    return String(id) === String(optionId);
  }
  return false;
}

export function isMatchIds(
  ids: Array<IdNameOptionId | undefined> | undefined,
  optionId: IdNameOptionId | undefined,
): boolean {
  return ids?.some((id) => isMatchId(id, optionId)) ?? false;
}
