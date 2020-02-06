import moment from 'moment';
import faker from 'faker';

export default [
  { id: 1, date: moment().format('YYYY-MM-DD'), amount: faker.random.number() },
  { id: 2, date: moment().format('YYYY-MM-DD'), amount: faker.random.number() },
  { id: 3, date: moment().format('YYYY-MM-DD'), amount: faker.random.number() },
  { id: 4, date: moment().format('YYYY-MM-DD'), amount: faker.random.number() },
  { id: 5, date: moment().format('YYYY-MM-DD'), amount: faker.random.number() },
  { id: 6, date: moment().format('YYYY-MM-DD'), amount: faker.random.number() },
  { id: 7, date: moment().format('YYYY-MM-DD'), amount: faker.random.number() },
];
