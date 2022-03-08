import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { GoogleStrategy } from 'server/google.strategy';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PassportModule, HttpModule],
  controllers: [PhotosController],
  providers: [PhotosService, GoogleStrategy],
})
export class PhotosModule {}
