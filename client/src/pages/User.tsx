import Wrapper from "../assets/wrappers/UserPage";
import UserProfile from "../components/UserProfile";
import UserSidebar from "../components/UserSidebar";
import MutiroesList from "../components/MutiroesList";
import { useState } from "react";
import SmoothToggle from "../components/SmoothToggle";
import CustomDropdown from "../components/CustomDropdown";

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
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <SmoothToggle
        options={[
          { label: "Meus mutirões", value: "meus" },
          { label: "Todos", value: "todos" },
        ]}
        value={filtro}
        onChange={(v) => setFiltro(v as "meus" | "todos")}
      />
      <CustomDropdown
        options={tiposMutirao}
        value={tipoSelecionado}
        onChange={setTipoSelecionado}
      />
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
