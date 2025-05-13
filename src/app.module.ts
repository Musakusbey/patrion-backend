import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { AuthModule } from './websocket/auth.module';
import { ProfileController } from './profile.controller';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { LogsModule } from './logs/logs.module';
import { MqttModule } from './mqtt/mqtt.module';
import { TelemetryGateway } from './websocket/gateways/telemetry.gateway'; // ✅ EKLENDİ

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '1234',
      database: process.env.DB_NAME || 'patrion',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    LogsModule,
    MqttModule,
  ],
  controllers: [ProfileController],
  providers: [TelemetryGateway], // ✅ EKLENDİ
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
