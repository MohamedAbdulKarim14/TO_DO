import { Component, inject, signal } from '@angular/core';
import { TodoInfo } from './services/todo-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class App {
  protected readonly title = signal('ToDo');
  todoService = inject(TodoInfo);
}
