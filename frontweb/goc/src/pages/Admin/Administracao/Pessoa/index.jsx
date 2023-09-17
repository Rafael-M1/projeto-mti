import toast, { Toaster } from "react-hot-toast";
import ButtonIconSmall from "../../../../components/ButtonIconSmall";
import { useState, useEffect } from "react";
import { EditIcon } from "../../../../assets/images/icon-edit";
import { DeleteIcon } from "../../../../assets/images/icon-delete";
import { requestBackend } from "../../../../util/requests";
import { useLocation, useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip, Modal } from "react-bootstrap";
import Pagination from "../../../../components/Pagination";
import CardLoader from "../../../../components/CardLoader";

const PessoaAdministracao = () => {
  const [page, setPage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [filtroNomePessoaTexto, setFiltroNomePessoaTexto] = useState("");
  const [filtroNomePessoa, setFiltroNomePessoa] = useState("");
  const [showModalExcluir, setShowModalExcluir] = useState(false);
  const [pessoaSelecionada, setPessoaSelecionada] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const handleClose = () => {
    setPessoaSelecionada(null);
    setShowModalExcluir(false);
  };

  useEffect(() => {
    if (state != null && state.mensagem != null) {
      if (state.mensagem.tipo == "success") {
        toast.success(state.mensagem.texto);
        navigate(location.pathname, { replace: true });
      }
    }
    // setIsLoading(true);
    servicePessoaPromise({})
      .then((response) => {
        console.log(response.data);
        setPage(response.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const servicePessoaPromise = ({
    pageNumberParam,
    methodParam = "GET",
    urlParam = "/pessoa",
    dataParam,
  }) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        let params = {
          url: urlParam,
          method: methodParam,
          withCredentials: true,
        };
        if (methodParam == "GET" || methodParam != "POST") {
          params.params = {
            page: pageNumberParam ?? 0,
            size: 12,
          };
        }
        if (dataParam) {
          params.data = dataParam;
        }
        requestBackend(params)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      }, 0);
    });

  const onClickFiltrar = () => {
    if (filtroNomePessoaTexto.trim() != "") {
      setFiltroNomePessoa(filtroNomePessoaTexto);
      servicePessoaPromise({
        methodParam: "POST",
        urlParam: "/pessoa/filtro",
        dataParam: { nome: filtroNomePessoaTexto },
      })
        .then((response) => setPage(response.data))
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setFiltroNomePessoa(filtroNomePessoaTexto);
      servicePessoaPromise({})
        .then((response) => setPage(response.data))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  const onClickExcluir = (pessoa) => {
    setPessoaSelecionada(pessoa);
    setShowModalExcluir(true);
  };

  const onClickEditar = (pessoaParam) => {
    navigate("/admin/administracao/pessoa/form", {
      state: {
        pessoa: {
          idPessoa: pessoaParam.idPessoa,
          nome: pessoaParam.nome,
          dataNascimento: pessoaParam.dataNascimento,
          cpf: pessoaParam.cpf,
          email: pessoaParam.email,
          sexo: pessoaParam.sexo,
          telefone1: pessoaParam.telefone1,
          telefone2: pessoaParam.telefone2
        },
      },
    });
  };

  const onClickAdicionar = () => {
    navigate("/admin/administracao/pessoa/form");
  };

  return (
    <div
      className="card"
      style={{
        boxShadow: "3px 4px 19px -1px rgba(0,0,0,0.75)",
        background: "#fff",
        height: "100%",
        margin: "5px 25px",
      }}
    >
      <div className="card-body">
        <h2 className="card-title text-center">Administração - Pessoas</h2>
        <Toaster position="top-right" />
        <div className="container mt-5">
          <div className="d-flex justify-content-between">
            <div style={{ display: "flex" }}>
              <ButtonIconSmall
                text="Filtrar"
                widthPixels={220}
                heightPixels={50}
                onClick={onClickFiltrar}
                icon={true}
              />
              <input
                type="text"
                className="form-control"
                style={{ height: "50px", width: "400px", marginLeft: "10px" }}
                placeholder="Filtrar pelo nome da Pessoa"
                onChange={(e) => setFiltroNomePessoaTexto(e.target.value)}
              />
            </div>
            <ButtonIconSmall
              text="Adicionar"
              widthPixels={240}
              heightPixels={50}
              onClick={onClickAdicionar}
              icon={true}
            />
          </div>
          {isLoading ? (
            <CardLoader speed={0.9} width={1120} height={580} />
          ) : (
            <>
              {filtroNomePessoa && (
                <p className="mt-3">Busca por: {filtroNomePessoa}</p>
              )}
              <table className="table table-light table-hover mt-4">
                <thead>
                  <tr>
                    <th scope="col">CPF</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Data de Nascimento</th>
                    <th scope="col">Telefones</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Sexo</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {page &&
                    page.content &&
                    page.content.map((pessoa) => (
                      <tr key={pessoa.idPessoa}>
                        <th scope="row">{pessoa.cpf}</th>
                        <td>{pessoa.nome}</td>
                        <td>
                          {new Date(pessoa.dataNascimento).toLocaleDateString(
                            "pt-BR"
                          )}
                        </td>
                        <td>
                          {pessoa.telefone1}
                          {pessoa.telefone2 ? `, ${pessoa.telefone2}` : ""}
                        </td>
                        <td>{pessoa.email}</td>
                        <td>{pessoa.sexo == "M" ? "Masculino" : "Feminino"}</td>
                        <td>
                          <div style={{ display: "flex" }}>
                            <OverlayTrigger
                              placement="top"
                              delay={{ show: 250, hide: 100 }}
                              overlay={
                                <Tooltip id="tooltip-top">Editar</Tooltip>
                              }
                            >
                              <div
                                style={{
                                  cursor: "pointer",
                                  borderStyle: "hidden",
                                  margin: "4px",
                                  padding: "4px",
                                }}
                                onClick={() => onClickEditar(pessoa)}
                              >
                                <EditIcon />
                              </div>
                            </OverlayTrigger>
                            <div
                              style={{
                                width: "10px",
                              }}
                            ></div>
                            <OverlayTrigger
                              placement="top"
                              delay={{ show: 250, hide: 100 }}
                              overlay={
                                <Tooltip id="tooltip-top">Excluir</Tooltip>
                              }
                            >
                              <div
                                style={{
                                  cursor: "pointer",
                                  borderStyle: "hidden",
                                  margin: "4px",
                                  padding: "4px",
                                }}
                                onClick={() => onClickExcluir(pessoa)}
                              >
                                <DeleteIcon />
                              </div>
                            </OverlayTrigger>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>
          )}
          <div style={{ display: "flex" }} className="mt-4">
            <Pagination
              pageCount={page && page.totalPages ? page.totalPages : 0}
              range={3}
              onChange={(pageNumber) => {
                if (filtroNomePessoa == "") {
                  servicePessoaPromise({ pageNumberParam: pageNumber })
                    .then((response) => setPage(response.data))
                    .finally(() => setIsLoading(false));
                } else {
                  servicePessoaPromise({
                    pageNumberParam: pageNumber,
                    methodParam: "POST",
                    urlParam: "/pessoa/filtro",
                    dataParam: {
                      nome: filtroNomePessoa,
                    },
                  })
                    .then((response) => setPage(response.data))
                    .finally(() => setIsLoading(false));
                }
              }}
            />
          </div>
        </div>
      </div>
      <Modal show={showModalExcluir} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>
            <h6>Deseja realmente excluir o Tipo de Crime?</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Nome: ${pessoaSelecionada?.nome}`}</Modal.Body>
        <Modal.Footer>
          <ButtonIconSmall
            text="Cancelar"
            widthPixels={220}
            heightPixels={40}
            onClick={() => setShowModalExcluir(false)}
            icon={false}
          />
          <ButtonIconSmall
            text="Confirmar"
            widthPixels={220}
            heightPixels={40}
            onClick={() => {
              servicePessoaPromise({
                methodParam: "DELETE",
                urlParam: `/pessoa/${pessoaSelecionada.idPessoa}`,
              })
                .then((response) => {
                  serviceTipoCrimePromise({}).then((response) =>
                    setPage(response.data)
                  );
                })
                .finally(() => handleClose());
            }}
            icon={true}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PessoaAdministracao;
