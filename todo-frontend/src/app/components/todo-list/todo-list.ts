import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService, Todo } from '../../services/todo';
import { TodoFormComponent } from '../todo-form/todo-form';
import { Chart } from "../chart/chart";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoFormComponent, Chart],
  templateUrl: './todo-list.html',
  styleUrls: ['./todo-list.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  loading: boolean = false;
  filter: 'all' | 'completati' | 'non-completati' = 'all';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.loading = true;
    this.todoService.getAllTodos().subscribe({
      next: (data) => {
        this.todos = data;
        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        console.error('Errore nel caricamento dei todo:', err);
        this.loading = false;
      }
    });
  }

  applyFilter(): void {
    if (this.filter === 'completati') {
      this.filteredTodos = this.todos.filter(t => t.completato);
    } else if (this.filter === 'non-completati') {
      this.filteredTodos = this.todos.filter(t => !t.completato);
    } else {
      this.filteredTodos = this.todos;
    }
  }

  setFilter(filterType: 'all' | 'completati' | 'non-completati'): void {
    this.filter = filterType;
    this.applyFilter();
  }

  toggleCompletato(todo: Todo): void {
    if (todo.id) {
      const updated = { ...todo, completato: !todo.completato };
      this.todoService.updateTodo(todo.id, updated).subscribe({
        next: () => {
          todo.completato = !todo.completato;
          this.applyFilter();
        },
        error: (err) => console.error('Errore nell\'aggiornamento:', err)
      });
    }
  }

  deleteTodo(id: number | undefined): void {
    if (id && confirm('Sei sicuro di voler eliminare questo todo?')) {
      this.todoService.deleteTodo(id).subscribe({
        next: () => {
          this.todos = this.todos.filter(t => t.id !== id);
          this.applyFilter();
        },
        error: (err) => console.error('Errore nell\'eliminazione:', err)
      });
    }
  }

  onTodoCreated(todo: Todo): void {
    this.todos.push(todo);
    this.applyFilter();
  }
}