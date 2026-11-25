import { useEffect } from "react";
import { Alert } from "react-bootstrap";

// Reusable alert; auto-hides after 3 seconds
export default function AlertBox({ alert, onClose }) {
  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [alert]);

  if (!alert) return null;
  return (
    <Alert variant={alert.variant} dismissible onClose={onClose}>
      {alert.message}
    </Alert>
  );
}
