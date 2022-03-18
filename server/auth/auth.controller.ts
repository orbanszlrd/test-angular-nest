import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from 'server/google-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google/login')
  @UseGuards(GoogleAuthGuard)
  login() {
    // redirected to callback
  }

  @Get('/google/callback')
  @UseGuards(GoogleAuthGuard)
  callback(@Req() req: any, @Res() res: any) {
    res.cookie('access_token', req.user.accessToken);
    res.redirect('/');
  }

  @Get('/google/token')
  async getToken(@Req() req: any, @Res() res: any) {
    const data = await this.authService.getToken();

    res.cookie('access_token', data.access_token);
    res.redirect('/');
  }

  @Get('/logout')
  logout(@Req() req: any, @Res() res: any) {
    res.clearCookie('access_token');
    res.redirect('/');
  }
}
