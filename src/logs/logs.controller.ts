import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LogsService } from './logs.service';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @UseGuards(JwtAuthGuard) // ✅ artık düzgün çalışacak
  @Get()
  async getLogs(@Request() req) {
    const user = req.user;
    if (user.role !== 'admin') {
      return { message: 'Yetkisiz erişim.' };
    }

    const data = await this.logsService.findByUser(user.userId);
    return {
      message: 'Tüm loglar başarıyla listelendi.',
      data,
    };
  }
}
