import { useState } from "react";
import {
  useLoaderData,
  useNavigate,
  Form,
  useNavigation,
  redirect,
  ActionFunctionArgs,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/NovoMutirao";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import AddressAutocomplete from "../components/AddressAutocomplete";

import getImageUrl from "../utils/imageUrlHelper";

interface Mutirao {
  _id: string;
  titulo: string;
  data: string;
  horario: string;
  descricao: string;
  local: string;
  numeroEComplemento?: string;
  materiais: string;
  tarefas: string[];
  mutiraoTipo: string;
  imagemCapa: string;
  criadoPor: {
    _id: string;
    nome: string;
  };
  location?: {
    type: "Point";
    coordinates: [number, number];
  };
}

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

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const id = params.id;
  if (!id) {
    throw new Error("ID do mutirão não fornecido");
  }
  const formData = await request.formData();

  console.log("Dados do FormData:");
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const tarefas = formData.getAll("tarefas") as string[];
  formData.delete("tarefas");
  tarefas.filter(Boolean).forEach((tarefa) => {
    formData.append("tarefas", tarefa);
  });

  try {
    await customFetch.patch(`/mutiroes/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("Mutirão atualizado com sucesso!");
    return redirect(`/mutirao/${id}`);
  } catch (err: unknown) {
    const error = err as {
      response?: { data?: { msg?: string } };
      message?: string;
    };
    const errorMsg =
      error.response?.data?.msg || error.message || "Erro ao atualizar mutirão";
    toast.error(errorMsg);
    return null;
  }
};

const EditarMutirao = () => {
  const { mutirao } = useLoaderData() as { mutirao: Mutirao };
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [termosAceitos, setTermosAceitos] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    titulo: mutirao.titulo,
    data: mutirao.data,
    horario: mutirao.horario || "",
    descricao: mutirao.descricao,
    local: mutirao.local || "",
    materiais: mutirao.materiais || "",
    tarefas: mutirao.tarefas || [""],
    mutiraoTipo: mutirao.mutiraoTipo,
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const currentImage = mutirao.imagemCapa;

  // States para o endereço
  const [numeroEComplemento, setNumeroEComplemento] = useState(
    mutirao.numeroEComplemento || ""
  );
  const [geoCoordinates, setGeoCoordinates] = useState<{
    lat: string;
    lon: string;
  } | null>(
    mutirao.location?.coordinates
      ? {
          lat: String(mutirao.location.coordinates[1]),
          lon: String(mutirao.location.coordinates[0]),
        }
      : null
  );

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

  // Handle do endereço
  const handleNumeroEComplementoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumeroEComplemento(e.target.value);
  };

  const handleLocationSelected = (
    locationInfo: { display_name: string; lat: string; lon: string } | null
  ) => {
    if (locationInfo) {
      setFormData((prev) => ({
        ...prev,
        local: locationInfo.display_name,
      }));
      setGeoCoordinates({ lat: locationInfo.lat, lon: locationInfo.lon });
    } else {
      // Se usuário digitar maualmente, limpar coordenadas
      setGeoCoordinates(null);
    }
  };

  return (
    <Wrapper>
      <div className="min-h-screen">
        <div className="container">
          <main>
            <div
              className="form-header"
              data-bg={
                "https://res.cloudinary.com/dunfagpl8/image/upload/v1750033758/mutyrologo_bz2kon.png"
              }
              style={
                {
                  "--bg-url": `url(https://res.cloudinary.com/dunfagpl8/image/upload/v1750033758/mutyrologo_bz2kon.png)`,
                } as React.CSSProperties
              }
            >
              <h2>Editando seu mutirão</h2>
              <p className="form-subtitle">
                Atualize as informações abaixo para manter seu mutirão sempre
                organizado.
              </p>
            </div>
            <div className="form-container">
              <Form method="post" encType="multipart/form-data">
                <div className="image-section">
                  <h3>Capa do Mutirão</h3>
                  <div className="image-upload">
                    {selectedImage ? (
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Preview"
                        className="preview-image"
                      />
                    ) : currentImage ? (
                      <img
                        src={getImageUrl(currentImage)}
                        alt="Current"
                        className="preview-image"
                      />
                    ) : (
                      <div className="upload-placeholder">
                        <span>Foto</span>
                      </div>
                    )}
                    <button
                      type="button"
                      className="btn upload-btn"
                      onClick={() =>
                        document.getElementById("foto-input")?.click()
                      }
                    >
                      <i className="fa-solid fa-upload"></i>Alterar capa
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
                    {/* <label htmlFor="address-search-input">
                      Endereço Principal (Rua, Bairro, Cidade)
                    </label> */}
                    <AddressAutocomplete
                      onLocationSelect={handleLocationSelected}
                      initialValue={removeNumeroFromLocal(
                        formData.local,
                        numeroEComplemento
                      )}
                      placeholder="Busque o endereço..."
                    />
                    {/* Input oculta para o endereço para ser enviado para 'local' */}
                    <input type="hidden" name="local" value={formData.local} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="numeroEComplemento">
                      Número e Complemento
                    </label>
                    <input
                      type="text"
                      id="numeroEComplemento"
                      name="numeroEComplemento" // This name will be sent
                      value={numeroEComplemento} // Use the separate state
                      onChange={handleNumeroEComplementoChange}
                      required
                      placeholder="Ex: 123, Apto B, Próximo ao..."
                    />
                  </div>

                  {/* Inputs oculpas para latitude e longitude */}
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
                            className="remove-btn"
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
                      className="add-btn"
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
                    disabled={isSubmitting}
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
                  >
                    {isSubmitting ? (
                      <>
                        <i
                          className="fa-solid fa-spinner fa-spin"
                          style={{ marginRight: "0.5rem" }}
                        ></i>
                        Atualizando...
                      </>
                    ) : (
                      <>
                        <i
                          className="fa-solid fa-save"
                          style={{ marginRight: "0.5rem" }}
                        ></i>
                        Atualizar Mutirão
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

export default EditarMutirao;

function removeNumeroFromLocal(local, numeroEComplemento) {
  if (!local || !numeroEComplemento) return local;

  const pattern = new RegExp(`,\\s*${escapeRegExp(numeroEComplemento.trim())}`);
  return local.replace(pattern, "").trim();
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
