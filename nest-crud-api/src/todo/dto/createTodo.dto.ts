import { ApiProperty, PickType } from '@nestjs/swagger';
import { Todo } from '../entities/todo.entities';
import { IsString } from 'class-validator';

export class CreateTodoDto extends PickType(Todo, ['title', 'desc'] as const) {
  @ApiProperty({
    example: 'NestJS 공부하기',
    description: '할 일 제목 ',
  })
  @IsString()
  title!: string;

  @ApiProperty({
    example: 'CRUD 공부',
    description: '할 일 설명',
  })
  @IsString()
  desc!: string;
}
