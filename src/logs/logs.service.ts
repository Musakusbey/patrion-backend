import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from './log.entity';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  // Log oluştur
  async createLog(userId: number, action: string) {
    const log = this.logRepository.create({ userId, action });
    return this.logRepository.save(log);
  }

  // Belirli kullanıcıya ait logları getir
  async findByUser(userId: number) {
    return this.logRepository.find({
      where: { userId },
      order: { timestamp: 'DESC' },
    });
  }

  // Tüm logları getir (admin için)
  async getAllLogs() {
    return this.logRepository.find({
      order: { id: 'DESC' },
    });
  }
}
