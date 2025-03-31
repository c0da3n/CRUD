import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TodoDto {
  @ApiProperty({
    example: 'Eat',
    description: '투두리스트 제목',
  })
  @IsString()
  title!: string;

  @ApiProperty({
    example: 'Get Energy',
    description: '투두리스트 설명',
  })
  @IsString()
  desc!: string;
}
