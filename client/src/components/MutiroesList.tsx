import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/MutiroesList";
import getImageUrl from "../utils/imageUrlHelper";
import { useTranslation } from "react-i18next";

interface MutiroesListProps {
  mutiroes: Array<{
    _id: string;
    titulo: string;
    descricao: string;
    data: string;
    imagemCapa?: string;
    criadoPor?: string | { nome: string };
    finalizado?: boolean;
  }>;
  filtrosElement?: React.ReactNode;
}

const MutiroesList = ({ mutiroes, filtrosElement }: MutiroesListProps) => {
  const { t } = useTranslation();

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
        <h2 style={{ margin: 0 }}>{t('mutiroes.titulo')}</h2>
        {filtrosElement}
      </div>
      <div className="mutiroes-grid">
        {mutiroes.map((mutirao) => (
          <Link
            to={`/mutirao/${mutirao._id}`}
            key={mutirao._id}
            className={`mutirao-card ${mutirao.finalizado ? "finalizado" : ""}`}
          >
            {mutirao.imagemCapa && (
              <img
                src={getImageUrl(mutirao.imagemCapa)}
                alt={mutirao.titulo}
                className="mutirao-card"
              />
            )}
            <div className="mutirao-info">
              <h3>{mutirao.titulo}</h3>
              <p className="date">{mutirao.data}</p>
              <p className="description">{mutirao.descricao}</p>
              {mutirao.criadoPor && (
                <p className="author">
                  {t('geral.por')}{" "}
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
