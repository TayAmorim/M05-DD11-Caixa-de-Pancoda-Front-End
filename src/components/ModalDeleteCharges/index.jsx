import "./style.css";
import alertIcon from "../../assets/alert.svg";
import api from "../../api/api";
import { useContext } from "react";
import { AuthContext } from "../../context/myContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ModalDelete({ setOpenModalDeleteCharges }) {
  const { idDelete, setFetchChargesList } = useContext(AuthContext);
  const storedData = sessionStorage.getItem("customerDataSession");
  const parsedData = JSON.parse(storedData);

  const detailCharge = async () => {
    try {
      const response = await api.get(`/detailcharge/${idDelete}`);
      const dueDate = new Date(response.data[0].due_date);
      const isPending = response.data[0].status && dueDate >= new Date();
      const isExpired = response.data[0].status && dueDate <= new Date();
      const isPaid = !response.data[0].status;

      if (isPaid) {
        toast.warn("Cobrança paga não pode ser excluída!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setOpenModalDeleteCharges(false);
      }

      if (isExpired) {
        toast.warn("Cobrança vencida não pode ser excluída!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setOpenModalDeleteCharges(false);
      }

      if (isPending) {
        deleteCharges();
        toast.success("Cobrança excluída com sucesso!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const deleteCharges = async () => {
    try {
      await api.delete(`/charges/${idDelete}`);

      if (parsedData) {
        const chargeFilterList = parsedData.charges.filter(
          (charge) => charge.id_charges !== idDelete
        );
        const customerSession = {
          ...parsedData,
          charges: [...chargeFilterList],
        };
        sessionStorage.setItem(
          "customerDataSession",
          JSON.stringify(customerSession)
        );
      }

      setOpenModalDeleteCharges(false);
      setFetchChargesList(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-modal-delete">
      <div className="box-info-delete">
        <img src={alertIcon} alt="Alert Icon" />
        <h3>Tem certeza que deseja excluir esta cobrança ?</h3>
        <div className="box-buttons">
          <button className="btn-yes" onClick={detailCharge}>
            Sim
          </button>
          <button
            className="btn-no"
            onClick={() => {
              setOpenModalDeleteCharges(false);
            }}
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
}
