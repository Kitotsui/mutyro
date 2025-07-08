import { useState } from "react";
import Wrapper from "../assets/wrappers/UserPage";
import { UserProfile } from "../components";
import UserSidebar from "../components/UserSidebar";
import MutiroesList from "../components/MutiroesList";
import SmoothToggle from "../components/SmoothToggle";
import CustomDropdown from "../components/CustomDropdown";

import { redirect, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";

type Usuario = {
  _id: string;
  nome: string;
  email: string;
  avatar?: string;
  isAdmin?: boolean;
};

type Mutirao = {
  _id: string;
  titulo: string;
  descricao: string;
  data: string;
  horario: string;
  local: string;
  criadoPor: {
    _id: string;
    nome: string;
  };
  inscritos: string[];
  finalizado: boolean;
  imagemCapa?: string;
};

//loader pega as informacoes antes renderizar o componente
export const loader = async () => {
  try {
    const [userResponse, mutiroesResponse] = await Promise.all([
      customFetch.get("/usuarios/atual-usuario"),
      customFetch.get("/mutiroes/todos")
    ]);
    
    return { 
      user: userResponse.data.usuario,
      mutiroes: mutiroesResponse.data.mutiroes || []
    };
  } catch {
    return redirect("/"); //se a atenticacao falhar, redireciona para a pagina inicial
  }
};

const User = () => {
  const { user, mutiroes } = useLoaderData() as { user: Usuario; mutiroes: Mutirao[] };
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filtro, setFiltro] = useState<"meus" | "todos">("meus");
  const [tipoSelecionado, setTipoSelecionado] = useState("");

  // Filtra os mutirões criados pelo usuário ou que ele está inscrito
  const mutiroesFiltrados = mutiroes.filter((mutirao) => {
    if (filtro === "meus") {
      return mutirao.criadoPor._id === user._id || mutirao.inscritos.includes(user._id);
    }
    return true;
  });

  const interesses = ["Voluntariado", "Meio Ambiente", "Educação", "Saúde"];

  // Todos os mutirões futuros para o calendário
  const proximosMutiroesParaCalendario = mutiroesFiltrados
    .filter((mutirao) => !mutirao.finalizado)
    .map((mutirao) => ({
      titulo: mutirao.titulo,
      data: mutirao.data.split('T')[0],
    }));

  const filtrosElement = (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <SmoothToggle
        options={[
          { value: "meus", label: "Meus Mutirões" },
          { value: "todos", label: "Todos os Mutirões" },
        ]}
        value={filtro}
        onChange={(value) => setFiltro(value as "meus" | "todos")}
      />
      <CustomDropdown
        options={[
          { value: "", label: "Todos os tipos" },
          { value: "SOCIAL", label: "Social" },
          { value: "SAUDE", label: "Saúde" },
          { value: "CONSTRUCAO_REFORMA", label: "Construção/Reforma" },
          { value: "AMBIENTAL_AGRICOLA", label: "Ambiental/Agrícola" },
          { value: "CULTURA_EDUCACAO", label: "Cultura/Educação" },
          { value: "TECNOLOGIA", label: "Tecnologia" },
        ]}
        value={tipoSelecionado}
        onChange={setTipoSelecionado}
      />
    </div>
  );

  return (
    <Wrapper>
      <div className="min-h-screen">
        <main>
          <UserProfile user={user} />
          <div className="content-grid">
            <UserSidebar
              date={selectedDate}
              onDateChange={setSelectedDate}
              interesses={interesses}
              proximosMutiroes={proximosMutiroesParaCalendario}
            />
            <MutiroesList mutiroes={mutiroesFiltrados} filtrosElement={filtrosElement} />
          </div>
        </main>
      </div>
    </Wrapper>
  );
};

export default User;
