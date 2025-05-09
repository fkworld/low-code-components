import { useRequest } from "ahooks";
import type { CheckboxOptionType, SelectProps, TreeSelectProps } from "antd";

import { isMatchId } from "./match-utils";

export type IdNameOptionId = string | number;

export type IdNameOption = {
  id: IdNameOptionId;
  name: string;
  disabled?: boolean;
  color?: string;
  children?: Array<IdNameOption>;
};

export type IdNameOptions = Array<IdNameOption>;

export function getNameFormId(id: IdNameOptionId | undefined, options: IdNameOptions): string | undefined {
  return options.find((option) => isMatchId(id, option.id))?.name;
}

export function useIdNameOptions(options?: IdNameOptions, getOptions?: () => Promise<IdNameOptions | undefined>) {
  const { data = [], loading } = useRequest(
    async () => {
      try {
        if (options) {
          return options;
        }
        if (getOptions) {
          return getOptions();
        }
        return [];
      } catch {
        return [];
      }
    },
    {
      refreshDeps: [options, getOptions],
      // 解决首次打开时调用 2 次的问题
      debounceWait: 1,
    },
  );

  return {
    idNameOptions: data,
    idNameOptionsLoading: loading,
  };
}

export function transToSelectOptions(options?: IdNameOptions): SelectProps["options"] {
  if (!options || !Array.isArray(options)) {
    return [];
  }

  return options.map((option) => {
    return { label: option.name, value: option.id, disabled: option.disabled };
  });
}

export function transToTreeSelectOptions(options?: IdNameOptions): TreeSelectProps["treeData"] {
  if (!options || !Array.isArray(options)) {
    return [];
  }

  return options.map((option) => {
    return {
      label: option.name,
      value: option.id,
      disabled: option.disabled,
      children: option.children && transToTreeSelectOptions(option.children),
    };
  });
}

export function transToCheckboxOptions(options?: IdNameOptions): Array<CheckboxOptionType> {
  if (!options || !Array.isArray(options)) {
    return [];
  }

  return options.map((option) => {
    return { label: option.name, value: option.id, disabled: option.disabled };
  });
}

export function transToRadioOptions(options?: IdNameOptions): Array<CheckboxOptionType> {
  if (!options || !Array.isArray(options)) {
    return [];
  }

  return options.map((option) => {
    return { label: option.name, value: option.id, disabled: option.disabled };
  });
}

export function filterIdNameOptions(
  options: IdNameOptions | undefined,
  filter: (option: IdNameOption) => boolean,
): IdNameOptions | undefined {
  return options?.filter(filter).map((option) => {
    if (option.children) {
      return { ...option, children: filterIdNameOptions(option.children, filter) };
    }
    return option;
  });
}
