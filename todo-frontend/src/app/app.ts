import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TodoListComponent } from './components/todo-list/todo-list';
import { TodoFormComponent } from "./components/todo-form/todo-form";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HttpClientModule,
    TodoListComponent
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todo-frontend');
}
