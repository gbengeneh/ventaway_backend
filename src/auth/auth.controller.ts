import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from './guards/jwt.guard';
import { RefreshGuard } from './guards/refresh.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // --- JWT Auth Routes ---

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(RefreshGuard)
  @Post('refresh')
  refresh(@Req() req) {
    return this.authService.refreshTokens(req.user.sub, req.user.refreshToken);
  }

  @UseGuards(JwtGuard)
  @Post('logout')
  logout(@Req() req) {
    return this.authService.logout(req.user.sub);
  }

  // --- Google OAuth Routes ---

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Redirects to Google OAuth
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return this.authService.handleOAuthLogin(req.user);
  }

  // --- Apple OAuth Routes ---

  @Get('apple')
  @UseGuards(AuthGuard('apple'))
  async appleAuth() {
    // Redirects to Apple OAuth
  }

  @Get('apple/callback')
  @UseGuards(AuthGuard('apple'))
  async appleAuthRedirect(@Req() req) {
    return this.authService.handleOAuthLogin(req.user);
  }

  @Post('google/token')
googleTokenLogin(@Body() body: { access_token: string }) {
  return this.authService.validateGoogleToken(body.access_token);
}

@Post('apple/token')
appleTokenLogin(@Body() body: { id_token: string, name: string }) {
  return this.authService.validateAppleToken(body.id_token, body.name);
}

}
