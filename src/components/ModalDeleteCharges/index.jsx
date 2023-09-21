import './style.css'
import alertIcon from '../../assets/alert.svg'
import api from '../../api/api';
import axios from 'axios'
import { useContext } from 'react';
import { AuthContext } from '../../context/myContext';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ModalDelete ({setOpenModalDeleteCharges}){
    const {idDelete, setDataCharges} = useContext(AuthContext)


    const deleteCharges = async () => {
        try {
          const response = await axios.delete(`http://localhost:3000/cobrancas/${idDelete}`);
          
          await dataValuesBilling()
          setOpenModalDeleteCharges(false)

          toast.success("Cobrança deletada com sucesso!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } catch (error) {
          
        }
      }
      const dataValuesBilling = async () => {
        try {
           
            const response = await axios.get('http://localhost:3000/cobrancas');
            setDataCharges(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    return(
       <div className='container-modal-delete'>
            <div className='box-info-delete'>
                <img src={alertIcon} alt="Alert Icon" />
                <h3>Tem certeza que deseja excluir esta cobrança ?</h3>
                <div className='box-buttons'>
                    <button className='btn-yes' onClick={deleteCharges}>Sim</button>
                    <button className='btn-no' onClick={() => setOpenModalDeleteCharges(false)}>Não</button>
                </div>
            </div>
        </div>
    )
} 