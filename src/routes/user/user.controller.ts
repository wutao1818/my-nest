import { 
  Body, 
  Controller, 
  Get, 
  Post, 
  Query
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

// 局部路由前缀
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('heroInfo')
  async heroInfo() {
    return this.userService.heroInfo();
  }

  @Post('heroList')
  async heroList(@Body() body: { pageNo: number, pageSize: number }) {
    const { pageNo, pageSize } = body;
    return this.userService.heroList({ pageNo, pageSize });
  }
}
