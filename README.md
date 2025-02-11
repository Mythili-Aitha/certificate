##Certification management System - Backend:
This is the backend for the Certification Management System, built using Spring Boot, Spring Data JPA, IntelliJ IDEA, POSTMAN and MySQL.

Features:
1. REST API for certificates and documents.
2. Upload and retrieve certification-related documents.
3. Track expiration status of certificates.
4. Search and filter by certification name.
5. Delete with confirmation.

Installation & Set Up:
1. Clone the Repository
git clone https://github.com/your-username/certification-backend.git
cd certification-backend

2. Configure Database(My SQL):
- Create new Database certification_db
-Update applications.properties:
            spring.datasource.url=jdbc:mysql://localhost:3306/certification_db
            spring.datasource.username=root
            spring.datasource.password=root
            spring.jpa.hibernate.ddl-auto=update
            spring.jpa.show-sql=true 
- Start and Run the IntelliJ IDEA and check for Hibernate port - Tomcat

Dependencies in SpringBoot:
Lombok - Java Annotations Library
Spring Web  - Build web, including RESTful, applications using Spring MVC
Spring Data JPA - Persist data in SQL stores with Java Persistence API using Spring Data and Hibernate.
MySQL Driver - MySQL JDBC driver.

Built With:
Spring Boot - Backend framework
Spring Data JPA - Database handling
MySQL - Database
Maven - Dependency management
Lombok - Reducing boilerplate code
