import './style.css'
import alertIcon from '../../assets/alert.svg'
import api from '../../api/api';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/myContext';

export default function ModalDelete ({setOpenModalDeleteCharges}){
    // const {idDelete, setData} = useContext(AuthContext)

    // const deleteBillings = async () => {
    //     try {
    //       const token = localStorage.getItem('token');
    //       api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //       const response = await api.delete(`/cobrancas/${idDelete}`);
    //       await dataValuesBilling()
    //     } catch (error) {
          
    //     }
    //   }
    //   const dataValuesBilling = async () => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    //         const response = await api.get('/cobrancas');
    //         setData(response.data);
    //     } catch (error) {
            
    //     }
    // }

    return(
       <div className='container-modal-delete'>
            <div className='box-info-delete'>
                <img src={alertIcon} alt="Alert Icon" />
                <h3>Tem certeza que deseja excluir esta cobrança ?</h3>
                <div className='box-buttons'>
                    <button className='btn-yes'>Sim</button>
                    <button className='btn-no' onClick={() => setOpenModalDeleteCharges(false)}>Não</button>
                </div>
            </div>
        </div>
    )
} 