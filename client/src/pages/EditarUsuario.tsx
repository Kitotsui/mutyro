import React, { useEffect, useState } from "react";
import Wrapper from "../assets/wrappers/EditarUsuario";
import { useNavigate } from "react-router-dom";
import customFetch from "@/utils/customFetch";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";

const EditarUsuario = () => {
  const { usuario } = useAuth();
  const { t } = useTranslation();

  console.log(usuario);

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    endereco: "",
    cpf: "",
    dataNascimento: "",
  });

  useEffect(() => {
    if (usuario) {
      setFormData({
        nome: usuario.nome,
        email: usuario.email,
        endereco: usuario.endereco,
        cpf: usuario.cpf,
        dataNascimento: usuario.dataNascimento,
      });
    }
  }, [usuario]);

  const [foto, setFoto] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let response;
      if (foto) {
        const dadosParaEnviar = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          dadosParaEnviar.append(key, value);
        });
        dadosParaEnviar.append("foto", foto);

        response = await customFetch.patch(
          "/usuarios/atualizar-usuario",
          dadosParaEnviar,
          {
            withCredentials: true,
          }
        );
      } else {
        response = await customFetch.patch(
          "/usuarios/atualizar-usuario",
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      if (response.data?.error) {
        throw new Error(response.data.error);
      }

      toast.success(t('editarUsuario.sucesso'));
      navigate("/user");
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { msg?: string } };
        message?: string;
      };
      const errorMsg =
        error.response?.data?.msg || error.message || t('editarUsuario.erro');
      toast.error(errorMsg);
    }
  };

  return (
    <Wrapper>
      <div className="container">
        <h1>{t('editarUsuario.titulo')}</h1>
        <div className="form-container">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="image-section">
              <h3>{t('editarUsuario.fotoPerfil')}</h3>
              <div className="image-upload">
                {foto ? (
                  <img
                    src={URL.createObjectURL(foto)}
                    alt="Preview"
                    className="preview-image"
                  />
                ) : (
                  <div className="upload-placeholder">{t('editarUsuario.foto')}</div>
                )}
                <button
                  type="button"
                  className="upload-btn"
                  onClick={() => document.getElementById("foto-input")?.click()}
                >
                                      {t('editarUsuario.enviarFoto')}
                </button>
                <input
                  type="file"
                  id="foto-input"
                  name="foto"
                  accept="image/*"
                  onChange={handleFotoChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="nome">{t('editarUsuario.nome')}</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder={t('editarUsuario.nomePlaceholder')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">{t('editarUsuario.email')}</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('editarUsuario.emailPlaceholder')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="endereco">{t('editarUsuario.endereco')}</label>
              <input
                type="text"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                placeholder={t('editarUsuario.enderecoPlaceholder')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cpf">{t('editarUsuario.cpf')}</label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                placeholder={t('editarUsuario.cpfPlaceholder')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="dataNascimento">{t('editarUsuario.dataNascimento')}</label>
              <input
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
              />
            </div>

            <div className="button-group">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate(-1)}
              >
                {t('editarUsuario.cancelar')}
              </button>
              <button type="submit" className="submit-btn">
                                  {t('editarUsuario.salvar')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default EditarUsuario;
