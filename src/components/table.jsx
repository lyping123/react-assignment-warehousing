import Modal from "./modal.jsx";
import { useState } from "react";

export default function Table({ data, columns, onRemove }) {
    const [modalData, setModalData] = useState([]);

    const handleOpenModal = (item) => {
        setModalData(item);
    };

    return (
        <>
            <Modal data={modalData} />
            <table className="table table-striped mt-5 table-bordered table-hover">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.accessor}>{column.header}</th>
                        ))}
                        <th>Stock Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price.toFixed(2)}</td>
                            <td>
                                {item.quantity === 0 ? (
                                    <span className="badge bg-danger">Out of Stock</span>
                                ) : item.quantity <= 10 ? (
                                    <span className="badge bg-warning text-dark">Low Stock</span>
                                ) : (
                                    <span className="badge bg-success">In Stock</span>
                                )}
                            </td>
                            <td>
                                <button
                                    className="btn btn-outline-primary me-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={() => handleOpenModal(item)}
                                >
                                    Modal
                                </button>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => onRemove(item)}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}