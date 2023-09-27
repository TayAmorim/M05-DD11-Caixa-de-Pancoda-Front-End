import './style.css'

export default function ModalInstructions() {
    return (
        <div className="modal-instructions">
            <span>Pesquisas aceitas</span>
            <span><strong>Nome:</strong> mínimo 3 letras</span>
            <span><strong>CPF:</strong> mínimo 3 números</span>
            <span><strong>Email:</strong> 3 letras + @</span>
        </div>
    )
}