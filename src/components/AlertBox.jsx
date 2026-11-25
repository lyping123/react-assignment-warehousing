import { Alert } from "react-bootstrap";

export default function AlertBox({ alert, onClose }) {
  if (!alert) return null;
  return (
    <Alert variant={alert.type} dismissible onClose={onClose} className="shadow-sm">
      {alert.message}
    </Alert>
  );
}