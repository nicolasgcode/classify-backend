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
    // Never use this in production
    disableForeignKeys: true,
    createForeignKeyConstraints: true,
    ignoreSchema: [],
  },
});

export const syncSchema = async () => {
  const generator = orm.getSchemaGenerator();
  if (false) {
    await generator.dropSchema();
    await generator.createSchema();
  }
  await generator.updateSchema();
};
