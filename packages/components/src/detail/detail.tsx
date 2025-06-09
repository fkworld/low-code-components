import { DetailItem } from "./detail-item";
import type { UseDetailProps } from "./detail-types";
import { useDetail } from "./use-detail";

export function Detail<T>(props: UseDetailProps<T>) {
  const {
    detailIns: { data, columnsCount = 3, getItems },
  } = useDetail(props);

  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))`,
      }}
    >
      {getItems()?.map((itemIns) => {
        return (
          <DetailItem
            key={itemIns.id}
            data={data}
            itemIns={itemIns}
          />
        );
      })}
    </div>
  );
}
