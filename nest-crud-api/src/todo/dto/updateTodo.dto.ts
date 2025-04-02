import { ApiPropertyOptional, PartialType, PickType } from '@nestjs/swagger';
import { Todo } from '../entities/todo.entities';
import { IsOptional } from 'class-validator';

export class UpdateTodoDto extends PartialType(
  PickType(Todo, ['title', 'desc'] as const),
) {
  @ApiPropertyOptional({
    example: 'Express 공부하기',
    description: '할 일 제목 수정',
  })
  @IsOptional()
  title: string;

  @ApiPropertyOptional({
    example: 'Middleware 공부',
    description: '할 일 설명 수정',
  })
  @IsOptional()
  desc: string;
}
