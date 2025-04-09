// src/components/CadastroMutirao.js
import React from "react";
import Wrapper from "../assets/wrappers/MutiraoCadastroWrapper";

const CadastroMutirao = ({ onClose }) => {
  return (
    <Wrapper>
      <div className="cadastro-container">
        <h4>Novo Mutirão</h4>
        <form className="form">
          {/* Foto */}
          <div className="form-group">
            <label>Foto</label>
            <input type="file" accept="image/*" />
          </div>

          {/* Título */}
          <div className="form-group">
            <label>Título</label>
            <input type="text" placeholder="Ex: Mutirão de Limpeza" />
          </div>

          {/* Data */}
          <div className="form-group">
            <label>Data</label>
            <input type="date" />
          </div>

          {/* Descrição */}
          <div className="form-group">
            <label>Descrição</label>
            <textarea placeholder="Descreva o mutirão..."></textarea>
          </div>

          {/* Local */}
          <div className="form-group">
            <label>Local</label>
            <input type="text" placeholder="Ex: Praça Central" />
          </div>

          {/* Tarefas */}
          <div className="form-group">
            <label>Tarefas</label>
            <textarea placeholder="Liste ou descreva as tarefas..."></textarea>
          </div>

          {/* Checkbox */}
          <div className="form-group">
            <label>
              <input type="checkbox" />
              {' '}Precisa de ferramentas?
            </label>
          </div>

          {/* Botões */}
          <button type="submit" className="btn">Cadastrar</button>
          <button type="button" className="btn btn-cancelar" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </Wrapper>
  );
};

export default CadastroMutirao;
