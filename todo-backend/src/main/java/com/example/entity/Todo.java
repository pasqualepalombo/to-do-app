package com.example.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "todos")
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titolo;

    private String descrizione;

    @Column(nullable = false)
    private Boolean completato = false;

    @Column(nullable = false)
    private LocalDateTime dataCreazione = LocalDateTime.now();

    // Costruttori
    public Todo() {}

    public Todo(String titolo, String descrizione) {
        this.titolo = titolo;
        this.descrizione = descrizione;
    }

    // Getter e Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitolo() {
        return titolo;
    }

    public void setTitolo(String titolo) {
        this.titolo = titolo;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public Boolean getCompletato() {
        return completato;
    }

    public void setCompletato(Boolean completato) {
        this.completato = completato;
    }

    public LocalDateTime getDataCreazione() {
        return dataCreazione;
    }

    public void setDataCreazione(LocalDateTime dataCreazione) {
        this.dataCreazione = dataCreazione;
    }
}