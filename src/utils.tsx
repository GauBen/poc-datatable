export const dateColumn = <T,>(get: (object: T) => Date) => ({
  render: (object: T) => get(object).toLocaleDateString(undefined, { dateStyle: 'short' }),
  sort: (a: T, z: T) => get(a).getTime() - get(z).getTime(),
});

export const stringColumn = <T,>(get: (object: T) => string) => ({
  render: (object: T) => get(object),
  sort: (a: T, z: T) => get(a).localeCompare(get(z)),
});
