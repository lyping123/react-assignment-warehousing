# Practical Assignment: React Warehouse Inventory System

## 1. Assignment Overview

Develop a **Warehouse Inventory Management System Frontend** using React JS and React Bootstrap.

The system focuses on two main functions:

- Product Management
- Stock Management

**Important:** This assignment is frontend only. All data must be stored in fixed JavaScript arrays and managed using React state. No database, backend, or API is required.

---

## 2. System Requirements

### R1. Product Management

Create a product management page to display warehouse products.

**Product Information:**

| Field        | Description         |
| ------------ | ------------------- |
| Product ID   | Unique product ID   |
| Product Name | Name of the product |
| Category     | Product category    |
| Quantity     | Available stock     |
| Unit Price   | Product price       |

**Required Functions:**

- Display product information using a React table component.
- Search products by product name.
- Add a new product.
- Remove an existing product.
- Display a confirmation modal before removing a product.
- Display an alert message after adding or removing a product.

### R2. Stock Management

Create a stock management page to manage product stock quantities.

**Required Functions:**

- Display the current stock quantity of each product.
- Select a product to perform stock movement.
- Perform Stock In to increase product quantity.
- Perform Stock Out to decrease product quantity.
- Enter the stock movement quantity.
- Prevent stock-out quantity from exceeding available stock.
- Display the updated stock quantity immediately.
- Display a success or error alert message.

### R3. Stock Status

Display stock status using React Bootstrap badges.

| Stock Quantity | Status       |
| -------------- | ------------ |
| 0              | Out of Stock |
| 1–10           | Low Stock    |
| More than 10   | In Stock     |

---

## 3. Fixed Data Requirements

Students must create a fixed product array in JavaScript.

**Example:**

```javascript
const products = [
  {
    id: 1001,
    name: "Wireless Mouse",
    category: "Electronics",
    quantity: 120,
    price: 25.5,
  },
  {
    id: 1002,
    name: "Keyboard",
    category: "Electronics",
    quantity: 8,
    price: 45.0,
  },
  {
    id: 1003,
    name: "Office Chair",
    category: "Furniture",
    quantity: 0,
    price: 180.0,
  },
  {
    id: 1004,
    name: "Monitor",
    category: "Electronics",
    quantity: 25,
    price: 350.0,
  },
];
```

Students may add more products to the array.

---

## 4. React Component Requirements

Students are required to create reusable React components.

| Component      | Description                               |
| -------------- | ----------------------------------------- |
| `ProductTable` | Display product information               |
| `ProductModal` | Add new product information               |
| `StockModal`   | Perform stock-in and stock-out operations |
| `AlertBox`     | Display success and error messages        |
| `ConfirmModal` | Confirm product removal                   |

---

## 5. Technical Requirements

Students must apply the React topics covered in class.

| Lesson | Topic                                   | Application                                               |
| ------ | --------------------------------------- | --------------------------------------------------------- |
| R1     | React Component Setup                   | Create React project and reusable components              |
| R2     | useState & useEffect                    | Manage product data and stock quantities                  |
| R3     | React Frontend Data Transfer            | Pass data and functions using props                       |
| R4     | React Bootstrap Basic                   | Use Forms, Buttons, Tables, Cards and Modals              |
| R5     | React Bootstrap Grid                    | Create responsive product and stock layouts               |
| R6     | React Router & Bootstrap Navbar         | Navigate between Product and Stock pages                  |
| R7     | React Alert Box Component               | Display reusable alert messages                           |
| R8     | React Table Component & Remove Function | Display products and remove product records               |
| R9     | React Modal Component                   | Add products, confirm removal and perform stock movements |

---

## 6. Assessment Rubric

| Assessment Criteria                        |   Marks |
| ------------------------------------------ | ------: |
| React component structure and reusability  |      10 |
| useState, useEffect and props              |      15 |
| React Bootstrap design and responsive grid |      15 |
| React Router and navigation                |      10 |
| Product management functions               |      20 |
| Stock management functions                 |      20 |
| Alert, table and modal components          |      10 |
| **Total**                                  | **100** |

---

## 7. Submission Requirements

Students must submit:

1. Complete React project source code.
2. Screenshots of Product Management and Stock Management pages.
3. Screenshots demonstrating Add and Remove Product functions.
4. Screenshots demonstrating Stock In and Stock Out functions.

---

## 8. How to Run the Project

Install project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local development URL displayed in the terminal.

---

## 9. Important Notes

- This assignment is frontend only.
- No database, backend, or API integration is required.
- All product and stock data must be managed using React state.
- Data does not need to be saved permanently.
- Data may reset when the browser is refreshed.
- Students must organize their code into reusable React components.
- The interface must be responsive and user-friendly.

## 10. Project Setup & Dependencies

### Step 1: Create React Project

Create a new React project using Vite:

```bash
npm create vite@latest warehouse-inventory -- --template react
```

Navigate to the project folder:

```bash
cd warehouse-inventory
```

### Step 2: Install Dependencies

Install the required React and Bootstrap packages:

```bash
npm install bootstrap@^5.3.8 bootstrap-icons@^1.13.2 react@^19.2.8 react-dom@^19.2.8 react-router-dom@^7.18.5
```

### Step 3: Import Bootstrap CSS and Icons

Open `src/main.jsx` and import the following files:

```jsx
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
```

### Step 4: Run the React Project

Start the development server:

```bash
npm run dev
```

Open the Local URL displayed in the terminal to access your React application.

### Step 5: Installed Dependencies

The following packages should appear in your `package.json`:

```json
{
  "dependencies": {
    "bootstrap": "^5.3.8",
    "bootstrap-icons": "^1.13.2",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-router-dom": "^7.18.5"
  }
}
```

**Note:** Make sure all dependencies are installed successfully before starting the assignment.

**Good luck and happy coding!**

# 实践作业：React 仓库库存管理系统

## 1. 作业简介（Assignment Overview）

学生需要使用 **React JS 和 React Bootstrap** 开发一个仓库库存管理系统前端（Warehouse Inventory Management System）。

本系统主要包含两个功能模块：

- 产品管理（Product Management）
- 库存管理（Stock Management）

**注意：** 本作业只需要开发前端，不需要连接数据库、后端或 API。所有数据必须使用 JavaScript 固定数组（Array）储存，并通过 React State 进行管理。

---

## 2. 系统功能要求（System Requirements）

### R1. 产品管理（Product Management）

创建一个产品管理页面，用于显示仓库中的所有产品。

**产品资料（Product Information）：**

| 字段         | 说明         |
| ------------ | ------------ |
| Product ID   | 产品唯一编号 |
| Product Name | 产品名称     |
| Category     | 产品类别     |
| Quantity     | 当前库存数量 |
| Unit Price   | 产品单价     |

**必须完成的功能：**

- 使用 React Table Component 显示产品资料。
- 根据产品名称搜索产品。
- 添加新产品（Add Product）。
- 删除现有产品（Remove Product）。
- 删除产品前，必须使用 Confirmation Modal 确认。
- 添加或删除产品后，显示 Alert Message 提示操作结果。

### R2. 库存管理（Stock Management）

创建一个库存管理页面，用于管理产品的库存数量。

**必须完成的功能：**

- 显示每个产品目前的库存数量。
- 选择产品进行库存操作。
- Stock In：增加产品库存数量。
- Stock Out：减少产品库存数量。
- 输入库存变动数量。
- Stock Out 数量不能超过目前可用库存。
- 操作后立即更新产品库存数量。
- 操作完成后显示 Success 或 Error Alert Message。

### R3. 库存状态（Stock Status）

使用 React Bootstrap Badge 显示不同的库存状态。

| 库存数量 | 库存状态              |
| -------- | --------------------- |
| 0        | Out of Stock（缺货）  |
| 1–10     | Low Stock（库存不足） |
| 大于 10  | In Stock（库存充足）  |

---

## 3. 固定数据要求（Fixed Data Requirements）

学生必须在 JavaScript 中创建固定的产品资料数组。

**参考代码：**

```javascript
const products = [
  {
    id: 1001,
    name: "Wireless Mouse",
    category: "Electronics",
    quantity: 120,
    price: 25.5,
  },
  {
    id: 1002,
    name: "Keyboard",
    category: "Electronics",
    quantity: 8,
    price: 45.0,
  },
  {
    id: 1003,
    name: "Office Chair",
    category: "Furniture",
    quantity: 0,
    price: 180.0,
  },
  {
    id: 1004,
    name: "Monitor",
    category: "Electronics",
    quantity: 25,
    price: 350.0,
  },
];
```

学生可以根据自己的设计需求，在数组中添加更多产品资料。

---

## 4. React Component 要求（React Component Requirements）

学生必须创建可重复使用的 React Components。

| Component      | 功能说明                        |
| -------------- | ------------------------------- |
| `ProductTable` | 显示所有产品资料                |
| `ProductModal` | 添加新产品资料                  |
| `StockModal`   | 执行 Stock In 和 Stock Out 操作 |
| `AlertBox`     | 显示成功或错误提示信息          |
| `ConfirmModal` | 确认是否删除产品                |

---

## 5. 技术要求（Technical Requirements）

学生必须应用课堂上学习过的 React 技术。

| Lesson | 课程内容                                | 应用要求                                           |
| ------ | --------------------------------------- | -------------------------------------------------- |
| R1     | React Component Setup                   | 创建 React 项目及可重复使用的 Components           |
| R2     | useState & useEffect                    | 管理产品资料及库存数量                             |
| R3     | React Frontend Data Transfer            | 使用 Props 传递资料和函数                          |
| R4     | React Bootstrap Basic                   | 使用 Forms、Buttons、Tables、Cards 和 Modals       |
| R5     | React Bootstrap Grid                    | 创建响应式产品和库存页面布局                       |
| R6     | React Router & Bootstrap Navbar         | 使用 React Router 在 Product 和 Stock 页面之间导航 |
| R7     | React Alert Box Component               | 创建可重复使用的 Alert Message 组件                |
| R8     | React Table Component & Remove Function | 显示产品资料及实现删除功能                         |
| R9     | React Modal Component                   | 使用 Modal 添加产品、确认删除及执行库存操作        |

---

## 6. 评分标准（Assessment Rubric）

| 评分项目                               |    分数 |
| -------------------------------------- | ------: |
| React Component 结构及重复使用         |      10 |
| useState、useEffect 和 Props 应用      |      15 |
| React Bootstrap 设计及 Responsive Grid |      15 |
| React Router 和页面导航                |      10 |
| 产品管理功能                           |      20 |
| 库存管理功能                           |      20 |
| Alert、Table 和 Modal Components       |      10 |
| **总分（Total）**                      | **100** |

---

## 7. 作业提交要求（Submission Requirements）

学生必须提交以下资料：

1. 完整的 React 项目源代码。
2. Product Management 和 Stock Management 页面截图。
3. Add Product 和 Remove Product 功能截图。
4. Stock In 和 Stock Out 操作功能截图。

---

## 8. 如何运行项目（How to Run the Project）

安装项目所需的 Dependencies：

```bash
npm install
```

启动 React 开发服务器：

```bash
npm run dev
```

根据 Terminal 显示的 Local URL，在浏览器中打开项目。

---

## 9. 重要事项（Important Notes）

- 本作业只需要开发 Frontend。
- 不需要连接 Database、Backend 或 API。
- 所有产品和库存资料必须使用 React State 管理。
- 不需要永久保存数据。
- 浏览器 Refresh 后，数据可以恢复为初始资料。
- 学生必须将代码组织成可重复使用的 React Components。
- 系统界面必须具备 Responsive Design（响应式设计）。
- 必须确保所有要求的功能都可以正常操作。

## 10. 项目设置与依赖安装（Project Setup & Dependencies）

### Step 1：创建 React 项目

使用 Vite 创建一个新的 React 项目：

```bash
npm create vite@latest warehouse-inventory -- --template react
```

进入项目文件夹：

```bash
cd warehouse-inventory
```

### Step 2：安装所需 Dependencies

安装 React 和 Bootstrap 所需的依赖包：

```bash
npm install bootstrap@^5.3.8 bootstrap-icons@^1.13.2 react@^19.2.8 react-dom@^19.2.8 react-router-dom@^7.18.5
```

### Step 3：导入 Bootstrap CSS 和 Icons

打开 `src/main.jsx` 文件，并加入以下代码：

```jsx
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
```

**说明：**

- Bootstrap CSS：用于设计网页布局及界面样式。
- Bootstrap Icons：用于显示各种图标。
- Bootstrap JS：用于支持 Modal、Dropdown 等 Bootstrap 交互功能。

### Step 4：运行 React 项目

使用以下命令启动 React 开发服务器：

```bash
npm run dev
```

启动成功后，根据 Terminal 显示的 Local URL，在浏览器中打开 React 项目。

### Step 5：确认已安装的 Dependencies

安装完成后，打开 `package.json`，确认以下依赖包已经安装：

```json
{
  "dependencies": {
    "bootstrap": "^5.3.8",
    "bootstrap-icons": "^1.13.2",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-router-dom": "^7.18.5"
  }
}
```

**注意事项（Important Notes）：**

- 开始作业前，必须确保所有 Dependencies 已成功安装。
- 如果安装过程中出现错误，请检查 Node.js 和 npm 是否已正确安装。
- 不需要额外安装数据库或后端相关 Packages。

**完成以上步骤后，即可开始开发 React Warehouse Inventory System。**

**祝大家编程顺利！Good Luck & Happy Coding!**
