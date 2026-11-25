import { Alert } from "react-bootstrap";

export default function AlertBox({ alert, onClose }) {
  if (!alert) return null;
  return (
    <Alert variant={alert.variant} dismissible onClose={onClose}>
      {alert.message}
    </Alert>
  );
}
