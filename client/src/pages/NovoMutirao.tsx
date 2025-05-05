import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/NovoMutirao";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { MUTIRAO_TIPOS } from "/home/lamouniers/Documentos/Estudos/mutyro/utils/constantes.js";

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
  } catch (err: any) {
    const errorMsg =
      err.response?.data?.msg || err.message || "Erro ao criar mutirão";
    toast.error(errorMsg);
    return null;
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
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    titulo: "",
    data: "",
    horario: "",
    descricao: "",
    local: "",
    materiais: "",
    tarefas: [""],
    mutiraoTipo: MUTIRAO_TIPOS.SOCIAL,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

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
            <h2>Seu mutirão está quase pronto!</h2>
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
                    ) : (
                      <div className="upload-placeholder">
                        <span>Foto</span>
                      </div>
                    )}
                    <button
                      type="button"
                      className="upload-btn"
                      onClick={() =>
                        document.getElementById("foto-input")?.click()
                      }
                    >
                      Enviar foto
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
                    <label htmlFor="local">Local</label>
                    <input
                      type="text"
                      id="local"
                      name="local"
                      value={formData.local}
                      onChange={handleChange}
                      required
                      placeholder="Digite o endereço do mutirão"
                    />
                  </div>

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
                      <option value={MUTIRAO_TIPOS.SOCIAL}>Social</option>
                      <option value={MUTIRAO_TIPOS.CONSTRUCAO_REFORMA}>
                        Construção / Reforma
                      </option>
                      <option value={MUTIRAO_TIPOS.AMBIENTAL_AGRICOLA}>
                        Ambiental / Agrícola
                      </option>
                      <option value={MUTIRAO_TIPOS.CULTURA_EDUCACAO}>
                        Cultura / Educação
                      </option>
                      <option value={MUTIRAO_TIPOS.SAUDE}>Saúde</option>
                      <option value={MUTIRAO_TIPOS.TECNOLOGIA}>
                        Tecnologia{" "}
                      </option>
                    </select>
                  </div>

                  <div className="terms">
                    <label>
                      <input type="checkbox" required />
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
                    className="cancel-btn"
                    onClick={() => navigate(-1)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="submit-btn">
                    Criar Mutirão
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
