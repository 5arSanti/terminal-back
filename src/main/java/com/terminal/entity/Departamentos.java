package com.terminal.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "departamentos")
public class Departamentos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String nombre;

    // Getters y Setters
}