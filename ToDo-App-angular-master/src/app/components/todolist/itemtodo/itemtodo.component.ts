import { Component, inject, Input, OnInit } from '@angular/core';
import { IData } from '../../../models/data';
import { TodoInfo } from '../../../services/todo-info.service';

@Component({
  selector: 'app-itemtodo',
  standalone: false,
  templateUrl: './itemtodo.component.html',
  styleUrl: './itemtodo.component.css',
})
export class ItemtodoComponent {
  todoService = inject(TodoInfo);
  @Input() task!: IData;

  deleteTask(id: string) {
    this.todoService.deleteTask(id)
  }
}
