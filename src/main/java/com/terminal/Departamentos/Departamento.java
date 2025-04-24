package com.terminal.Departamentos;

public class Departamento {
    private int id_departamento;
    private String nombre;

    public Departamento(int id_departamento, String nombre) {
        this.id_departamento = id_departamento;
        this.nombre = nombre;
    }

    public int getId() {
        return id_departamento;
    }

    public void setId(int id) {
        this.id_departamento = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    @Override
    public String toString() {
        return "Departamento{id=" + id_departamento + ", nombre='" + nombre + "'}";
    }
}