package com.example.resource;

import com.example.entity.Todo;
import com.example.service.TodoService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import java.util.Optional;

@Path("/api/todos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TodoResource {

    @Inject
    TodoService todoService;

    // GET all todos
    @GET
    public Response getAllTodos() {
        List<Todo> todos = todoService.getAllTodos();
        return Response.ok(todos).build();
    }

    // GET todo by id
    @GET
    @Path("/{id}")
    public Response getTodoById(@PathParam("id") Long id) {
        Optional<Todo> todo = todoService.getTodoById(id);
        if (todo.isPresent()) {
            return Response.ok(todo.get()).build();
        }
        return Response.status(Response.Status.NOT_FOUND)
                .entity("Todo non trovato")
                .build();
    }

    // POST create new todo
    @POST
    public Response createTodo(Todo todo) {
        Todo created = todoService.createTodo(todo);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    // PUT update todo
    @PUT
    @Path("/{id}")
    public Response updateTodo(@PathParam("id") Long id, Todo todoUpdated) {
        Todo updated = todoService.updateTodo(id, todoUpdated);
        if (updated != null) {
            return Response.ok(updated).build();
        }
        return Response.status(Response.Status.NOT_FOUND)
                .entity("Todo non trovato")
                .build();
    }

    // DELETE todo
    @DELETE
    @Path("/{id}")
    public Response deleteTodo(@PathParam("id") Long id) {
        boolean deleted = todoService.deleteTodo(id);
        if (deleted) {
            return Response.noContent().build();
        }
        return Response.status(Response.Status.NOT_FOUND)
                .entity("Todo non trovato")
                .build();
    }
}