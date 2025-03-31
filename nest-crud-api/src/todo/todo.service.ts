import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entities';
import { TodoDto } from './dto/todo.dto';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async createTodo(todoDto: TodoDto) {
    return await this.todoRepository.save(todoDto);
  }

  async readTodo() {
    return await this.todoRepository.find();
  }

  async updateTodo(todoId: string, updateDto: UpdateDto) {
    const todo = await this.todoRepository.findOne({
      where: { id: todoId },
    });

    if (!todo) {
      throw new Error('Todo not found');
    }

    if (!updateDto.title && !updateDto.desc) {
      throw new HttpException(
        '최소 하나의 값이 필요합니다',
        HttpStatus.FORBIDDEN,
      );
    }

    todo.title = updateDto.title ?? todo.title;
    todo.desc = updateDto.desc ?? todo.desc;

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
