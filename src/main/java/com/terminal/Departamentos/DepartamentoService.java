package com.terminal.Departamentos;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.terminal.DatabaseConnection;

public class DepartamentoService {
    private DatabaseConnection dbConnection;

    public DepartamentoService(DatabaseConnection dbConnection) {
        this.dbConnection = dbConnection;
    }

    public List<Departamento> getAllDepartamentos() {
        List<Departamento> departamentos = new ArrayList<>();
        String query = "SELECT id_departamento AS id, Nombre FROM departamentos";

        try {
            ResultSet resultSet = dbConnection.executeQuery(query);

            while (resultSet != null && resultSet.next()) {
                int id = resultSet.getInt("id");
                String nombre = resultSet.getString("nombre");
                departamentos.add(new Departamento(id, nombre));
            }
            
        } catch (SQLException e) {
            System.err.println("Error fetching departamentos: " + e.getMessage());
        }

        return departamentos;
    }
}