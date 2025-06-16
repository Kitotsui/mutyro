import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/MutiroesList";

import getImageUrl from "../utils/imageUrlHelper";

interface Mutirao {
  _id: string;
  titulo: string;
  data: string;
  descricao: string;
  imagemCapa: string;
  criadoPor?: { nome: string } | string;
}

interface MutiroesListProps {
  mutiroes: Mutirao[];
  filtrosElement?: React.ReactNode;
}

const MutiroesList = ({ mutiroes, filtrosElement }: MutiroesListProps) => {
  return (
    <Wrapper>
      <div
        className="mutiroes-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h2 style={{ margin: 0 }}>Últimos Mutirões</h2>
        {filtrosElement}
      </div>
      <div className="mutiroes-grid">
        {mutiroes.map((mutirao) => (
          <Link
            to={`/mutirao/${mutirao._id}`}
            key={mutirao._id}
            className="mutirao-card"
          >
            {mutirao.imagemCapa && (
              <img
                src={getImageUrl(mutirao.imagemCapa)}
                alt={mutirao.titulo}
                className="mutirao-image"
              />
            )}
            <div className="mutirao-info">
              <h3>{mutirao.titulo}</h3>
              <p className="date">{mutirao.data}</p>
              <p className="description">{mutirao.descricao}</p>
              {mutirao.criadoPor && (
                <p className="author">
                  Por{" "}
                  {typeof mutirao.criadoPor === "string"
                    ? mutirao.criadoPor
                    : mutirao.criadoPor.nome}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </Wrapper>
  );
};

export default MutiroesList;
