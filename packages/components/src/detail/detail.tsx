import { DetailItem } from "./detail-item";
import type { DetailProps } from "./detail-types";

export function Detail<T>(props: DetailProps<T>) {
  const { items, data, columnsCount = 3 } = props;

  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))`,
      }}
    >
      {items?.map((item, itemIndex) => {
        return (
          <DetailItem
            key={String(item.label) + "__" + itemIndex}
            data={data}
            item={item}
          />
        );
      })}
    </div>
  );
}
