import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/MutiroesList";

interface Mutirao {
  _id: string;
  titulo: string;
  data: string;
  descricao: string;
  imagemCapa: string;
}

interface MutiroesListProps {
  mutiroes: Mutirao[];
}

const MutiroesList = ({ mutiroes }: MutiroesListProps) => {
  return (
    <Wrapper>
      <div className="mutiroes-container">
        <h2>Últimos Mutirões</h2>
        <div className="mutiroes-grid">
          {mutiroes.map((mutirao) => (
            <Link
              to={`/mutirao/${mutirao._id}`}
              key={mutirao._id}
              className="mutirao-card"
            >
              {mutirao.imagemCapa && (
                <img
                  src={`http://localhost:5100${mutirao.imagemCapa}`}
                  alt={mutirao.titulo}
                  className="mutirao-image"
                />
              )}
              <div className="mutirao-info">
                <h3>{mutirao.titulo}</h3>
                <p className="date">{mutirao.data}</p>
                <p className="description">{mutirao.descricao}</p>
                {/*<p className="author">Por {mutirao.author}</p>*/}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default MutiroesList;
