// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Mitglieder } = initSchema(schema);

export {
  Mitglieder
};