# ToDoList 📌

A web application for task management (To-Do List) developed in JavaScript, allowing users to add, filter, sort, and delete tasks, with local persistence via `localStorage`.

## 🚀 Features

- **Add tasks** with title, description, category, due date, and status (completed or not).
- **Filter tasks** by category and status.
- **Sort tasks** alphabetically, by due date, or by status.
- **Delete tasks** easily.
- **Manage custom categories** for organization.
- **Persist tasks** in the browser using `localStorage`.

## 🔧 Installation & Usage

1. **Clone the repository**

    ```bash
    git clone <repo-url>
    cd ToDoList
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Generate CSS with Tailwind**

    ```bash
    npm run tailwind
    ```

    _(The generated CSS will be in `public/assets/css/style.css` from `public/assets/css/style-input.css`.)_

4. **Open the `public/index.html` file** in your browser.

## ✨ Customization

- Categories are dynamic and can be added via the interface.
- Tasks are stored in the browser's `localStorage`.

## 🛠 Technologies Used

- JavaScript (ES6+)
- HTML5 / CSS3
- [Tailwind CSS](https://tailwindcss.com/) (installed via CLI and used with a npm script)
- Prettier (for code formatting)

## 📂 Code Organization

- **`src/Class/Task.js`**: Business logic for task management (creation, filtering, sorting…)
- **`src/Class/TaskItem.js`**: Class handling individual task display.
- **`src/utilities/parseDate.js`**: Utility function for parsing dates in DD/MM/YYYY format.
- **`public/assets/js/index.js`**: Main application logic (display, interactions, filtering/sorting).
- **`public/assets/js/handleCategory.js`**: Manages categories in dropdown menus.
- **`public/assets/js/addTask.js`**: Handles the task addition form.
- **`public/assets/js/category.js`**: Manages category addition/removal.
- **`public/assets/js/validate.js`**: Provides form validation functions.

## 👥 Authors

- leclercqthierry

## 📝 License

This project is open-source and free to use.
