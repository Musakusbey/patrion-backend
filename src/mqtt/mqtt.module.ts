import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { LogsModule } from '../logs/logs.module';
import { TelemetryGateway } from '../websocket/gateways/telemetry.gateway';

@Module({
  imports: [LogsModule],
  providers: [MqttService, TelemetryGateway], // ✅ gateway'i de ekle
})
export class MqttModule {}
