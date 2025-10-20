package com.example.service;

import com.example.entity.Todo;
import com.example.repository.TodoRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class TodoService {

    @Inject
    TodoRepository todoRepository;

    public List<Todo> getAllTodos() {
        return todoRepository.listAll();
    }

    public Optional<Todo> getTodoById(Long id) {
        return todoRepository.findByIdOptional(id);
    }

    @Transactional
    public Todo createTodo(Todo todo) {
        todoRepository.persist(todo);
        return todo;
    }

    @Transactional
    public Todo updateTodo(Long id, Todo todoUpdated) {
        Optional<Todo> existingTodo = todoRepository.findByIdOptional(id);
        if (existingTodo.isPresent()) {
            Todo todo = existingTodo.get();
            if (todoUpdated.getTitolo() != null) {
                todo.setTitolo(todoUpdated.getTitolo());
            }
            if (todoUpdated.getDescrizione() != null) {
                todo.setDescrizione(todoUpdated.getDescrizione());
            }
            if (todoUpdated.getCompletato() != null) {
                todo.setCompletato(todoUpdated.getCompletato());
            }
            todoRepository.persist(todo);
            return todo;
        }
        return null;
    }

    @Transactional
    public boolean deleteTodo(Long id) {
        return todoRepository.deleteById(id);
    }
}