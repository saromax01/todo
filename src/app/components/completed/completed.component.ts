import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { TodosService } from 'src/app/service/todos.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss'],
})
export class CompletedComponent implements OnInit {
  completedTodos: Todo[] = [];
  loading: boolean = true;

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
      this.loadCompletedTodos();
    }, 2000);
  }

  loadCompletedTodos(): void {
    this.todosService.getCompletedTodos().then((completedTodos) => {
      this.completedTodos = completedTodos;
    });
  }

  removeCompletedTodo(todo: Todo): void {
    this.todosService.removeCompletedTodo(todo).then(() => {
      this.loadCompletedTodos();
    });
  }
}
