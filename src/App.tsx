import ActionableDataTable from './ActionableDataTable.tsx';
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

export default function App() {
  return (
    <main style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Datatable Architecture POC</h1>
      <h2>
        <code>{'<DataTable />'}</code>
      </h2>
      <DataTable data={users} columns={columns} keyFn={({ id }) => id} />
      <h2>
        <code>{'<ActionableDataTable />'}</code>
      </h2>
      <ActionableDataTable
        data={users}
        columns={columns}
        keyFn={({ id }) => id}
        actions={(user) => (
          <button onClick={() => alert(`Editing user ${user.id}`)} style={{ padding: '4px' }}>
            Edit
          </button>
        )}
        onChange={(selection) => {
          console.log('Selection changed:', Array.from(selection));
        }}
      />
      <p>
        <a href="https://github.com/GauBen/poc-datatable/blob/main/src/App.tsx">View Source</a>
      </p>
    </main>
  );
}
