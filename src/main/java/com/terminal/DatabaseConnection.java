package com.terminal;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class DatabaseConnection {
    private String url;
    private String user;
    private String password;
    private Connection connection;

    public DatabaseConnection(String url, String user, String password) {
        this.url = url;
        this.user = user;
        this.password = password;
    }

    public DatabaseConnection() {
        this.url = "jdbc:mysql://localhost:3306/terminal";
        this.user = "root";
        this.password = "";
    }

    public void connect() {
        try {
            connection = DriverManager.getConnection(url, user, password);
            System.out.println("Connection to the database established successfully.");
        } catch (SQLException e) {
            System.out.println("Connection to the database failed: " + e.getMessage());
        }
    }

    public void close() {
        if (connection != null) {
            try {
                connection.close();
                System.out.println("Connection to the database closed successfully.");
            } catch (SQLException e) {
                System.out.println("Failed to close the connection: " + e.getMessage());
            }
        }
    }

    public ResultSet executeQuery(String query) {
        try {
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(query);
            System.out.println("Query executed successfully.");
            
            return resultSet;
        } catch (SQLException e) {
            System.out.println("Query execution failed: " + e.getMessage());
            return null;
        }
    }
}