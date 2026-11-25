// Language dictionary for English (en) and Chinese (zh)
// Used with `lang` state in App.jsx and passed via props as `t`

const translations = {
  en: {
    // Navbar
    brand: "Warehouse IMS",
    navProducts: "Products",
    navStock: "Stock Management",
    langButton: "中文",

    // HomePage
    homeTitle: "Warehouse Inventory System",
    homeSubtitle: "Manage your products and stock levels in one place.",
    productMgmt: "Product Management",
    productMgmtDesc: "View, search, add, and remove products from your warehouse catalogue.",
    goToProducts: "Go to Products",
    stockMgmt: "Stock Management",
    stockMgmtDesc: "Perform Stock In and Stock Out operations and track real-time levels.",
    goToStock: "Go to Stock",

    // StockBadge
    inStock: "In Stock",
    lowStock: "Low Stock",
    outOfStock: "Out of Stock",

    // ProductPage
    searchPlaceholder: "Search by product name...",
    addProduct: "Add Product",
    totalProducts: "Total Products",
    productList: "Product List",
    recordsCount: (n) => `${n} records`,
    alertAdded: (name) => `✅ "${name}" has been added successfully!`,
    alertRemoved: (name) => `🗑️ "${name}" has been removed.`,

    // ProductTable
    colId: "Product ID",
    colName: "Product Name",
    colCategory: "Category",
    colQty: "Quantity",
    colPrice: "Unit Price (RM)",
    colStatus: "Status",
    colAction: "Action",
    noProducts: "No products found.",
    deleteTitle: "Delete product",

    // Categories mapping
    categories: {
      Electronics: "Electronics",
      Furniture: "Furniture",
      Stationery: "Stationery",
      Tools: "Tools",
      Others: "Others",
    },

    // ProductModal
    addNewProduct: "Add New Product",
    productNameLabel: "Product Name",
    productNamePlaceholder: "e.g. Wireless Mouse",
    categoryLabel: "Category",
    selectCategory: "-- Select Category --",
    qtyLabel: "Quantity",
    priceLabel: "Unit Price (RM)",
    cancel: "Cancel",
    errName: "Product name is required.",
    errCategory: "Category is required.",
    errQty: "Enter a valid quantity (0 or more).",
    errPrice: "Enter a valid price (greater than 0).",

    // ConfirmModal
    confirmDelete: "Confirm Delete",
    confirmDeletePrefix: "Are you sure you want to delete ",
    confirmDeleteSuffix: "? This action cannot be undone.",
    yesDelete: "Yes, Delete",

    // StockPage
    stockHintPrefix: "Click ",
    stockHintSuffix: " on any product row to perform Stock In or Stock Out.",
    manageStock: "Manage Stock",
    currentStockLevels: "Current Stock Levels",
    colCurrentQty: "Current Qty",
    colUnitPrice: "Unit Price",
    noProductsAvailable: "No products available.",
    alertStockIn: (name, amount, newQty) =>
      `✅ Stock In: Added ${amount} unit(s) to "${name}". New stock: ${newQty}`,
    alertStockOut: (name, amount, newQty) =>
      `📤 Stock Out: Removed ${amount} unit(s) from "${name}". New stock: ${newQty}`,

    // StockModal
    stockIn: "Stock In",
    stockOut: "Stock Out",
    currentStock: "Current Stock",
    units: "units",
    movementType: "Movement Type",
    qtyToAdd: "Quantity to Add",
    qtyToRemove: "Quantity to Remove",
    enterQty: "Enter quantity",
    confirmStockIn: "Confirm Stock In",
    confirmStockOut: "Confirm Stock Out",
    errValidQty: "Please enter a valid quantity (greater than 0).",
    errStockOut: (qty) => `Stock Out failed! Available stock is only ${qty} unit(s).`,

    // AlertBox
    closeLabel: "Close",
  },

  zh: {
    // Navbar
    brand: "仓库库存系统",
    navProducts: "产品管理",
    navStock: "库存管理",
    langButton: "EN",

    // HomePage
    homeTitle: "仓库库存管理系统",
    homeSubtitle: "在同一个平台管理您的产品资料与库存数量。",
    productMgmt: "产品管理",
    productMgmtDesc: "查看、搜索、添加及删除仓库中的产品资料。",
    goToProducts: "进入产品管理",
    stockMgmt: "库存管理",
    stockMgmtDesc: "执行入库与出库操作，实时追踪库存数量变化。",
    goToStock: "进入库存管理",

    // StockBadge
    inStock: "库存充足",
    lowStock: "库存偏低",
    outOfStock: "库存不足",

    // ProductPage
    searchPlaceholder: "按产品名称搜索...",
    addProduct: "添加产品",
    totalProducts: "产品总数",
    productList: "产品列表",
    recordsCount: (n) => `${n} 条记录`,
    alertAdded: (name) => `✅ "${name}" 已成功添加！`,
    alertRemoved: (name) => `🗑️ "${name}" 已被删除。`,

    // ProductTable
    colId: "产品编号",
    colName: "产品名称",
    colCategory: "类别",
    colQty: "数量",
    colPrice: "单价 (RM)",
    colStatus: "库存状态",
    colAction: "操作",
    noProducts: "没有找到产品。",
    deleteTitle: "删除产品",

    // Categories mapping
    categories: {
      Electronics: "电子产品",
      Furniture: "家具",
      Stationery: "文具",
      Tools: "工具",
      Others: "其他",
    },

    // ProductModal
    addNewProduct: "添加新产品",
    productNameLabel: "产品名称",
    productNamePlaceholder: "例如：无线鼠标",
    categoryLabel: "产品类别",
    selectCategory: "-- 选择类别 --",
    qtyLabel: "数量",
    priceLabel: "单价 (RM)",
    cancel: "取消",
    errName: "请输入产品名称。",
    errCategory: "请选择产品类别。",
    errQty: "请输入有效数量（0 或以上）。",
    errPrice: "请输入有效单价（大于 0）。",

    // ConfirmModal
    confirmDelete: "确认删除",
    confirmDeletePrefix: "您确定要删除 ",
    confirmDeleteSuffix: " 吗？此操作无法撤销。",
    yesDelete: "确认删除",

    // StockPage
    stockHintPrefix: "点击 ",
    stockHintSuffix: " 按钮，对该产品进行入库或出库操作。",
    manageStock: "管理库存",
    currentStockLevels: "当前库存状况",
    colCurrentQty: "当前数量",
    colUnitPrice: "单价",
    noProductsAvailable: "暂无产品资料。",
    alertStockIn: (name, amount, newQty) =>
      `✅ 入库成功：已为 "${name}" 添加 ${amount} 件。当前库存：${newQty} 件`,
    alertStockOut: (name, amount, newQty) =>
      `📤 出库成功：已从 "${name}" 取出 ${amount} 件。当前库存：${newQty} 件`,

    // StockModal
    stockIn: "入库",
    stockOut: "出库",
    currentStock: "当前库存",
    units: "件",
    movementType: "操作类型",
    qtyToAdd: "入库数量",
    qtyToRemove: "出库数量",
    enterQty: "请输入数量",
    confirmStockIn: "确认入库",
    confirmStockOut: "确认出库",
    errValidQty: "请输入有效数量（大于 0）。",
    errStockOut: (qty) => `出库失败！当前库存只有 ${qty} 件。`,

    // AlertBox
    closeLabel: "关闭",
  },
};

export default translations;
