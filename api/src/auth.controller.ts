import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Body() body: any) {
    const { email, password } = body;

    // 🔥 simple dulu (hardcode)
    if (email === 'admin@gmail.com' && password === '123456') {
      return { success: true };
    }

    return { success: false };
  }
}