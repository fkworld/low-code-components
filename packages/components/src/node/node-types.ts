import type { IdNameOptions } from "../utils/id-name-options/id-name-options";

export type BaseNodeProps<T> = {
  defaultValue?: T;
  value?: T;
  onChange?: (value?: T) => void;

  options?: IdNameOptions;
  getOptions?: () => Promise<IdNameOptions | undefined>;

  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
};
