export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  picture: { src: string; alt: string };
  registeredAt: Date;
  tags: string[];
};

export const users: User[] = [
  {
    id: 1,
    email: 'alice@example.com',
    firstName: 'Alice',
    lastName: 'Wonderland',
    picture: { src: `https://picsum.photos/seed/1/64`, alt: '' },
    registeredAt: new Date('2020-10-01'),
    tags: ['admin', 'user'],
  },
  {
    id: 2,
    email: 'bob@example.com',
    firstName: 'Bob',
    lastName: 'Builder',
    picture: { src: `https://picsum.photos/seed/2/64`, alt: '' },
    registeredAt: new Date('2020-05-02'),
    tags: ['user'],
  },
  {
    id: 3,
    email: 'charlie@example.com',
    firstName: 'Charlie',
    lastName: 'Brown',
    picture: { src: `https://picsum.photos/seed/3/64`, alt: '' },
    registeredAt: new Date('2020-01-03'),
    tags: ['user'],
  },
  {
    id: 4,
    email: 'david@example.com',
    firstName: 'David',
    lastName: 'Pie',
    picture: { src: `https://picsum.photos/seed/4/64`, alt: '' },
    registeredAt: new Date('2020-03-14'),
    tags: ['user', 'tester'],
  },
  {
    id: 5,
    email: 'eve@example.com',
    firstName: 'Eve',
    lastName: 'Online',
    picture: { src: `https://picsum.photos/seed/5/64`, alt: '' },
    registeredAt: new Date('2020-03-01'),
    tags: ['user', 'moderator'],
  },
  {
    id: 6,
    email: 'frank@example.com',
    firstName: 'Frank',
    lastName: 'Castle',
    picture: { src: `https://picsum.photos/seed/6/64`, alt: '' },
    registeredAt: new Date('2020-08-28'),
    tags: ['bot'],
  },
  {
    id: 7,
    email: 'grace@example.com',
    firstName: 'Grace',
    lastName: 'Hopper',
    picture: { src: `https://picsum.photos/seed/7/64`, alt: '' },
    registeredAt: new Date('2020-04-07'),
    tags: ['user', 'admin'],
  },
  {
    id: 8,
    email: 'hannah@example.com',
    firstName: 'Hannah',
    lastName: 'Montana',
    picture: { src: `https://picsum.photos/seed/8/64`, alt: '' },
    registeredAt: new Date('2020-07-04'),
    tags: ['user', 'singer'],
  },
];
