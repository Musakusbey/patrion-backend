import {
  Controller,
  Get,
  Request,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LogsService } from './logs/logs.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly logsService: LogsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Request() req) {
    await this.logsService.createLog(req.user.userId, 'viewed_profile');
    return {
      message: 'Giriş yapan kullanıcı bilgisi:',
      user: req.user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin-only')
  async getAdminData(@Request() req) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Sadece admin erişebilir.');
    }

    await this.logsService.createLog(req.user.userId, 'viewed_admin_panel');
    return {
      message: 'Admin paneline hoş geldin.',
      user: req.user,
    };
  }
}
