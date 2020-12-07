import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

// 局部路由前缀
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getUserInfo')
  getUserInfo() {
    return this.userService.getUserInfo();
  }

  @Post('getHeroList')
  getHeroList(@Body() body: { pageNo: number, pageSize: number }) {
    const { pageNo, pageSize } = body;
    return this.userService.getHeroList({ pageNo, pageSize });
  }
}
