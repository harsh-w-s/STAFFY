# Staffy

A full-stack employee and task management platform built with Spring Boot and React, designed to streamline employee operations, task assignment, and workflow management within organizations.

## Overview

Staffy enables administrators and managers to manage employees, assign tasks, track progress, and monitor workflow execution through a secure role-based system.

The application implements enterprise-style architecture with JWT authentication, role-based access control, REST APIs, and a modern dashboard interface.

---

## Features

### Authentication & Security

* JWT-based Authentication
* Spring Security Integration
* Protected API Endpoints
* Role-Based Access Control (RBAC)

### User Management

* Create Employees
* View Employee Directory
* Role Management
* Secure User Access

### Task Management

* Create Tasks
* Assign Tasks to Employees
* View Assigned Tasks
* Task Details Page
* Task Workflow Tracking
* Pagination Support

### Workflow Management

Task lifecycle management with controlled status transitions:

OPEN → IN_PROGRESS → IN_REVIEW → RESOLVED → DONE → CLOSED

### Dashboard

* Responsive Dashboard Layout
* Collapsible Sidebar
* Navigation Bar
* Role-Specific Navigation

---

## Roles

### ADMIN

* Manage all users
* View all tasks
* Create tasks
* Monitor organization-wide activity

### MANAGER

* Create and assign tasks
* View tasks created by them
* Track employee progress

### EMPLOYEE

* View assigned tasks
* Update task workflow status
* Track task progress

---

## Technology Stack

### Backend

* Java
* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate
* Maven

### Frontend

* React
* React Router
* Axios
* Tailwind CSS
* Vite

### Database

* MySQL (Current)
* PostgreSQL (Planned Deployment)

### Version Control

* Git
* GitHub

---

## Project Structure

```text
STAFFY
├── staffy-backend
│   ├── controllers
│   ├── services
│   ├── repositories
│   ├── entities
│   ├── security
│   └── configuration
│
└── staffy-frontend
    ├── pages
    ├── components
    ├── services
    ├── context
    └── layouts
```

## REST API Highlights

### Authentication

```http
POST /users/login
GET /users/me
```

### User Management

```http
GET /users
POST /users
```

### Task Management

```http
GET /tasks
GET /tasks/my-tasks
GET /tasks/{id}
POST /tasks
PATCH /tasks/{id}/status
```

---

## Screenshots

### Login Page

<img width="1920" height="1080" alt="login_page" src="https://github.com/user-attachments/assets/9d75948e-7beb-48f3-86a7-a0608985d48f" />


### Dashboard

<img width="1920" height="1080" alt="DashBoard" src="https://github.com/user-attachments/assets/5cb2d8f9-0224-4759-bf01-c29845bdc925" />


### Task Management

<img width="1920" height="1080" alt="Task_Table_Page" src="https://github.com/user-attachments/assets/c4868f2a-1b67-4889-9d34-11ce379711e0" />


### Task Details

<img width="1920" height="1080" alt="Task_Details_Page" src="https://github.com/user-attachments/assets/389cae9a-f9c0-41c2-942b-e633fdcbe50b" />


### About User

<img width="1920" height="1080" alt="User_Profile_Page" src="https://github.com/user-attachments/assets/3ca05738-2159-4834-b839-6e84ba1a3145" />


---

## Future Enhancements

* Task Comments System
* Activity Timeline
* Search & Filtering
* Dashboard Analytics
* Email Notifications
* Docker Support
* CI/CD Pipeline
* Audit Logging
* File Attachments
* Production Deployment

---

## Learning Objectives

This project was built to gain hands-on experience with:

* Spring Boot Development
* REST API Design
* Authentication & Authorization
* JWT Security
* Database Integration
* React Frontend Development
* Full-Stack Application Architecture
* Enterprise Development Practices

---

## Author

**Harshwardhan Solanki**

Backend Developer | Java & Spring Boot Enthusiast

GitHub: https://github.com/harsh-w-s
