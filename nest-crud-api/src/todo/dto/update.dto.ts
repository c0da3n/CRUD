import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateDto {
  @ApiPropertyOptional({
    example: 'Nestjs 공부',
    description: '할 일 제목',
  })
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    example: 'CRUD 기능 구현',
    description: '할 일 설명',
  })
  @IsOptional()
  desc?: string;
}
