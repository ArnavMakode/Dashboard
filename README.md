# Dashboard

A React-based dashboard application for managing widgets within categories. This project utilizes Vite for build tooling, React for UI components, TypeScript for type safety, and the Context API for state management.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Project Overview

This project is a React application designed to manage widgets efficiently. It offers functionalities to add, update, select, unselect, and delete widgets within various categories. Users can also search for specific widgets by name. The state of categories and widgets is managed using the Context API and persisted locally.

## Features

- **Widget Management:**
  - Add new widgets to specific categories
  - Update widget properties
  - Select and unselect widgets using checkboxes
  - Delete widgets from categories

- **Search:**
  - Filter widgets by their names using the search bar

- **Persistent State:**
  - State management is handled using the Context API, ensuring that categories and widget data are persisted locally.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 20.13.1 or later)
- npm (Node Package Manager)

## Installation

Follow these steps to set up the project on your local machine:

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/ArnavMakode/Dashboard.git
    ```


2. **Navigate to the Project Directory:**

    ```bash
    cd dashboard
    ```

3. **Install Dependencies:**

    ```bash
    npm install
    ```

4. **Start the Development Server:**

    ```bash
    npm run dev
    ```

    This will start the Vite development server. The project will be accessible at [http://localhost:5173](http://localhost:5173) or check the terminal for the exact local server address.

## Usage

1. **Navigate to the Dashboard:**
   Open your browser and go to [http://localhost:5173](http://localhost:5173).

2. **Add Widgets:**
   - Click the "Add Widget" button.
   - Enter the widget name and text.

3. **Manage Widgets:**
   - **Select/Unselect:** Use the checkboxes next to each widget.
   - **Edit:** Click the "Edit" button to update a widget's properties.
   - **Delete:** Click the "Delete" button to remove a widget.

4. **Search:**
   - Use the search bar to find widgets by their names. The search feature filters widgets based on the input.

## Contributing

Contributions are welcome!