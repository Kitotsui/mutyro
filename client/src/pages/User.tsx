import Wrapper from "../assets/wrappers/UserPage";
import UserProfile from "../components/UserProfile";
import UserSidebar from "../components/UserSidebar";
import MutiroesList from "../components/MutiroesList";
import { useState } from "react";

import { redirect, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";

type Usuario = {
  _id: string;
  nome: string;
  //username: string;
};

//loader pega as informacoes antes renderizar o componente
export const loader = async () => {
  try {
    const objeto = await customFetch("/usuarios/atual-usuario");
    const mutiroesRes = await customFetch("/mutiroes/todos");

    const usuario = objeto.data.usuario;
    const allMutiroes = mutiroesRes.data.mutiroes;

    return { usuario, allMutiroes };
  } catch {
    return redirect("/"); //se a atenticacao falhar, redireciona para a pagina inicial
  }
};

type Mutirao = {
  _id: string;
  titulo: string;
  data: string;
  descricao: string;
  local: string;
  tarefas: string[];
  mutiraoStatus: string;
  mutiraoTipo: string;
  criadoPor: { _id: string; nome: string };
  imagemCapa: string;
  inscritos?: string[];
};
// Mock data - Simulação do banco de dados
export const mockMutiroes = [
  {
    id: 1,
    title: "Reforma da Biblioteca",
    date: "28/03/2024",
    description:
      "Com a ajuda de voluntários, reformamos a biblioteca da comunidade, organizamos os livros e criamos um espaço mais acolhedor para crianças e jovens. Educação para todos!",
    author: "Rafael Lima",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    horario: "09:00",
    local: "Biblioteca Municipal",
    materiais: "Tintas, pincéis, prateleiras novas, material de limpeza",
    tarefas: [
      "Pintura das paredes",
      "Organização dos livros",
      "Montagem das prateleiras",
      "Limpeza geral",
    ],
    tipo: "reforma",
    participantes: 25,
  },
  {
    id: 2,
    title: "Entrega de Flores",
    date: "08/03/2024",
    description:
      "Em comemoração ao Dia Internacional da Mulher, reunimos voluntários para distribuir flores e mensagens inspiradoras às mulheres da comunidade. Um pequeno gesto para reconhecer grandes conquistas!",
    author: "Ana Maria",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    horario: "10:00",
    local: "Praça Central",
    materiais: "Flores, cartões, fitas decorativas",
    tarefas: [
      "Montagem dos arranjos",
      "Escrita das mensagens",
      "Distribuição das flores",
    ],
    tipo: "evento",
    participantes: 15,
  },
  {
    id: 3,
    title: "Reflorestamento do Parque Verde",
    date: "18/02/2024",
    description:
      "Juntos, plantamos mais de 200 mudas de árvores para recuperar uma área degradada do Parque Verde. Nosso objetivo é criar um espaço mais sustentável e agradável para todos!",
    author: "Carlos Mendes",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    horario: "08:00",
    local: "Parque Verde - Entrada Principal",
    materiais: "Mudas, pás, regadores, adubo",
    tarefas: [
      "Preparação do solo",
      "Plantio das mudas",
      "Irrigação",
      "Colocação das placas informativas",
    ],
    tipo: "plantio",
    participantes: 40,
  },
];

// Adicionar os tipos de mutirão conforme MUTIRAO_TIPOS (com 'Todos os Tipos' funcional)
const tiposMutirao = [
  { value: "", label: "Todos os Tipos" },
  { value: "SOCIAL", label: "Social" },
  { value: "CONSTRUCAO_REFORMA", label: "Construção / Reforma" },
  { value: "AMBIENTAL_AGRICOLA", label: "Ambiental / Agrícola" },
  { value: "CULTURA_EDUCACAO", label: "Cultura / Educação" },
  { value: "SAUDE", label: "Saúde" },
  { value: "TECNOLOGIA", label: "Tecnologia" },
];

const User = () => {
  const { usuario, allMutiroes } = useLoaderData() as {
    usuario: Usuario;
    allMutiroes: Mutirao[];
  };

  const [date, setDate] = useState(new Date());
  const [filtro, setFiltro] = useState<"meus" | "todos">("meus");
  const [tipoSelecionado, setTipoSelecionado] = useState("");

  // Filtra os mutirões criados pelo usuário ou que ele está inscrito
  const meusMutiroes = allMutiroes
    ? allMutiroes.filter((mutirao) => {
        if (!usuario || !usuario._id) return false;
        const criadoPorMim = mutirao.criadoPor?._id === usuario._id;
        const estouInscrito =
          Array.isArray(mutirao.inscritos) &&
          mutirao.inscritos.includes(usuario._id);
        return criadoPorMim || estouInscrito;
      })
    : [];

  const displayedMutiroes = filtro === "meus" ? meusMutiroes : allMutiroes;

  // Novo filtro por tipo
  const mutiroesFiltradosPorTipo = displayedMutiroes.filter((mutirao) =>
    tipoSelecionado === "" ? true : mutirao.mutiraoTipo === tipoSelecionado
  );

  // Próximos mutirões: data futura e usuário inscrito ou criador
  const hoje = new Date();
  const proximosMutiroes = allMutiroes
    .filter((mutirao) => {
      const dataMutirao = new Date(mutirao.data);
      const isFuturo = dataMutirao >= hoje;
      const criadoPorMim = mutirao.criadoPor._id === usuario._id;
      const estouInscrito =
        Array.isArray(mutirao.inscritos) &&
        mutirao.inscritos.includes(usuario._id);
      return isFuturo && (criadoPorMim || estouInscrito);
    })
    .map((mutirao) => ({ titulo: mutirao.titulo, data: mutirao.data }));

  // Elemento de filtros para passar para MutiroesList
  const filtrosElement = (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div
        style={{
          display: "flex",
          background: "#e5e7eb",
          borderRadius: 9999,
          padding: 2,
          boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
          transition: "background 0.3s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <button
          onClick={() => setFiltro("meus")}
          style={{
            padding: "8px 20px",
            borderRadius: 9999,
            border: "none",
            background: filtro === "meus" ? "#f97316" : "transparent",
            color: filtro === "meus" ? "#fff" : "#1e293b",
            fontWeight: filtro === "meus" ? 700 : 400,
            cursor: "pointer",
            transition:
              "background 0.35s cubic-bezier(.4,0,.2,1), color 0.25s cubic-bezier(.4,0,.2,1), box-shadow 0.35s cubic-bezier(.4,0,.2,1)",
            boxShadow:
              filtro === "meus" ? "0 2px 8px rgba(249,115,22,0.10)" : "none",
          }}
        >
          Meus mutirões
        </button>
        <button
          onClick={() => setFiltro("todos")}
          style={{
            padding: "8px 20px",
            borderRadius: 9999,
            border: "none",
            background: filtro === "todos" ? "#f97316" : "transparent",
            color: filtro === "todos" ? "#fff" : "#1e293b",
            fontWeight: filtro === "todos" ? 700 : 400,
            cursor: "pointer",
            transition:
              "background 0.35s cubic-bezier(.4,0,.2,1), color 0.25s cubic-bezier(.4,0,.2,1), box-shadow 0.35s cubic-bezier(.4,0,.2,1)",
            boxShadow:
              filtro === "todos" ? "0 2px 8px rgba(249,115,22,0.10)" : "none",
          }}
        >
          Todos
        </button>
      </div>
      <select
        value={tipoSelecionado}
        onChange={(e) => setTipoSelecionado(e.target.value)}
        style={{ marginLeft: 8, padding: 8, borderRadius: 6 }}
      >
        {tiposMutirao.map((tipo) => (
          <option key={tipo.value} value={tipo.value}>
            {tipo.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <Wrapper>
      <div className="min-h-screen">
        {/*<NavBar />*/}
        <main>
          <UserProfile user={usuario} />
          <div className="content-grid">
            <UserSidebar
              date={date}
              onDateChange={setDate}
              interesses={["Saúde", "TI"]}
              proximosMutiroes={proximosMutiroes}
            />
            <MutiroesList
              mutiroes={mutiroesFiltradosPorTipo}
              filtrosElement={filtrosElement}
            />
          </div>
        </main>
      </div>
    </Wrapper>
  );
};

export default User;
