import { Module } from '@nestjs/common';
import { UserModule } from './routes/user/user.module';
import { HeroModule } from './routes/hero/hero.module';

@Module({
  imports: [UserModule, HeroModule]
})
export class AppModule {}
