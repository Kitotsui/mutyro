import Wrapper from "../assets/wrappers/UserPage";
import { NavBar } from "../components";
import UserProfile from "../components/UserProfile";
import UserSidebar from "../components/UserSidebar";
import MutiroesList from "../components/MutiroesList";
import { useState } from "react";

import { Outlet, redirect, useLoaderData } from "react-router-dom";
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
  } catch (error) {
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
  criadoPor: string;
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

const User = () => {
  const { usuario, allMutiroes } = useLoaderData() as {
    usuario: Usuario;
    allMutiroes: Mutirao[];
  };

  const [date, setDate] = useState(new Date());

  /*const mockUser = {
    name: "João",
    username: "joao123"
  };*/

  const [showOnlyUserMutiroes, setShowOnlyUserMutiroes] = useState(true);

  const handleToggleChange = () => {
    setShowOnlyUserMutiroes((prevState) => !prevState);
  };

  const filteredList = allMutiroes
    ? allMutiroes.filter((mutirao) => {
        if (!usuario || !usuario._id) {
          return false;
        }
        return mutirao.criadoPor === usuario._id;
      })
    : [];

  const displayedMutiroes = allMutiroes
    ? showOnlyUserMutiroes
      ? filteredList
      : allMutiroes
    : [];

  return (
    <Wrapper>
      <div className="min-h-screen">
        {/*<NavBar />*/}
        <main>
          <UserProfile user={usuario} />
          <div style={{ padding: "1rem", textAlign: "center" }}>
            {" "}
            <label>
              <input
                type="checkbox"
                checked={showOnlyUserMutiroes}
                onChange={handleToggleChange}
              />
              Mostrar apenas meus mutirões
            </label>
          </div>

          <div className="content-grid">
            <UserSidebar
              date={date}
              onDateChange={setDate}
              interesses={["Saúde", "TI"]}
            />
            <MutiroesList mutiroes={displayedMutiroes} />
          </div>
        </main>
      </div>
    </Wrapper>
  );
};

export default User;
