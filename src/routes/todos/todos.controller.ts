import { 
  Controller, 
  Get, 
  UseFilters, 
  Response, 
  HttpStatus, 
  ForbiddenException, 
  HttpException, 
  NotFoundException, 
  Param, 
  Body, 
  Post, 
  Request, 
  Patch, 
  Delete 
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto} from './dto/createTodo.dto';
import { HttpExceptionFilter } from '../../exception/http-exception.filter';
import { 
  ApiTags,
  ApiResponse 
} from '@nestjs/swagger';



@ApiTags('todos')
@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @Get('findAll')
    public async findAll(@Response() res) {
      const todos = await this.todosService.findAll();
      return res.status(HttpStatus.OK).json(todos);
    }

    @Get('findById/:id')
    public async findById(@Response() res, @Param() param){
      const todos = await this.todosService.findById(param.id);
      return res.status(HttpStatus.OK).json(todos);
    }

    @Post('create')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.' }) // 可能出现的response类型
    @ApiResponse({ status: 403, description: 'Forbidden.' }) // 可能出现的response类型
    public async create(@Response() res, @Body() createTodoDTO: CreateTodoDto) {
      const todo = await this.todosService.create(createTodoDTO);
      return res.status(HttpStatus.OK).json(todo);
    }

    @Patch('update/:id')
    public async update(@Param() param, @Response() res, @Body() body) {
      const todo = await this.todosService.update(param.id, body);
      return res.status(HttpStatus.OK).json(todo);
    }

    @Delete('delete/:id')
    public async delete(@Param() param, @Response() res) {
      const todo = await this.todosService.delete(param.id);
      return res.status(HttpStatus.OK).json(todo);
    }
}


@ApiTags('excep')
@Controller('excep')
export class ExceptionController {
    constructor() {}

    // 异常过滤器
    @Post('newForbiddenException')
    @UseFilters(new HttpExceptionFilter())
    async create(@Body() createCatDto: CreateTodoDto) {
      throw new ForbiddenException();
    }

    @Get('httpExcepForbiddenStatus')
    getHello() {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    @Get('testNotFoundException')
    testNotFoundException() {
      throw new NotFoundException();
    }
}
