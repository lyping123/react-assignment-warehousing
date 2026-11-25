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
            <table className="table table-striped table-hover table-bordered mt-5">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.accessor}>{column.header}</th>
                        ))}
                        <th colSpan="2">Action</th>
                        {/* <th>Remove</th> */}
                    </tr>

                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.category}</td>
                            <td><button className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleOpenModal(item)}>Modal</button></td>
                            <td><button className="btn btn-outline-danger" type="button" onClick={() => onRemove(item)}>Remove</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

