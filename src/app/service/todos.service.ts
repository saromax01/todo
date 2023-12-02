import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private todos: Todo[] = [];
  private completedTodos: Todo[] = [];

  constructor() {}

  getAllTodos(): Promise<Todo[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.todos);
      }, 2000);
    });
  }

  getCompletedTodos(): Promise<Todo[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.completedTodos);
      }, 2000);
    });
  }

  addTodo(newTodo: Todo): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.todos.push(newTodo);
        resolve();
      }, 2000);
    });
  }

  removeTodo(todoId: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.todos = this.todos.filter((todo) => todo.id !== todoId);
        resolve();
      }, 2000);
    });
  }

  updateTodo(updatedTodo: Todo): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.todos = this.todos.map((todo) =>
          todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
        );
        resolve();
      }, 2000);
    });
  }
  moveTodoToCompleted(todo: Todo): Promise<void> {
    return new Promise((resolve) => {
      this.todos = this.todos.filter((t) => t.id !== todo.id);

      this.completedTodos.push(todo);

      resolve();
    });
  }
  removeCompletedTodo(todo: Todo): Promise<void> {
    this.completedTodos = this.completedTodos.filter((t) => t.id !== todo.id);
    return Promise.resolve();
  }
}
