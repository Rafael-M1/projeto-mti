import ButtonIcon from "../ButtonIcon";
import { ReactComponent as FolderOpenedIcon } from "./../../assets/images/icon-folder-opened.svg";

const ServicoCard = ({ tituloImagem, subTitulo, descricaoServico, onClickButton }) => {
  return (
    <div
      class="card"
      style={{
        // boxShadow: "3px 4px 19px -1px rgba(0,0,0,0.75)",
        background: "#d9d9d9",
        minHeight: "140px",
        margin: "25px 25px",
      }}
    >
      <div class="card-body">
        <div class="container">
          <div class="row">
            <div class="col-lg-2 d-flex flex-column">
              <div
                style={{
                  background: "#000",
                  borderRadius: "10px",
                  width: "75px",
                  margin: "auto",
                }}
              >
                <FolderOpenedIcon />
              </div>
              <p style={{ textAlign: "center" }} className="mt-2">
                <b>{tituloImagem}</b>
              </p>
            </div>
            <div class="col-lg-6 d-flex flex-column">
              <h5>{subTitulo}</h5>
              <p>{descricaoServico}</p>
            </div>
            <div class="col-lg-4 d-flex flex-column" style={{ margin: "auto" }}>
              <ButtonIcon text="Acessar" widthPixels={220} onClick={onClickButton} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicoCard;
