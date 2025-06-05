import { useRequest } from "ahooks";

export type IdNameOptionId = string | number;

export type IdNameOption = {
  id: IdNameOptionId;
  name: string;
  disabled?: boolean;
  color?: string;
  children?: Array<IdNameOption>;
};

export type IdNameOptions = Array<IdNameOption>;

export function useIdNameOptions(props: {
  options?: IdNameOptions;
  getOptions?: () => Promise<IdNameOptions | undefined>;
}): {
  idNameOptions: IdNameOptions;
  idNameOptionsLoading: boolean;
  idNameOptionsError?: Error;
} {
  const { options, getOptions } = props;

  const {
    data = [],
    loading,
    error,
  } = useRequest(async () => {
    return getOptions?.() ?? options ?? [];
  });

  return {
    idNameOptions: data,
    idNameOptionsLoading: loading,
    idNameOptionsError: error,
  };
}
