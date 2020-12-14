import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';



export class HeroNameDto {
  @IsNotEmpty({ message: 'heroName不能为空' })
  @ApiProperty({
    description: '英雄名字',
    default: '',
  })
  readonly heroName: string;
}

export class HeroCodeDto {
  @IsNotEmpty({ message: 'heroCode不能为空' })
  @ApiProperty({
    description: '英雄编号',
    default: '101',
  })
  readonly id: string;
}

export class HeroInfoDto {
  @ApiProperty({
    description: '英雄名字',
    default: '韩信',
  })
  readonly heroName: string;

  @ApiProperty({
    description: '英雄职业',
    default: '刺客',
  })
  readonly heroJob: string;
}



export class PageSizeDto {
  @ApiProperty({
    description: 'pageNo',
    default: 1,
  })
  readonly pageNo: number;
  
  @ApiProperty({
    description: 'pageSize',
    default: 10,
  })
  readonly pageSize: number;

}

export class QueryDto {
  @IsNotEmpty({ message: 'jobType 不能为空' })
  @ApiProperty({
    required: true,
    description: '职业类型',
    default: '0',
  })
  readonly jobType: string;
}


