package com.terminal;

import java.sql.ResultSet;

public class App {
    public static void main(String[] args) {
        DatabaseConnection dbConnection = new DatabaseConnection();
        try {
            dbConnection.connect();

            // Example query execution
            String selectDepartamentos = "SELECT * FROM departamentos";
            ResultSet results = dbConnection.executeQuery(selectDepartamentos);

            
            
        } catch (Exception e) {
            System.err.println("Failed to connect to the database: " + e.getMessage());
        } finally {
            dbConnection.close();
        }
    }
}