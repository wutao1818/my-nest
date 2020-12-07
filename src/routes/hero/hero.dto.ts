import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';



export class HeroCodeDto {
  @IsNotEmpty({ message: 'heroCode不能为空' })
  @ApiProperty({
    description: '英雄编号',
    default: '101',
  })
  readonly heroCode: string;
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


export class HeroInfoDto {
  @IsNotEmpty({ message: 'heroCode 不能为空' })
  @ApiProperty({
    required: true,
    description: '英雄编号',
    default: '101',
  })
  readonly heroCode: string | number;

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
