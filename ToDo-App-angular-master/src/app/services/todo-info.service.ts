import { computed, inject, Injectable, signal } from '@angular/core';
import { IData } from '../models/data';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoInfo {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/tasks';
  tasks = signal<IData[]>([]);
  searchWord = signal<string>('');
  task!: IData;

  getTasks() {
    return this.http.get<IData[]>(this.apiUrl).subscribe((data) => {
      this.tasks.set(data);
    });
  }

addTask(newTask: IData) {
  this.http.post<IData>(this.apiUrl, newTask)
    .pipe(
      tap((taskFromServer) => {
        this.tasks.update((pre) => [...pre, taskFromServer]);
      })
    )
    .subscribe(); 
}
  deleteTask(id: string) {
    const previousTasks = this.tasks();
    this.tasks.update((prev) => prev.filter((task) => task.id !== id));

    return this.http.delete<any>(`${this.apiUrl}/${id}`).subscribe({
      error: () => {
        this.tasks.set(previousTasks);
      },
    });
  }

  getTaskById(id: string) {
    return this.http.get<IData>(`${this.apiUrl}/${id}`);
  }

  updateTask(id: string, task: IData) {
    let previousTasks = this.tasks();

    this.tasks().filter((task) => task.id !== id);
    this.tasks.update((prev) => [...prev, task]);

    this.http.put(`${this.apiUrl}/${id}`, task).subscribe({
      error: () => {
        this.tasks.set([...previousTasks]);
      },
    });
  }

  filteredTasks = computed(() => {
    const value = this.searchWord().toLocaleLowerCase();
    if (!value) {
      return this.tasks();
    }
    return this.tasks().filter((task) => task.title.toLowerCase().includes(value));
  });

  inputSearch(value: string) {
    this.searchWord.set(value)
  }
}
