import { Component, inject, OnInit } from '@angular/core';
import { TodoInfo } from '../../services/todo-info.service';

@Component({
  selector: 'app-todoList',
  standalone: false,
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css',
  host: {
    class: 'vh-100 d-flex flex-column',
  },
})
export class TodoListComponent implements OnInit {
  todoService = inject(TodoInfo);

  tasks = this.todoService.filteredTasks;

  ngOnInit(): void {
    this.todoService.getTasks();
  }
}
