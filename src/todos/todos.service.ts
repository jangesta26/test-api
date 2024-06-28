import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(dto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoRepository.create(dto);
    return await this.todoRepository.save(todo);
  }

  async findMany(): Promise<any[]> {
    const todos = await this.todoRepository.find();

    // Format date in each todo object
    const formattedTodos = todos.map(todo => ({
      id: todo.id,
      title: todo.title,
      date: todo.date.toLocaleString(), // Format date as a string
    }));

    return formattedTodos;
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async update(id: number, updateTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    Object.assign(todo, updateTodoDto);
    return await this.todoRepository.save(todo);
  }

  async delete(id: number): Promise<void> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    await this.todoRepository.remove(todo);
  }
}
