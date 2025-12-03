import { useState, type Key, type ReactNode } from 'react';

export type Columns<T> = Record<
  string,
  {
    label: string;
    render: (item: T) => ReactNode;
    sort?: (a: T, z: T) => number;
  }
>;

export default function DataTable<T>({
  data,
  columns,
  renderHead,
  renderRow,
  keyFn,
}: {
  data: T[];
  columns: Columns<T>;
  renderHead?: (
    columns: Columns<T>,
    RenderColumn: (props: { column: keyof Columns<T> }) => ReactNode
  ) => ReactNode;
} & ( // keyFn and renderRow are mutually exclusive, we only need a keyFn for the default renderRow implementation
  | {
      renderRow: (
        item: T,
        columns: Columns<T>,
        RenderCell: (props: { column: keyof Columns<T> }) => ReactNode
      ) => ReactNode;
      keyFn?: never;
    }
  | { renderRow?: never; keyFn: (item: T) => Key }
)) {
  renderHead ??= (columns, RenderColumn) => (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <RenderColumn key={column} column={column} />
        ))}
      </tr>
    </thead>
  );

  renderRow ??= (item, columns, RenderCell) => (
    <tr key={keyFn!(item)}>
      {Object.keys(columns).map((column) => (
        <RenderCell key={column} column={column} />
      ))}
    </tr>
  );

  const [sort, setSort] = useState<{ column: keyof Columns<T>; direction: -1 | 1 }>();

  const sorted = sort
    ? data.toSorted((a, z) => columns[sort.column].sort!(a, z) * sort.direction)
    : data;

  return (
    <table>
      {renderHead(columns, ({ column }) => (
        <th key={column}>
          {columns[column].label}{' '}
          {columns[column].sort && (
            <button
              style={{ padding: '4px' }}
              onClick={() => {
                setSort((currentSort) => {
                  if (currentSort?.column === column)
                    if (currentSort.direction === 1) return { column, direction: -1 };
                    else return undefined;
                  else return { column, direction: 1 };
                });
              }}
            >
              {sort?.column === column ? (sort.direction === 1 ? '🔼' : '🔽') : '⇅'}
            </button>
          )}
        </th>
      ))}
      <tbody>
        {sorted.map((item) =>
          renderRow(item, columns, ({ column }) => (
            <td key={column}>{columns[column].render(item)}</td>
          ))
        )}
      </tbody>
    </table>
  );
}
