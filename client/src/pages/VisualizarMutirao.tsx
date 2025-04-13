import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Wrapper from "../assets/wrappers/VisualizarMutirao";
import { NavBar } from "../components";
import { mockMutiroes } from "./User";

interface Mutirao {
  id: number;
  title: string;
  date: string;
  horario: string;
  local: string;
  description: string;
  author: string;
  image: string;
  participantes: number;
  tarefas: string[];
  materiais?: string;
}

interface Habilidade {
  nome: string;
  checked: boolean;
}

interface Material {
  nome: string;
  checked: boolean;
}

const VisualizarMutirao = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isInscrito, setIsInscrito] = useState(false);
  const [aceitouTermo, setAceitouTermo] = useState(false);
  const [habilidades, setHabilidades] = useState<Habilidade[]>([
    { nome: "Pintura e acabamento", checked: false },
    { nome: "Montagem de móveis", checked: false },
    { nome: "Limpeza e cuidados gerais", checked: false }
  ]);
  const [materiais, setMateriais] = useState<Material[]>([
    { nome: "Ferramentas de Pintura", checked: false },
    { nome: "Martelos e pregos", checked: false },
    { nome: "Parafusadeira", checked: false }
  ]);

  // Encontra o mutirão com base no ID da URL
  const mutirao = mockMutiroes.find(m => m.id === Number(id));

  const handleHabilidadeChange = (index: number) => {
    const novasHabilidades = [...habilidades];
    novasHabilidades[index].checked = !novasHabilidades[index].checked;
    setHabilidades(novasHabilidades);
  };

  const handleMaterialChange = (index: number) => {
    const novosMateriaisChecked = [...materiais];
    novosMateriaisChecked[index].checked = !novosMateriaisChecked[index].checked;
    setMateriais(novosMateriaisChecked);
  };

  const handleInscricao = () => {
    if (!aceitouTermo) {
      alert("Por favor, aceite o termo de participação antes de se inscrever.");
      return;
    }
    setIsInscrito(prev => !prev);
  };

  if (!mutirao) {
    return (
      <Wrapper>
        <div className="min-h-screen">
          <NavBar />
          <div className="container">
            <main>
              <h1>Mutirão não encontrado</h1>
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={() => navigate(-1)}
                aria-label="Voltar para página anterior"
              >
                Voltar
              </button>
            </main>
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="min-h-screen">
        {/*<NavBar />*/}
        <div className="container">
          <div className="content-container">
            <div className="image-section">
              <div className="image-container">
                <img 
                  src={mutirao.image} 
                  alt={`Imagem do mutirão: ${mutirao.title}`} 
                  className="mutirao-image"
                />
                <p className="image-credit">Imagem por {mutirao.author}</p>
              </div>
              <div className="autor-info">
                <span>Organizado por:</span>
                <h3>{mutirao.author}</h3>
              </div>
            </div>

            <div className="info-section">
              <h1>{mutirao.title}</h1>
              <p className="date-author">Por {mutirao.author} • {mutirao.date}</p>
              
              <div className="section">
                <h2>Descrição</h2>
                <p>{mutirao.description}</p>
              </div>

              <div className="section">
                <h2>Local</h2>
                <div className="location-box">
                  <svg className="location-icon" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{mutirao.local}</span>
                </div>
              </div>

              <div className="section">
                <h2>Tarefas</h2>
                <p className="section-description">Atividades que serão desenvolvidas no evento</p>
                <div className="tasks-list">
                  {mutirao.tarefas.map((tarefa, index) => (
                    <div key={index} className="task-item">
                      <p>{tarefa}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="section">
                <h2>Habilidades</h2>
                <p className="section-description">Selecione pelo menos uma habilidade</p>
                <div className="checkbox-list">
                  {habilidades.map((habilidade, index) => (
                    <label key={index} className="checkbox-item">
                      <span>{habilidade.nome}</span>
                      <input
                        type="checkbox"
                        checked={habilidade.checked}
                        onChange={() => handleHabilidadeChange(index)}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="section">
                <h2>Materiais e Ferramentas</h2>
                <p className="section-description">Selecione caso possa trazer os seguintes itens</p>
                <div className="checkbox-list">
                  {materiais.map((material, index) => (
                    <label key={index} className="checkbox-item">
                      <span>{material.nome}</span>
                      <input
                        type="checkbox"
                        checked={material.checked}
                        onChange={() => handleMaterialChange(index)}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="section">
                <h2>Termo de Aceitação</h2>
                <p className="section-description">Leia e confirme para participar deste mutirão</p>
                <label className="termo-container">
                  <div className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      checked={aceitouTermo}
                      onChange={(e) => setAceitouTermo(e.target.checked)}
                    />
                  </div>
                  <div className="termo-text">
                    <p>
                      Eu concordo em participar deste mutirão de forma voluntária, contribuindo com minhas habilidades
                      e seguindo as orientações dos organizadores. Entendo que o objetivo é desenvolver melhorias
                      para a biblioteca da comunidade e, se necessário, trarei meus próprios equipamentos para colaborar.
                      Comprometo-me a agir com respeito, responsabilidade e colaboração, garantindo um ambiente seguro
                      e inclusivo para todos os participantes.
                    </p>
                  </div>
                </label>
              </div>

              <div className="button-group">
                <button 
                  type="button" 
                  className="back-btn"
                  onClick={() => navigate(-1)}
                >
                  Voltar
                </button>
                <button 
                  className={`submit-btn ${!aceitouTermo ? 'disabled' : ''}`}
                  onClick={handleInscricao}
                  disabled={!aceitouTermo}
                >
                  {isInscrito ? 'Cancelar Participação' : 'Quero Ser Voluntário'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default VisualizarMutirao; 