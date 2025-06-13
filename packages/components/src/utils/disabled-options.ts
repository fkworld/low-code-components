export type DisabledOption = {
  disabled: boolean;
  disabledReason?: string;
};

export type DisabledOptions = Array<DisabledOption>;

export function getDisabledOption(disabledOptions?: DisabledOptions): DisabledOption | undefined {
  return disabledOptions?.find((v) => v.disabled);
}
