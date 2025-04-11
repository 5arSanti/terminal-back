package com.terminal;

import com.terminal.Departamentos.DepartamentoService;

public class App {
    public static void main(String[] args) {
        DatabaseConnection dbConnection = new DatabaseConnection();

        DepartamentoService departamentoService = new DepartamentoService(dbConnection);

        try {
            dbConnection.connect();

            departamentoService.getAllDepartamentos().forEach(departamento -> {
                System.out.println("ID: " + departamento.getId() + ", Nombre: " + departamento.getNombre());
            });


            
        } catch (Exception e) {
            System.err.println("Failed to connect to the database: " + e.getMessage());
        } finally {
            dbConnection.close();
        }
    }
}