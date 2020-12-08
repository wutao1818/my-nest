import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosController, ExceptionController } from './todos.controller';
import { TodosService } from './todos.service';
import { TodoSchema } from './schemas/todo.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }])],
  controllers: [TodosController, ExceptionController],
  providers: [TodosService],
})
export class TodosModule {}
