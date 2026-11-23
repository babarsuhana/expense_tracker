import "../styles/ConfirmationModal.css";

function ConfirmationModal({
  title = "Confirm Action",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  return (
    <div className="confirmation-overly" onClick={oncancel}>
      <div
        className="conformation-modal"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="conformation-title">{title}</h2>
        <p>{message}</p>

        <div className="confirmatin-buttons">
          <button
            type="button"
            className="confirmation-cancel"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className="confirmation-delete"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
