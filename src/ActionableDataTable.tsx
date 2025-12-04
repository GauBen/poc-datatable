import { type Key, type ReactNode, useState } from 'react';
import DataTable, { type Columns } from './DataTable.tsx';

export default function ActionableDataTable<T, K extends Key>({
  data,
  columns,
  keyFn,
  actions,
  onChange,
}: {
  data: T[];
  columns: Columns<T>;
  keyFn: (item: T) => K;
  actions: (item: T) => ReactNode;
  onChange?: (selectedKeys: Set<K>) => void;
}) {
  const [selection, setSelection] = useState<Set<K>>(new Set());

  return (
    <DataTable
      data={data}
      columns={columns}
      renderHead={(columns, RenderColumn) => (
        <thead>
          <tr>
            <td>
              <input
                type="checkbox"
                ref={(input) => {
                  if (!input) return;
                  input.indeterminate = selection.size > 0 && selection.size < data.length;
                  input.checked = selection.size === data.length;
                }}
                onChange={() => {
                  const updated =
                    selection.size === data.length ? new Set<K>() : new Set(data.map(keyFn));
                  setSelection(updated);
                  onChange?.(updated);
                }}
              />
            </td>
            {Object.keys(columns).map((column) => (
              <RenderColumn key={column} column={column} />
            ))}
            <td>Actions</td>
          </tr>
        </thead>
      )}
      renderRow={(item, columns, RenderCell) => {
        const key = keyFn(item);
        return (
          <tr key={key}>
            <td>
              <input
                type="checkbox"
                checked={selection.has(key)}
                onChange={() => {
                  const updated = new Set(selection);
                  if (selection.has(key)) updated.delete(key);
                  else updated.add(key);
                  setSelection(updated);
                  onChange?.(updated);
                }}
              />
            </td>
            {Object.keys(columns).map((column) => (
              <RenderCell key={column} column={column} />
            ))}
            <td>{actions(item)}</td>
          </tr>
        );
      }}
    />
  );
}
