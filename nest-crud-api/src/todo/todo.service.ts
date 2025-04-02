import { UpdateTodoDto } from './dto/updateTodo.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entities';
import { CreateTodoDto } from './dto/createTodo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async createTodo(createTodoDto: CreateTodoDto) {
    return await this.todoRepository.save(createTodoDto);
  }

  async readTodo() {
    return await this.todoRepository.find();
  }

  async updateTodo(todoId: string, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoRepository.findOne({
      where: { id: todoId },
    });

    if (!todo) {
      throw new Error('Todo not found');
    }

    if (!updateTodoDto.title && !updateTodoDto.desc) {
      throw new HttpException(
        '최소 하나의 값이 필요합니다',
        HttpStatus.FORBIDDEN,
      );
    }

    todo.title = updateTodoDto.title ?? todo.title;
    todo.desc = updateTodoDto.desc ?? todo.desc;

    return await this.todoRepository.save(todo);
  }

  async deleteTodo(todoId: string) {
    return await this.todoRepository.delete(todoId);
  }

  async completeTodo(todoId: string) {
    const todo = await this.todoRepository.findOne({ where: { id: todoId } });
    if (!todo) {
      throw new Error('Todo not found!');
    }
    todo.isDone = !todo.isDone;
    return await this.todoRepository.save(todo);
  }
}
