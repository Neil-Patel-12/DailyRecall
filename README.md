# DailyRecall

A web app where users can post about what they learned today.

## Table of Contents

- [About](#about)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [DailyRecall Setup Guide](#dailyrecall-setup-guide)
- [Directory Structure & Installation](#directory-structure-&-installation)
- [Django Backend Setup](#django-backend-setup)
- [PostgreSQL Setup](#postgreSQL-setup)
- [Migrations in Django](#migrations-in-django)
- [Key Commands](#key-commands)
- [Workflow](#workflow)
- [PgAdmin Database Viewing](#pgadmin-database-viewing)
- [Conclusion](#conclusion)

## About

DailyRecall is a platform designed for users to log and share what they learned each day. The app is built with a Django backend and a React frontend, with TypeScript integration for enhanced development.

## Technologies Used

- **Backend**: Django, Python
- **Frontend**: React, TypeScript
- **Database**: PostgreSQL
- **Other Tools**: PgAdmin, dotenv for environment variables

## Project Structure

```bash
DailyRecall/
│
├── DailyRecall_server/
│   ├── manage.py
│   ├── settings.py
│   └── ...
├── client/
│   └── src/
│   └── public/
└── README.md
```

## Getting started

Before setting up the project, ensure you have the following installed on your machine:

- Python 3.x
- Node.js
- PostgreSQL (version 16 or later)
- PgAdmin (should be downloaded at the same time you download Postgres)

## DailyRecall Setup Guide

This guide walks you through setting up the **DailyRecall** project on your local machine.

1. First clone the repo and move into the folder

```bash
git clone <DailyRecall-url>
cd DailyRecall
```

## Directory Structure & Installation

2. **Navigate to the following directory (root address)**

   ```bash
   C:\Users\<your-name>\...\DailyRecall>
   ```

3. **Setup Virtual Environment:**

   - Create a virtual environment:

     ```bash
     python -m venv envir
     ```

   - Activate the virtual environment:

     ```bash
     .\envir\Scripts\activate
     ```

   > **Note**: Always keep the virtual environment activated when working on the backend to avoid package conflicts.

## Django Backend Setup

4. **Navigate to the server directory:**

   ```bash
   C:\Users\<'your name'>\...\DailyRecall\DailyRecall_server>
   ```

5. **Install required backend packages using the requirements.txt file:**

   ```bash
   pip install -r requirements.txt
   ```

6. **Setup Frontend:**

   - First, change directory to the client folder:

     ```bash
     cd client
     ```

   - Install all necessary packages for React and TypeScript:

     ```bash
     npm install
     ```

   - Move back to the root directory:
     ```bash
     cd..
     ```

   > **Note**: Always keep the virtual environment activated when working on the backend to avoid package conflicts.

## PostgreSQL Setup

1. **Download & Install PostgreSQL** (version 16):

   - [PostgreSQL Downloads](https://www.postgresql.org/download/)
   - Make sure to **save your password** somewhere secure during installation, as it will be needed for future use.

2. **Configure Database Connection:**

   - Inside the **DailyRecall_server** directory, create a `.env` file (where the `settings.py` file is located).

3. **Add the following parameters to the `.env` file**:

   ```
   SECRET_KEY=<"ill give you the secret key">
   DB_NAME=DailyRecall
   DB_USER=postgres
   DB_PASSWORD=<"--your--pgadmin--password--">
   DB_HOST=127.0.0.1
   DB_PORT=5432
   ```

   > Ensure that the `DB_NAME` matches the database name you created in PgAdmin.

4. **PgAdmin Setup**:
   - Create the PostgreSQL database via PgAdmin, matching the `DB_NAME`.
   - Team members can connect to the database via PgAdmin by creating a new server connection with shared credentials.

## Migrations in Django

Django migrations help keep the database schema in sync with the models in the code.

## Key Commands

1. **makemigrations**:

   - Purpose: Generate migration files based on changes made to models.
   - Who runs it?
     - Only the developer making model changes should run `makemigrations`. The resulting migration files are committed to version control.

2. **migrate**:
   - Purpose: Apply the changes in the migration files to the database.
   - Who runs it?
     - Every developer after pulling the latest migration files from version control should run `migrate` to update their local database.

## Workflow

- When someone changes the models, they:

  - Run `makemigrations`.
  - Commit the resulting migration files to version control.

- After pulling the latest changes:
  - Every team member should run `migrate` to apply any new changes to their local development database.

## PgAdmin Database Viewing

- Make sure that every team member has the necessary access to the shared PostgreSQL database (if working with a centralized database).
- For local databases, each member can connect to their own PostgreSQL instance via PgAdmin after running `migrate` to view their tables.

## Conclusion

- **makemigrations**: Run by the person making changes to the models, and the migration files are shared via version control.
- **migrate**: Run by every team member to apply the changes to their database.
- PgAdmin: Team members can connect to PostgreSQL using shared credentials or individual local databases.
