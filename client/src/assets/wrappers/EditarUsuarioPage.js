import React, { useState } from "react";
import Wrapper from "./EditarUsuario";

const EditarUsuarioPage = () => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <Wrapper>
      <div className="container">
        <main>
          <h1>Editar Usuário</h1>
          <div className="form-container">
            <form>
              <div className="image-upload">
                <div className="upload-placeholder">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="preview-image"
                    />
                  ) : (
                    "Foto"
                  )}
                </div>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="upload-btn"
                />
              </div>
              <div className="form-section">
                <div className="form-group">
                  <label htmlFor="nome">Nome</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    placeholder="Digite o nome completo"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="endereco">Endereço</label>
                  <input
                    type="text"
                    id="endereco"
                    name="endereco"
                    placeholder="Digite o endereço"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cpf">CPF</label>
                  <input
                    type="text"
                    id="cpf"
                    name="cpf"
                    placeholder="000.000.000-00"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="interesses">Interesses</label>
                  <textarea
                    id="interesses"
                    name="interesses"
                    placeholder="Descreva os interesses do usuário"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nascimento">Data de Nascimento</label>
                  <input type="date" id="nascimento" name="nascimento" />
                </div>
                <div className="button-group">
                  <button type="button" className="cancel-btn">
                    Cancelar
                  </button>
                  <button type="submit" className="submit-btn">
                    Salvar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </Wrapper>
  );
};

export default EditarUsuarioPage;
