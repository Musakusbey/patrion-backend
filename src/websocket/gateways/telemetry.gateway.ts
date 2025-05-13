import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { LogsService } from '../../logs/logs.service';

@WebSocketGateway(4000, {
  cors: {
    origin: '*',
  },
})
export class TelemetryGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly logsService: LogsService) {}

  broadcastSensorData(data: any) {
    this.server.emit('sensor_data', data);
  }

  @SubscribeMessage('sensor_data') // ✅ Frontend'ten geleni dinle
  async handleSensorData(@MessageBody() data: any) {
    const logMessage = `${data.sensor_id} - ${data.temperature}°C / ${data.humidity}%`;

    // DB’ye kaydet
    await this.logsService.createLog(1, logMessage);

    // Tüm frontend’lere yayınla
    this.broadcastSensorData(data);
  }
}
