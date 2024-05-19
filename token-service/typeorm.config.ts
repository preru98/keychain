import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'process'

const POSTGRES_HOST = process.env.POSTGRES_HOST ? process.env.POSTGRES_HOST : 'localhost';
const POSTGRES_USER = process.env.POSTGRES_USER ? process.env.POSTGRES_USER : 'prerna';
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD ? process.env.POSTGRES_PASSWORD : 'postgres-password';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: 'token_service_db',
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  synchronize: true,
};

export default typeOrmConfig;
