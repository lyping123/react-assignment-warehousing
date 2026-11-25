import { useState } from "react";
import Table from "./components/table.jsx";
import Alert from "./alert.jsx";

export default function StockPage({ products, onRemoveProduct, onStockIn }) {
  const [alert, setAlert] = useState({ show: false, type: "", msg: "" });

  const handleStockIn = (id, quantity) => {
    onStockIn(id, quantity);
    setAlert({
      show: true,
      type: "success",
      msg: `Stock updated successfully. ${quantity} unit${quantity === 1 ? "" : "s"} added.`,
    });
  };

  const handleRemoveProduct = (id) => {
    onRemoveProduct(id);
    setAlert({ show: true, type: "success", msg: "Product removed successfully." });
  };

  const columns = [
    { header: "Product ID", accessor: "id" },
    { header: "Product Name", accessor: "name" },
    { header: "Category", accessor: "category" },
    { header: "Current Stock", accessor: "quantity" },
    {
      header: "Price (RM)",
      accessor: "price",
      render: (price) => Number(price).toFixed(2),
    },
  ];

  return (
    <main className="container py-4">
      <h1 className="h2 mb-0">Stock Management</h1>
      <p className="text-muted mt-2">Receive stock and keep inventory quantities up to date.</p>
      <div className="mt-3">
        <Alert props={alert} />
      </div>
      <Table
        data={products}
        columns={columns}
        onRemove={handleRemoveProduct}
        onStockIn={handleStockIn}
      />
    </main>
  );
}
