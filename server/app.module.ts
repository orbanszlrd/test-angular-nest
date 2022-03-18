import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { AppServerModule } from '../src/main.server';
import { PhotosModule } from './photos/photos.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/test-angular-nest/browser'),
    }),
    ConfigModule.forRoot(),
    PhotosModule,
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
