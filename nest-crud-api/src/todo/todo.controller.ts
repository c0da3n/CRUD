import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateTodoDto } from './dto/createTodo.dto';
import { UpdateTodoDto } from './dto/updateTodo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({
    summary: '할 일 생성',
    description: '새로운 할 일을 추가합니다.',
  })
  async createTodo(@Body() createTodoDto: CreateTodoDto) {
    return await this.todoService.createTodo(createTodoDto);
  }

  @Get()
  @ApiOperation({
    summary: '할 일 목록 조회',
    description: '모든 할 일을 조회합니다.',
  })
  async readTodo() {
    return await this.todoService.readTodo();
  }

  @Put(':todoId')
  @ApiOperation({
    summary: '할 일 수정',
    description: '특정 할 일을 업데이트합니다.',
  })
  async updateTodo(
    @Param('todoId') todoId: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return await this.todoService.updateTodo(todoId, updateTodoDto);
  }

  @Delete(':todoId')
  @ApiOperation({
    summary: '할 일 삭제',
    description: '특정 할 일 목록을 삭제합니다.',
  })
  async deleteTodo(@Param('todoId') todoId: string) {
    return await this.todoService.deleteTodo(todoId);
  }

  @Put('complete/:todoId')
  @ApiOperation({
    summary: '할 일 상태 변경',
    description: '특정 할 일 상태를 변경합니다.',
  })
  async completeTodo(@Param('todoId') todoId: string) {
    return await this.todoService.completeTodo(todoId);
  }
}
