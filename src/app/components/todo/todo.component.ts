import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { TodosService } from 'src/app/service/todos.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTodoText: string = '';
  loading: boolean = true;

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
      this.loadTodos();
    }, 2000);
  }

  loadTodos(): void {
    this.todosService.getAllTodos().then((todos) => {
      this.todos = todos;
    });
  }

  addTodo(): void {
    if (this.newTodoText.trim() !== '') {
      const newTodo: Todo = {
        id: this.generateUniqueId(),
        completed: false,
        title: this.newTodoText,
      };

      this.todosService.addTodo(newTodo).then(() => {
        this.loadTodos();
        this.newTodoText = '';
      });
    }
  }
  loadCompletedTodos(): void {
    this.todosService.getCompletedTodos().then((completedTodos) => {
      this.todos = completedTodos;
    });
  }
  markAsCompleted(todo: Todo): void {
    todo.completed = true;
    this.todosService.moveTodoToCompleted(todo).then(() => {
      this.todos = this.todos.filter((t) => t.id !== todo.id);
    });
  }
  private generateUniqueId(): number {
    return new Date().getTime();
  }
}
