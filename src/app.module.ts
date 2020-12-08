import { Module } from '@nestjs/common';
import { UserModule } from './routes/user/user.module';
import { HeroModule } from './routes/hero/hero.module';
import { TodosModule } from './routes/todos/todos.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'), 
    UserModule, 
    HeroModule, 
    TodosModule
  ]
})
export class AppModule {}
