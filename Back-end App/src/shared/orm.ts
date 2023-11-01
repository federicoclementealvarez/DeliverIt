import { MikroORM } from '@mikro-orm/core'
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter'

export const orm = await MikroORM.init({
  entities: ['dist/**/*.entity.js', 'dist/**/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: 'deliver_it',
  type: 'mongo',
  clientUrl: 'mongodb://localhost:27017',
  highlighter: new MongoHighlighter(),
  debug: true
})