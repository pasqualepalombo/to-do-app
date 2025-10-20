package com.example.repository;

import com.example.entity.Todo;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class TodoRepository implements PanacheRepository<Todo> {
}