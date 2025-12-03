import { useState } from 'react';
import { users, type User } from './data.ts';
import DataTable, { type Columns } from './DataTable.tsx';
import { dateColumn, stringArrayColumn, stringColumn } from './utils.tsx';

const columns: Columns<User> = {
  picture: {
    label: '',
    render: ({ picture }) => <img src={picture.src} alt={picture.alt} width={32} />,
  },
  name: {
    label: 'Name',
    render: ({ firstName, lastName }) => (
      <>
        <strong>{firstName}</strong> {lastName}
      </>
    ),
    sort: (a, z) => a.firstName.localeCompare(z.firstName) || a.lastName.localeCompare(z.lastName),
  },
  email: {
    label: 'Email',
    ...stringColumn((user: User) => user.email),
  },
  registeredAt: {
    label: 'Registered At',
    ...dateColumn((user: User) => user.registeredAt),
  },
  tags: {
    label: 'Tags',
    ...stringArrayColumn((user: User) => user.tags),
  },
};

const Complex = () => {
  const [selection, setSelection] = useState<Set<number>>(new Set());

  return (
    <DataTable
      data={users}
      columns={columns}
      renderHead={(columns, RenderColumn) => (
        <thead>
          <tr>
            <td>
              <input
                type="checkbox"
                ref={(input) => {
                  if (!input) return;
                  input.indeterminate = selection.size > 0 && selection.size < users.length;
                  input.checked = selection.size === users.length;
                }}
                onChange={() => {
                  if (selection.size === users.length) setSelection(new Set());
                  else setSelection(new Set(users.map(({ id }) => id)));
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
      renderRow={(item, columns, RenderCell) => (
        <tr key={item.id}>
          <td>
            <input
              type="checkbox"
              checked={selection.has(item.id)}
              onChange={() => {
                setSelection((selection) => {
                  const updated = new Set(selection);
                  if (selection.has(item.id)) updated.delete(item.id);
                  else updated.add(item.id);
                  return updated;
                });
              }}
            />
          </td>
          {Object.keys(columns).map((column) => (
            <RenderCell key={column} column={column} />
          ))}
          <td>
            <button onClick={() => alert(`Editing user ${item.id}`)} style={{ padding: '4px' }}>
              Edit
            </button>
          </td>
        </tr>
      )}
    />
  );
};

export default function App() {
  return (
    <main style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Datatable Architecture POC</h1>
      <h2>Simple use-case</h2>
      <DataTable data={users} columns={columns} keyFn={({ id }) => id} />
      <h2>Complex use-case</h2>
      <Complex />
    </main>
  );
}
