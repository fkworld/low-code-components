import { useControllableValue } from "ahooks";
import { Select, Spin } from "antd";
import type { SelectProps } from "antd";
import type { DefaultOptionType } from "antd/es/select";
import type { FC } from "react";

import { BaseErrorBig } from "../../base/base-error-big";
import { BaseNullBig } from "../../base/base-null-big";
import { useIdNameOptions } from "../../utils/id-name-options/id-name-options";
import type { IdNameOptions } from "../../utils/id-name-options/id-name-options";
import type { BaseNodeProps } from "../node-types";

export function transToSelectOptions(options?: IdNameOptions): SelectProps["options"] {
  if (!options || !Array.isArray(options)) {
    return [];
  }

  return options.map((option) => {
    return { label: option.name, value: option.id, disabled: option.disabled };
  });
}

export const NodeInputSingleSelect: FC<
  BaseNodeProps<string | number> & {
    type: "inputSingleSelect";
  }
> = (props) => {
  const { options, getOptions, disabled, placeholder } = props;

  const [value, onChange] = useControllableValue<(typeof props)["value"]>(props);

  const { idNameOptions, idNameOptionsLoading, idNameOptionsError } = useIdNameOptions({ options, getOptions });

  return (
    <Spin spinning={idNameOptionsLoading}>
      <Select<string | number>
        allowClear
        disabled={disabled}
        filterOption={(input: string, option?: DefaultOptionType) => {
          return String(option?.label ?? "")
            .toLowerCase()
            .includes(input.toLowerCase());
        }}
        getPopupContainer={(triggerNode) => triggerNode}
        maxTagCount="responsive"
        notFoundContent={idNameOptionsError ? <BaseErrorBig /> : <BaseNullBig />}
        optionFilterProp="label"
        options={transToSelectOptions(idNameOptions)}
        placeholder={placeholder}
        showSearch={true}
        style={{
          width: "100%",
        }}
        value={value}
        onChange={onChange}
      />
    </Spin>
  );
};
