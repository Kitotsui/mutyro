import { useState } from "react";
import Wrapper from "../assets/wrappers/NovoMutirao";
import { Form, useNavigate, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import AddressAutocomplete from "../components/AddressAutocomplete";

//import { MUTIRAO_TIPOS } from "/home/lamouniers/Documentos/Estudos/mutyro/utils/constantes.js";

export const loader = async () => {
  try {
    await customFetch.get("/usuarios/atual-usuario");
    return null; // User is authenticated, allow access
  } catch {
    toast.error("Você precisa estar logado para criar um mutirão.");
    return redirect("/");
  }
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();

  // Para debug - verifique os dados do formulário
  console.log("Dados do FormData:");
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  // vamos trabalhar diretamente com o FormData
  const tarefas = formData.getAll("tarefas") as string[];

  // Limpa as tarefas existentes no FormData
  formData.delete("tarefas");

  // Adiciona cada tarefa individualmente
  tarefas.filter(Boolean).forEach((tarefa) => {
    formData.append("tarefas", tarefa);
  });

  const mutirao = {
    titulo: formData.get("titulo"),
    data: formData.get("data"),
    horario: formData.get("horario"),
    descricao: formData.get("descricao"),
    local: formData.get("local"),
    materiais: formData.get("materiais") || "",
    tarefas: tarefas.filter(Boolean),
    mutiraoTipo: formData.get("mutiraoTipo"),
  };

  const local = formData.get("local") as string;
  const latitude = formData.get("latitude") as string;
  const longitude = formData.get("longitude") as string;

  if (!local || local.trim() === "") {
    toast.error(
      "Por favor, preencha o endereço base selecionando uma sugestão."
    );
    return { error: "Endereço base obrigatório." };
  }
  if (
    !latitude ||
    !longitude ||
    latitude.trim() === "" ||
    longitude.trim() === ""
  ) {
    toast.error(
      "Localização inválida. Por favor, selecione um endereço da lista de sugestões."
    );
    return { error: "Coordenadas inválidas ou não selecionadas." }; // Or return null
  }

  try {
    const response = await customFetch.post("/mutiroes", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    toast.success("Mutirão criado com sucesso!");
    return redirect("/user");
  } catch (err: unknown) {
    const error = err as {
      response?: { data?: { msg?: string } };
      message?: string;
    };
    const errorMsg =
      error.response?.data?.msg || error.message || "Erro ao criar mutirão";
    toast.error(errorMsg);
    return { error: errorMsg };
  }
};

interface FormData {
  titulo: string;
  data: string;
  horario: string;
  descricao: string;
  local: string;
  materiais: string;
  tarefas: string[];
  mutiraoTipo: string;
}

const NovoMutirao = () => {
  const [termosAceitos, setTermosAceitos] = useState(false);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    titulo: "",
    data: "",
    horario: "",
    descricao: "",
    local: "",
    materiais: "",
    tarefas: [""],
    mutiraoTipo: "SOCIAL",
  });

  const [geoCoordinates, setGeoCoordinates] = useState<{
    lat: string;
    lon: string;
  } | null>(null);

  const [numeroEComplemento, setNumeroEComplemento] = useState("");

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleLocationSelected = (
    location: {
      display_name: string;
      lat: string;
      lon: string;
    } | null
  ) => {
    if (location) {
      setFormData((prev) => ({
        ...prev,
        local: location.display_name,
      }));
      setGeoCoordinates({ lat: location.lat, lon: location.lon });
    } else {
      // If location is null, it means user typed something new or cleared the input
      setGeoCoordinates(null);
      // formData.local will retain what the user typed if you don't clear it here.
      // If AddressAutocomplete's input has name="local", that typed value will be submitted.
    }
  };

  const handleNumeroEComplementoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumeroEComplemento(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTarefaChange = (index: number, value: string) => {
    const novasTarefas = [...formData.tarefas];
    novasTarefas[index] = value;
    setFormData((prev) => ({
      ...prev,
      tarefas: novasTarefas,
    }));
  };

  const adicionarTarefa = () => {
    setFormData((prev) => ({
      ...prev,
      tarefas: [...prev.tarefas, ""],
    }));
  };

  const removerTarefa = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tarefas: prev.tarefas.filter((_, i) => i !== index),
    }));
  };

  /*const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Implementar chamada à API
      console.log("Dados do formulário:", formData);
      navigate("/mutiroes");
    } catch (error) {
      console.error("Erro ao criar mutirão:", error);
    }
  };*/

  return (
    <Wrapper>
      <div className="min-h-screen">
        {/*<NavBar />*/}
        <div className="container">
          <main>
            <div
              className="form-header"
              data-bg={
                "https://res.cloudinary.com/dunfagpl8/image/upload/v1750033758/mutyrologo_bz2kon.png"
              }
              style={{
                ["--bg-url" as any]: `url(${"https://res.cloudinary.com/dunfagpl8/image/upload/v1750033758/mutyrologo_bz2kon.png"})`,
              }}
            >
              <h2>Seu mutirão está quase pronto!</h2>
              <p className="form-subtitle">
                Preencha as informações abaixo para finalizar a criação do seu
                mutirão.
              </p>
            </div>
            <div className="form-container">
              <Form method="post" encType="multipart/form-data">
                <div className="image-section">
                  <div className="image-upload">
                    {selectedImage ? (
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Preview"
                        className="preview-image"
                      />
                    ) : (
                      <div className="upload-placeholder">
                        <span>Capa do Mutirão</span>
                      </div>
                    )}
                    <button
                      type="button"
                      className="btn upload-btn"
                      onClick={() =>
                        document.getElementById("foto-input")?.click()
                      }
                    >
                      <i className="fa-solid fa-upload"></i>Enviar capa
                    </button>
                    <input
                      type="file"
                      id="foto-input"
                      name="imagemCapa"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>

                <div className="form-section">
                  <div className="form-group">
                    <label htmlFor="titulo">Título</label>
                    <input
                      type="text"
                      id="titulo"
                      name="titulo"
                      value={formData.titulo}
                      onChange={handleChange}
                      required
                      placeholder="Digite o título do mutirão"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="data">Data</label>
                      <input
                        type="date"
                        id="data"
                        name="data"
                        value={formData.data}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="horario">Horário</label>
                      <input
                        type="time"
                        id="horario"
                        name="horario"
                        value={formData.horario}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="descricao">Descrição</label>
                    <textarea
                      id="descricao"
                      name="descricao"
                      value={formData.descricao}
                      onChange={handleChange}
                      required
                      placeholder="Descreva o objetivo do mutirão"
                    />
                  </div>

                  <div className="form-group">
                    <AddressAutocomplete
                      onLocationSelect={handleLocationSelected}
                      initialValue={formData.local}
                    />
                    <input type="hidden" name="local" value={formData.local} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="numeroEComplemento">
                      Número e Complemento
                    </label>
                    <input
                      type="text"
                      id="numeroEComplemento"
                      name="numeroEComplemento"
                      value={numeroEComplemento}
                      onChange={handleNumeroEComplementoChange}
                      placeholder="Ex: 123, Bloco A, Próximo ao..."
                    />
                  </div>

                  {/* Inputs ocultas para latitude e longitude */}
                  {geoCoordinates && (
                    <>
                      <input
                        type="hidden"
                        name="latitude"
                        value={geoCoordinates.lat}
                      />
                      <input
                        type="hidden"
                        name="longitude"
                        value={geoCoordinates.lon}
                      />
                    </>
                  )}

                  <div className="form-group">
                    <label>Tarefas</label>
                    {formData.tarefas.map((tarefa, index) => (
                      <div key={index} className="tarefa-input">
                        <input
                          type="text"
                          name="tarefas"
                          value={tarefa}
                          onChange={(e) =>
                            handleTarefaChange(index, e.target.value)
                          }
                          placeholder="Descreva a tarefa"
                          required
                        />
                        {formData.tarefas.length > 1 && (
                          <button
                            type="button"
                            className="btn remove-btn"
                            onClick={() => removerTarefa(index)}
                          >
                            <i
                              className="fa-solid fa-trash"
                              style={{ marginRight: "0.5rem" }}
                            ></i>
                            Remover
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn add-btn"
                      onClick={adicionarTarefa}
                    >
                      <i
                        className="fa-solid fa-plus"
                        style={{ marginRight: "0.5rem" }}
                      ></i>
                      Adicionar Tarefa
                    </button>
                  </div>

                  <div className="form-group">
                    <label>
                      Necessita de Ferramentas, Materiais e (ou) Habilidades
                      Específicas?
                    </label>
                    <div className="radio-group">
                      <label>
                        <input
                          type="radio"
                          name="necessitaMateriais"
                          value="sim"
                          checked={!!formData.materiais}
                          onChange={() =>
                            setFormData((prev) => ({ ...prev, materiais: " " }))
                          }
                        />
                        Sim
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="necessitaMateriais"
                          value="nao"
                          checked={!formData.materiais}
                          onChange={() =>
                            setFormData((prev) => ({ ...prev, materiais: "" }))
                          }
                        />
                        Não
                      </label>
                    </div>
                    {formData.materiais && (
                      <textarea
                        name="materiais"
                        value={formData.materiais}
                        onChange={handleChange}
                        placeholder="Liste os materiais necessários"
                      />
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="tipo">Tipo de Mutirão</label>
                    <select
                      id="mutiraoTipo"
                      name="mutiraoTipo"
                      value={formData.mutiraoTipo}
                      onChange={handleChange}
                      required
                    >
                      <option value="SOCIAL">Social</option>
                      <option value="CONSTRUCAO_REFORMA">
                        Construção / Reforma
                      </option>
                      <option value="AMBIENTAL_AGRICOLA">
                        Ambiental / Agrícola
                      </option>
                      <option value="CULTURA_EDUCACAO">
                        Cultura / Educação
                      </option>
                      <option value="SAUDE">Saúde</option>
                      <option value="TECNOLOGIA">Tecnologia </option>
                    </select>
                  </div>

                  <div className="terms">
                    <label>
                      <input
                        type="checkbox"
                        checked={termosAceitos}
                        onChange={(e) => setTermosAceitos(e.target.checked)}
                        required
                      />
                      Eu concordo em organizar este mutirão de forma
                      responsável, respeitando as diretrizes da comunidade e
                      garantindo um ambiente seguro e inclusivo para todos os
                      participantes.
                    </label>
                  </div>
                </div>

                <div className="button-group">
                  <button
                    type="button"
                    className="btn cancel-btn"
                    onClick={() => navigate(-1)}
                  >
                    <i
                      className="fa-solid fa-xmark"
                      style={{ marginRight: "0.5rem" }}
                    ></i>
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn submit-btn"
                    disabled={!termosAceitos || isSubmitting}
                    aria-disabled={!termosAceitos || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <i
                          className="fa-solid fa-spinner fa-spin"
                          style={{ marginRight: "0.5rem" }}
                        ></i>
                        Criando Mutirão...
                      </>
                    ) : (
                      <>
                        <i
                          className="fa-solid fa-check-circle"
                          style={{ marginRight: "0.5rem" }}
                        ></i>
                        Criar Mutirão
                      </>
                    )}
                  </button>
                </div>
              </Form>
            </div>
          </main>
        </div>
      </div>
    </Wrapper>
  );
};

export default NovoMutirao;
