# My Java JDBC Project

This project is a simple Java application that demonstrates how to connect to a database using JDBC. It is built using Maven and follows a standard project structure.

## Project Structure

```
my-java-jdbc-project
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── example
│   │   │           ├── App.java
│   │   │           └── DatabaseConnection.java
│   │   └── resources
│   │       └── application.properties
│   └── test
│       └── java
│           └── com
│               └── example
│                   └── AppTest.java
├── pom.xml
└── README.md
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd terminal-back
   ```

2. **Build the project:**
   Use Maven to build the project:
   ```
   mvn clean install
   ```

3. **Run the application:**
   You can run the application using the following command:
   ```
   mvn exec:java -Dexec.mainClass="com.terminal.App"
   ```

## Usage

The application connects to the specified database and can execute SQL queries. You can modify the `DatabaseConnection.java` file to add your own SQL queries and logic.

## Testing

Unit tests for the application are located in the `src/test/java/com/example/AppTest.java` file. You can run the tests using:
```
mvn test
```

## Dependencies

This project uses Maven for dependency management. The required dependencies are specified in the `pom.xml` file. Make sure to check this file for any additional libraries you may need.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.