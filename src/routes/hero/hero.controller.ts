import { Body, Controller, Get, Post, Patch, Delete, Query, Param, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HeroService } from './hero.service';
import { ValidationPipe } from '../../pipe/validation.pipe';
import { HeroInfoDto, HeroCodeDto, HeroNameDto, PageSizeDto, QueryDto } from './dto/hero.dto'; // 引入 DTO

const validationPipe = new ValidationPipe();


// 局部路由前缀
@ApiTags('heros 王者荣耀英雄相关接口')
@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @UsePipes(validationPipe) 
  @Get('info/:id')
  @ApiOperation({ summary: '根据heroCode查询人物' })
  getHero(@Param() param: HeroCodeDto) {
    return this.heroService.getHero(param.id);
  }


  @Get('info')
  @ApiOperation({ summary: '根据输入的姓名查询英雄' })
  queryHeroByName(@Query() query: HeroNameDto) {
    return this.heroService.queryHeroByName(query.heroName);
  }


  @UsePipes(validationPipe) 
  @Get('list')
  @ApiOperation({ summary: '查询所有人物列表' })
  queryHerosList(@Query() query: PageSizeDto) {
    const { pageNo, pageSize } = query;
    return this.heroService.queryHerosList({ pageNo, pageSize });
  }


  @UsePipes(validationPipe) 
  @Get('listbytype/:jobType')
  @ApiOperation({ summary: '根据职业查询列表' })
  queryHeroByJobtype(@Param() param: QueryDto) {
    return this.heroService.queryHeroByJobtype( param.jobType );
  }


  @UsePipes(validationPipe) 
  @Post('create')
  @ApiOperation({ summary: '新增一个新人物' })
  addHero(@Body() body: HeroInfoDto) {
    const { heroName, heroJob } = body;
    return this.heroService.addHero({ heroName, heroJob });
  }


  @UsePipes(validationPipe) 
  @Patch('update/:id')
  @ApiOperation({ summary: '修改人物数据' })
  updateHero(@Param() param: HeroCodeDto, @Body() body: HeroInfoDto) {
    const { heroName, heroJob } = body;
    return this.heroService.updateHero({ heroName, heroJob, heroCode: param.id });
  }


  @UsePipes(validationPipe) 
  @Delete('delete/:id')
  @ApiOperation({ summary: '根据heroCode删除人物' })
  deleteHero(@Param() param: HeroCodeDto) {
    return this.heroService.deleteHero(param.id);
  }


}
