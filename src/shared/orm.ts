import { MikroORM } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

export const orm = await MikroORM.init({
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: 'tp-dsw',
  type: 'mysql',
  clientUrl: 'mysql://root:root@localhost:3306/tp-dsw',
  highlighter: new SqlHighlighter(),
  debug: true,
  schemaGenerator: {
    //never use this in production
    disableForeignKeys: true,
    createForeignKeyConstraints: true,
    ignoreSchema: [],
  },
});
export const syncSchema = async () => {
  const generator = orm.getSchemaGenerator();
  /*
        await generator.dropSchema();
        await generator.createSchema();
        */
  await generator.updateSchema();
};
