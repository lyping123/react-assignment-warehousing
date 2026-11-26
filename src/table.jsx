import Modal from "./components/modal.jsx";
import { useState } from "react";
import StockStatusBadge from "./components/StockStatusBadge.jsx";

export default function Table({ data, columns, onRemove }) {
    const [modalData, setModalData] = useState([]);

    const handleOpenModal = (item) => {
        setModalData(item);

    };

    return (
        <>
            <Modal data={modalData} />
            <table className="table table-striped mt-5">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.accessor}>{column.header}</th>
                        ))}
                        <th colSpan="2">Action</th>
                    </tr>

                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            {columns.map((column) => (
                                <td key={column.accessor}>
                                    {column.accessor === 'stockStatus'
                                        ? <StockStatusBadge quantity={item.quantity} />
                                        : column.accessor === 'price'
                                            ? `$${Number(item[column.accessor]).toFixed(2)}`
                                            : item[column.accessor]}
                                </td>
                            ))}
                            <td><button className="btn btn-outline-primary" onClick={() => handleOpenModal(item)} data-bs-toggle="modal" data-bs-target="#exampleModal">Modal</button></td>
                            <td><button className="btn btn-outline-danger" onClick={() => onRemove(item)}>remove</button></td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

