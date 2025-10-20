import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService, Todo } from '../../services/todo';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
//import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './todo-form.html',
  styleUrls: ['./todo-form.css']
})
export class TodoFormComponent {
  @Output() todoCreated = new EventEmitter<Todo>();

  titolo: string = '';
  descrizione: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private todoService: TodoService) { }

  submitForm(): void {
    if (!this.titolo.trim()) {
      this.errorMessage = 'Il titolo è obbligatorio!';
      return;
    }

    this.errorMessage = '';
    this.loading = true;

    const newTodo: Todo = {
      titolo: this.titolo,
      descrizione: this.descrizione,
      completato: false
    };

    this.todoService.createTodo(newTodo).subscribe({
      next: (todo) => {
        this.todoCreated.emit(todo);
        this.titolo = '';
        this.descrizione = '';
        this.loading = false;
      },
      error: (err) => {
        console.error('Errore nella creazione del todo:', err);
        this.errorMessage = 'Errore nella creazione del todo';
        this.loading = false;
      }
    });
  }
}