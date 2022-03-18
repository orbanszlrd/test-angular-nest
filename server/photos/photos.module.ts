import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { GoogleStrategy } from 'server/google.strategy';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from 'server/auth/auth.service';

@Module({
  imports: [PassportModule, HttpModule],
  controllers: [PhotosController],
  providers: [GoogleStrategy, PhotosService, AuthService],
})
export class PhotosModule {}
