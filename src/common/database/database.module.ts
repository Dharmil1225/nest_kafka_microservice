import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DatabaseService } from './database.service';

const dbOptions = {
  name: process.env.DB_NAME,
  type: 'postgres' as any,
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export const connection = new DataSource({
  ...dbOptions,
  entities: [__dirname + '/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: true,
  logging: true,
  migrationsTableName: 'migrations',
});

export const databaseProvider = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return await connection.initialize();
    },
  },
  DatabaseService,
];

@Module({
  providers: databaseProvider,
  exports: databaseProvider,
})
export class DatabaseModule {}
