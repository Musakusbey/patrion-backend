import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './log.entity';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller'; // ✅ eklendi

@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  providers: [LogsService],
  controllers: [LogsController], // ✅ eklendi
  exports: [LogsService],
})
export class LogsModule {}
