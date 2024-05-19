import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'prerna',
  password: 'postgres@attentive',
  database: 'token_service_db',
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  synchronize: true,
};

export default typeOrmConfig;
