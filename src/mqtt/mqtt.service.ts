import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect, MqttClient } from 'mqtt';
import { LogsService } from '../logs/logs.service';
import { TelemetryGateway } from '../websocket/gateways/telemetry.gateway';

@Injectable()
export class MqttService implements OnModuleInit {
  private client: MqttClient;

  constructor(
    private readonly logsService: LogsService,
    private readonly telemetryGateway: TelemetryGateway, // ✅ WebSocket
  ) {}

  onModuleInit() {
    this.client = connect('mqtt://localhost:1883'); // MQTT broker adresi

    this.client.on('connect', () => {
      console.log('✅ MQTT bağlantısı başarılı!');
      this.client.subscribe('sensor/data', (err) => {
        if (!err) {
          console.log('📡 "sensor/data" konusuna abone olundu.');
        }
      });
    });

    this.client.on('message', async (topic, payload) => {
      const raw = payload.toString();
      console.log(`📥 MQTT mesajı alındı [${topic}]: ${raw}`);

      try {
        const data = JSON.parse(raw);
        const logMessage = `${data.sensor_id} - ${data.temperature}°C / ${data.humidity}%`;

        // Log kaydet
        await this.logsService.createLog(1, logMessage);

        // WebSocket ile yayınla
        this.telemetryGateway.broadcastSensorData(data);
      } catch (e) {
        console.warn('⚠️ JSON formatı bozuk, ham mesaj kaydedildi.');
        await this.logsService.createLog(1, `mqtt_message: ${raw}`);
      }
    });
  }
}
