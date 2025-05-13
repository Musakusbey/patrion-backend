import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    // Preflight OPTIONS isteğini otomatik olarak geçir
    if (req.method === 'OPTIONS') return true;

    // 🔐 localStorage’dan gelen fake kullanıcıyı req.user olarak ayarla
    const auth = req.headers.authorization;
    if (auth?.startsWith('Bearer ')) {
      try {
        req.user = JSON.parse(auth.split(' ')[1]);
      } catch (e) {
        console.warn('❌ Token parse edilemedi.');
      }
    }

    return true; // geçici olarak izin ver
  }
}
