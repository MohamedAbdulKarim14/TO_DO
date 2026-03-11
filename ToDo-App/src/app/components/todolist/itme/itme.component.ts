import { Component, inject, Input, OnInit } from '@angular/core';
import { TodoInfo } from '../../../services/todo-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-itme',
  standalone: false,
  templateUrl: './itme.component.html',
  styleUrl: './itme.component.css',
})
export class ItmeComponent implements OnInit {
  private formData = inject(FormBuilder);
  private todoService = inject(TodoInfo);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  id: string | null = null;

  taskForm: FormGroup = this.formData.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.todoService.getTaskById(this.id).subscribe({
        next: (data) => {
          this.taskForm.patchValue(data);
        },
      });
    }
  }

addTask() {
  if (this.taskForm.valid) {
  }
  const newTask = {
    id: crypto.randomUUID(),
    title: this.taskForm.value.title,
    description: this.taskForm.value.description,
    date: new Date(),
  };

  this.todoService.addTask(newTask); // <--- هنا مفيش subscribe لأن الخدمة عملت subscribe جوه نفسها

  this.router.navigate(['tasks']);
}
  updateTask() {
    if (!this.id) return;
    const newTask = {
      id: this.id,
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      date: new Date(),
    };
    this.todoService.updateTask(this.id, newTask);
    this.router.navigate(['tasks']);
  }
}
