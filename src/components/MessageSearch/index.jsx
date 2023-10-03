import "./style.css";
import noResults from "../../assets/noResults.svg";

export default function MessageSearch({ children }) {
  return (
    <div className="box-table-billings container-message-search">
      <img src={noResults} alt="No result Icon" />
      <h1>Nada foi encontrado na pesquisa</h1>
      {children}
    </div>
  );
}
