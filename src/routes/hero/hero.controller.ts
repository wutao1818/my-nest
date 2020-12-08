import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HeroService } from './hero.service';
import { ValidationPipe } from '../../pipe/validation.pipe';
import { HeroInfoDto, HeroCodeDto, PageSizeDto } from './hero.dto'; // 引入 DTO

const validationPipe = new ValidationPipe();



// 局部路由前缀
@ApiTags('hero')
@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @UsePipes(validationPipe) 
  @Get('getHero')
  getHero(@Query() query: HeroCodeDto) {
    return this.heroService.getHero(query.heroCode);
  }


  @UsePipes(validationPipe) 
  @Get('getHerosList')
  getHerosList(@Query() query: PageSizeDto) {
    const { pageNo, pageSize } = query;
    return this.heroService.getHerosList({ pageNo, pageSize });
  }


  @UsePipes(validationPipe) 
  @Post('addHero')
  addHero(@Body() body: HeroInfoDto) {
    const { heroName, heroJob } = body;
    return this.heroService.addHero({ heroName, heroJob });
  }


  @UsePipes(validationPipe) 
  @Post('updateHero')
  updateHero(@Body() body: HeroInfoDto) {
    const { heroName, heroJob, heroCode } = body;
    return this.heroService.updateHero({ heroName, heroJob, heroCode });
  }


  @UsePipes(validationPipe) 
  @Post('deleteHero')
  deleteHero(@Body() body: HeroCodeDto) {
    const { heroCode } = body;
    return this.heroService.deleteHero({ heroCode });
  }


}
