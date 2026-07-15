# Personal Finance Tracker

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Local Storage](https://img.shields.io/badge/Local_Storage-API-4285F4?style=for-the-badge)
![Responsive](https://img.shields.io/badge/Responsive-Yes-22C55E?style=for-the-badge)
![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub_Pages-181717?style=for-the-badge&logo=github)

A responsive personal finance tracker that helps users record income and expenses, monitor their current balance, and manage transactions with persistent local storage. Built with vanilla HTML, CSS, and JavaScript.

## Live Demo

[Finance Tracker](https://aribkhan218.github.io/Personal-Finance-Tracker/)

## Quick Look

### Dark Mode
![Dark Mode](https://github.com/user-attachments/assets/4d582bfc-5516-459b-86ec-b184aa811e86)
![Dark Mode](https://github.com/user-attachments/assets/f636e663-5960-4b24-aee3-e377e05585d8)

### Light Mode
![Light Mode](https://github.com/user-attachments/assets/70e93417-f9da-4947-a205-a05dd8ab2ead)
![Light Mode](https://github.com/user-attachments/assets/fb9e952f-d74a-4852-b10d-3aa3291c4574)


## Features

- Add, edit, and delete transactions
- Real-time balance, income, and expense calculations
- Debounced search
- Filter transactions by category
- Import and export transaction data as JSON
- Dark and light mode with saved preference
- Persistent storage using Local Storage
- Fully responsive design

## Built With

- HTML5
- CSS3
- JavaScript (ES6)
- Local Storage API

## Project Structure
```
.
├── assets
│   ├── delete.png
│   ├── favicon.ico
│   ├── pen.png
│   └── search.png
├── index.html
├── script.js
└── style.css

```

## Installation

1. Clone repository
```bash
git clone https://github.com/AribKhan218/Personal-Finance-Tracker
```
2. Open the project folder.
3. Open `index.html` or run it using the Live Server extension in VS Code.

## How It Works

1. Transactions are stored in a JavaScript array.
2. The UI is rendered dynamically based on the current state.
3. Every change is synchronized with Local Storage.
4. Event delegation is used for edit and delete actions.
5. Search and category filters update the rendered transaction list.

## Challenges I Faced

- Building edit functionality
- Mapping DOM elements to array indexes
- Keeping totals synchronized
- Persisting theme and transactions with Local Storage
- Making desktop and mobile layouts work

## What I Learned

- DOM manipulation
- Event delegation
- Local Storage API
- Debouncing
- Responsive web design
- Dynamic rendering
- JavaScript array methods (`filter`, `forEach`, `some`)

## About This Project

This is my first JavaScript project built completely from scratch without following a tutorial. The focus was on strengthening my understanding of DOM manipulation, state management, event delegation, Local Storage, and responsive UI design by solving real implementation problems independently.

## Author

Muhammad Arib Mehdi

[Github](https://github.com/AribKhan218)

[LinkedIn](https://www.linkedin.com/in/arib-mehdi-53a120308/)

## License

MIT
