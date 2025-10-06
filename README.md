# 🥗 RecipeHub — Modern Angular Recipe Manager

[![Angular](https://img.shields.io/badge/Angular-17%2B-DD0031?logo=angular&logoColor=white)](https://angular.io/)
[![PrimeNG](https://img.shields.io/badge/PrimeNG-UI%20Library-6C63FF?logo=primefaces&logoColor=white)](https://primeng.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Utility--First-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strongly%20Typed-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A responsive, feature-rich recipe management web app built with **Angular**, **PrimeNG**, and **Tailwind CSS**.  
> Users can browse, filter, and manage recipes with favorites, detailed View, and dynamic form handling.

---

## 🧩 Tech Stack

<div align="center">

|                                     Frontend                                      |                                             Styling                                              |                             Backend                              |                                         Tools                                         |
| :-------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------: | :--------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| <img src="https://angular.io/assets/images/logos/angular/angular.svg" width="40"> | <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" width="40"> | <img src="https://nodejs.org/static/images/logo.svg" width="40"> | <img src="https://cdn.worldvectorlogo.com/logos/visual-studio-code-1.svg" width="40"> |
|                                    Angular 17+                                    |                                           Tailwind CSS                                           |                      Node.js (JSON-Server)                       |                                        VS Code                                        |
|                                                                                   | <img src="https://www.primefaces.org/wp-content/uploads/2018/05/primetek_logo.png" width="100">  |                                                                  |
|                                                                                   |                                             PrimeNG                                              |                                                                  |

</div>

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Luka-khokhashvili/recipe-sharing-app.git
cd recipehub
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the Application

```bash
ng serve
```

Now open your browser and visit 👉 http://localhost:4200

---

## 🏗️ Project Structure

```graphql
├── public/                  # All of the media files
├── src/
│   ├── app/
│   │   ├── components/          # Reusable UI components
│   │   ├── interfaces/          # TypeScript interfaces for models
│   │   ├── pages/               # Page-level components
│   │   ├── services/            # REST API integrations and data logic
│   │   ├── app.component.*      # Root component
│   │   ├── app.config.ts        # Root config
│   │   └── app.routes.ts        # Routes
│   │
│   ├── index.html               # Root html file
│   ├── main.ts                  # Main entry point
│   └── styles.css               # Global styles
│
├── db.json                      # Mock JSON database
├── .postcssrc.json              # Tailwind configuration
└── ...other project related configuration files
```

---

## ⚙️ Key Angular Features Used

|             Feature             |                                  Description                                  |
| :-----------------------------: | :---------------------------------------------------------------------------: |
|      Standalone Components      |             Modular, dependency-light components for reusability              |
|         Reactive Forms          |        Dynamic form arrays and validation for recipe creation/editing         |
| Services & Dependency Injection |             Centralized state and API logic via `RecipesService`              |
|   Routing & Route Parameters    |         Clean navigation between recipe list, add, and details pages          |
|       PrimeNG Components        | Professional UI elements like `p-card`, `p-dialog`, `p-toggleButton` and more |
|     Tailwind CSS Utilities      |                  Fast, responsive, and consistent UI styling                  |
|    Custom Events & @Outputs     |              Seamless communication between reusable components               |
|         Lifecycle Hooks         |                Controlled component initialization and cleanup                |

---

## 💡 Challenges Encountered

- Implementing **dynamic reactive** forms for ingredients, steps, and tags
- Maintaining form state consistency between **edit** and **add** pages
- Handling **image uploads and previews** within the Angular form model
- Optimizing **re-rendering and state updates** when favoriting recipes
- Designing a **reusable, scalable architecture** using **standalone components**

---

## 🌟 Additional Features Implemented

- ✅ **Favorite Filter Toggle** — switch between all and favorited recipes
- ✅ **Reusable Form Components** — text, number, textarea, and image upload
- ✅ **Confirmation Dialogs & Toast Notifications** using PrimeNG
- ✅ **404 Not Found Page** for unmatched routes
- ✅ **Responsive Layout** using Tailwind grid utilities
- ✅ **Centralized Recipe Service** for all API communication

---

## 🧠 Future Improvements

- 🔄 Integrate real backend with authentication
- 🧾 Add comments & rating system
- 🔍 Implement advanced search & filters

---

## Links

[![GitHub](https://img.shields.io/badge/-GitHub-black?style=flat&logo=github)](https://github.com/Luka-khokhashvili/recipe-sharing-app.git)

## Mock data from

[![Dummy JSON API](https://img.shields.io/badge/Data%20Source-DummyJSON-28A745?style=for-the-badge)](https://dummyjson.com/?ref=djcs)

---

## 👨‍💻 Author

### **Luka khokhashvili**

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/luka-khokhashvili-8179b7285/)
[![Email](https://img.shields.io/badge/-Email-D14836?style=flat&logo=gmail&logoColor=white)](mailto:khokhashvililuka@gmail.com)
[![Portfolio](https://img.shields.io/badge/-Portfolio-1abc9c?style=flat&logo=ko-fi&logoColor=white)](https://portfolio-three-sigma-59.vercel.app/)

## ⚖️ License

**Licensed under:** [MIT](https://opensource.org/licenses/MIT)

Made by [**Luka khokhashvili**](https://github.com/Luka-khokhashvili). All rights reserved.
