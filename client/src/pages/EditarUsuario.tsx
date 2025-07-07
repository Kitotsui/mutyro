import React, { useEffect, useState, useRef } from "react";
import Wrapper from "../assets/wrappers/EditarUsuario";
import { useNavigate, redirect, useFetcher } from "react-router-dom";
import customFetch from "@/utils/customFetch";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";

import getImageUrl from "../utils/imageUrlHelper";

import { ActionFunctionArgs } from "react-router-dom";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  try {
    const { data } = await customFetch.patch(
      "/usuarios/atualizar-usuario",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    toast.success("Perfil atualizado com sucesso!");
    return data;
  } catch (error: any) {
    toast.error(error?.response?.data?.msg || "Erro ao atualizar o perfil.");
    return error;
  }
};
export const loader = async () => {
  try {
    await customFetch.get("/usuarios/atual-usuario");
    return null; // Usuário autenticado, permite acesso
  } catch {
    toast.error("Você precisa estar logado para editar seu perfil.");
    return redirect("/"); // Redireciona para a tela inicial
  }
};

const EditarUsuario = () => {
  const { usuario, setUsuario } = useAuth();

  const navigate = useNavigate();
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state !== "idle";

  const [foto, setFoto] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFoto(e.target.files[0]);
    }
  };

  const previewUrl = foto
    ? URL.createObjectURL(foto)
    : getImageUrl(usuario?.avatar);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.usuario) {
        setUsuario(fetcher.data.usuario);
        toast.success(fetcher.data.msg || "Perfil atualizado!");
        setFoto(null);
      } else if (fetcher.data.msg) {
        toast.error(fetcher.data.msg);
      }
    }
  }, [fetcher.state, fetcher.data, setUsuario]);

  if (!usuario) {
    return (
      <Wrapper>
        <div>Carregando perfil...</div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="container">
        <div
          className="form-header"
          data-bg={
            "https://res.cloudinary.com/dunfagpl8/image/upload/v1750033758/mutyrologo_bz2kon.png"
          }
          style={
            {
              ["--bg-url"]: `url(https://res.cloudinary.com/dunfagpl8/image/upload/v1750033758/mutyrologo_bz2kon.png)`,
            } as React.CSSProperties
          }
        >
          <h2>Editar Usuário</h2>
          <p className="form-subtitle">
            Atualize seus dados pessoais e mantenha seu perfil completo.
          </p>
        </div>
        <div className="form-container">
          <fetcher.Form method="patch" encType="multipart/form-data">
            <div className="image-section">
              <h3>Foto de Perfil</h3>
              <div className="image-upload">
                <img src={previewUrl} alt="Preview" className="preview-image" />
                {/* <div className="upload-placeholder">Foto</div> */}
                <button
                  type="button"
                  className="btn upload-btn"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <i className="fa-solid fa-upload"></i> Trocar Foto
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  id="foto-input"
                  name="avatar"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                name="nome"
                defaultValue={usuario.nome}
                placeholder="Nome completo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                defaultValue={usuario.email}
                placeholder="Email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="endereco">Endereço</label>
              <input
                type="text"
                name="endereco"
                defaultValue={usuario.endereco}
                placeholder="Rua, número, bairro..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                name="cpf"
                defaultValue={usuario.cpf}
                placeholder="000.000.000-00"
              />
            </div>

            <div className="form-group">
              <label htmlFor="dataNascimento">Data de Nascimento</label>
              <input
                type="date"
                name="dataNascimento"
                defaultValue={usuario.dataNascimento}
              />
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
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i
                      className="fa-solid fa-spinner fa-spin"
                      style={{ marginRight: "0.5rem" }}
                    ></i>
                    Salvando...
                  </>
                ) : (
                  <>
                    <i
                      className="fa-solid fa-floppy-disk"
                      style={{ marginRight: "0.5rem" }}
                    ></i>
                    Salvar Alterações
                  </>
                )}
              </button>
            </div>
          </fetcher.Form>
        </div>
      </div>
    </Wrapper>
  );
};

export default EditarUsuario;
