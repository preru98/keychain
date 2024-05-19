import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenService } from './services/token.service';
import { AccessKey } from 'src/access-key/entities/access-key.entity';
import { RedisModule } from 'src/redis/redis.module';
import { TokenController } from './controllers/token.controller';
import { Token } from './entities/token.entity';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { LoginController } from './controllers/login.controller';
import { LoginService } from './services/login.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccessKey]), TypeOrmModule.forFeature([Token]), RedisModule],
  providers: [AuthMiddleware, TokenService, LoginService],
  controllers: [TokenController, LoginController],
  exports: [],
})

export class TokenModule {
  configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(AuthMiddleware)
          .forRoutes(TokenController);
      }
}







// import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import { AuthMiddleware } from './auth.middleware';
// import { ProtectedController } from './protected.controller';

// @Module({
//   imports: [ConfigModule.forRoot()],
//   controllers: [ProtectedController],
//   providers: [AuthMiddleware],
// })
// export class AppModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthMiddleware)
//       .forRoutes(ProtectedController); // Apply to all routes in ProtectedController
//   }
// }
