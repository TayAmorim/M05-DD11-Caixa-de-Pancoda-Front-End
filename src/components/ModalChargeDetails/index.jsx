import './style.css'
import billings from '../../assets/billings.svg'
import { useContext } from 'react';
import { AuthContext } from '../../context/myContext';
import { format } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'
import {
    Box,
    CircularProgress
} from "@mui/material";

export default function ModalDelete({ setModalChargeDetails }) {
    const { detailCharge } = useContext(AuthContext)
    const dueDate = detailCharge[0] ? new Date(detailCharge[0].due_date) : null;
    const isExpired = detailCharge[0] && detailCharge[0].status && dueDate < new Date();
    return (
        <div className='container-modal-details'>
            <div className='box-info-details'>
                <div className='title-box'>
                    <img src={billings} alt="Billings Icon" />
                    <h1>Detalhes da Cobrança</h1>
                </div>
                {detailCharge.length > 0

                    ?
                    <>
                        <div className='box-infos'>
                            <h3>Nome</h3>
                            <span>{detailCharge[0].name_client}</span>
                        </div>
                        <div className='box-infos'>
                            <h3>Descrição</h3>
                            <span>{detailCharge[0].description}</span>
                        </div>
                        <div className='box-infos amount-date'>
                            <div>
                                <h3>Vencimento</h3>
                                <span>
                                    {String(Number(format(new Date(detailCharge[0].due_date), 'dd/MM/yyyy').slice(0, 2)) + 1) + '/' +
                                        format(new Date(detailCharge[0].due_date), 'dd/MM/yyyy').slice(3)}
                                </span>
                            </div>
                            <div>
                                <h3>Valor</h3>
                                <span>{`R$:${(detailCharge[0].amount / 100).toFixed(2).replace('.', ',')}`}</span>
                            </div>
                        </div>
                        <div className='box-infos amount-date'>
                            <div>
                                <h3>ID Cob.</h3>
                                <span>{detailCharge[0].id_charges}</span>
                            </div>
                            <div>
                                <h3>Status</h3>
                                <span className={detailCharge[0].status ? (isExpired ? "expired-client" : "pending-client") : "paid-client"}>
                                                {detailCharge[0].status ? (isExpired ? "Vencido" : "Pendente") : "Pago"}
                                            </span>
                            </div>
                        </div>
                    </>
                    :
                    (
                        <Box sx={{ display: 'flex', width: '90vw', height: 'calc(100vh - 130px)', alignItems: 'center', justifyContent: 'center', color: 'secondary' }}>
                            <CircularProgress />
                        </Box>
                    )

                }
                <div className='box-buttons-details'>
                    <button className='btn-yes' onClick={() => { setModalChargeDetails(false) }}>Fechar</button>
                </div>
            </div>
        </div>
    )
} 