import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HeroModule } from './routes/hero/hero.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'), 
    HeroModule
  ]
})
export class AppModule {}
