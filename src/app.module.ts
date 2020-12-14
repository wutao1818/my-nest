import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HeroModule } from './routes/hero/hero.module';
import { TodosModule } from './routes/todos/todos.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'), 
    HeroModule, 
    TodosModule
  ]
})
export class AppModule {}
