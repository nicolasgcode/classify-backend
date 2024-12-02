import { MikroORM } from '@mikro-orm/mysql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

export const orm = await MikroORM.init({
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: 'tp-dsw',
  clientUrl: process.env.DB_URI,

  highlighter: new SqlHighlighter(),
  debug: true,
  schemaGenerator: {
    createForeignKeyConstraints: true,
  },
});

export const syncSchema = async () => {
  const generator = orm.getSchemaGenerator();

  await generator.updateSchema();
};
