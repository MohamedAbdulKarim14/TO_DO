import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './components/todolist/todolist.component';
import { ItmeComponent } from './components/todolist/itme/itme.component';
const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TodoListComponent },
  { path: 'newTask', component: ItmeComponent },
  { path: 'editTask/:id', component: ItmeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
