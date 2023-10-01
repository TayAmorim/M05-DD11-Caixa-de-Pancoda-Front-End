import './style.css';

export default function ModalInstructions({ title, instructions }) {
    return (
        <div className="modal-instructions">
            <span>{title}</span>
            {instructions.map((instruction, index) => (
                <span key={index}><strong>{instruction.label}:</strong> {instruction.description}</span>
            ))}
        </div>
    )
}