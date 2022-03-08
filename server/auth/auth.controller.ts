import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from 'server/google-auth.guard';

@Controller('auth')
export class AuthController {
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

  @Get('/logout')
  logout(@Req() req: any, @Res() res: any) {
    res.clearCookie('access_token');
    res.redirect('/');
  }
}
