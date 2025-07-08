import { useState } from "react";
import Wrapper from "../assets/wrappers/UserPage";
import { UserProfile } from "../components";
import UserSidebar from "../components/UserSidebar";
import MutiroesList from "../components/MutiroesList";
import SmoothToggle from "../components/SmoothToggle";
import CustomDropdown from "../components/CustomDropdown";
import { useTranslation } from "react-i18next";

import { redirect, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";

type Usuario = {
  _id: string;
  nome: string;
  avatar: string;
  //username: string;
};

interface Mutirao {
  _id: string;
  titulo: string;
  data: string;
  descricao: string;
  imagemCapa: string;
  criadoPor: { _id: string; nome: string };
  inscritos: string[];
  mutiraoTipo: string;
  finalizado?: boolean;
}

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
  const { t } = useTranslation();

  // Filtra os mutirões baseado no filtro selecionado
  const mutiroesFiltrados = mutiroes.filter((mutirao) => {
    if (filtro === "meus") {
      return mutirao.criadoPor._id === user._id || mutirao.inscritos.includes(user._id);
    }
    return true;
  });

  // Filtra por tipo e status
  const mutiroesFiltradosPorTipo = mutiroesFiltrados.filter((mutirao) => {
    if (tipoSelecionado === "ENCERRADOS") {
      return mutirao.finalizado === true; // Mostra apenas finalizados
    }
    if (tipoSelecionado === "") {
      return mutirao.finalizado === false; // Exclui finalizados para outros filtros
    }
    return mutirao.mutiraoTipo === tipoSelecionado && mutirao.finalizado === false;
  });

  // Próximos mutirões: data futura e usuário inscrito ou criador
  const hoje = new Date();
  const proximosMutiroes = mutiroes
    .filter((mutirao) => {
      const dataMutirao = new Date(mutirao.data);
      const isFuturo = dataMutirao >= hoje;
      const criadoPorMim = mutirao.criadoPor._id === user._id;
      const estouInscrito =
        Array.isArray(mutirao.inscritos) &&
        mutirao.inscritos.includes(user._id);
      return isFuturo && (criadoPorMim || estouInscrito);
    })
    .map((mutirao) => ({ titulo: mutirao.titulo, data: mutirao.data }));

  // Elemento de filtros para passar para MutiroesList
  const filtrosElement = (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <SmoothToggle
        options={[
          { value: "meus", label: t('user.filtroMeusMutiroes') },
          { value: "todos", label: t('user.filtroTodosMutiroes') },
        ]}
        value={filtro}
        onChange={(value) => setFiltro(value as "meus" | "todos")}
      />
      <CustomDropdown
        options={[
          { value: "", label: t('user.filtroTodosTipos') },
          { value: "SOCIAL", label: t('user.tipoSocial') },
          { value: "SAUDE", label: t('user.tipoSaude') },
          { value: "CONSTRUCAO_REFORMA", label: t('user.tipoConstrucaoReforma') },
          { value: "AMBIENTAL_AGRICOLA", label: t('user.tipoAmbientalAgricola') },
          { value: "CULTURA_EDUCACAO", label: t('user.tipoCulturaEducacao') },
          { value: "TECNOLOGIA", label: t('user.tipoTecnologia') },
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
              interesses={[]}
              proximosMutiroes={proximosMutiroes}
            />
            <MutiroesList mutiroes={mutiroesFiltradosPorTipo} filtrosElement={filtrosElement} />
          </div>
        </main>
      </div>
    </Wrapper>
  );
};

export default User;
