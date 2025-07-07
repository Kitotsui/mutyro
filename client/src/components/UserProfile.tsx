import getImageUrl from "@/utils/imageUrlHelper";
import { Link } from "react-router-dom";

interface UserProfileProps {
  user: {
    nome: string;
    avatar: string;
    //username: string;
  };
}

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div className="profile-header" style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div className="profile-info" style={{ gap: "1.5rem" }}>
          <img
            src={getImageUrl(user?.avatar)}
            alt="Foto de perfil"
            className="profile-image"
          />
          <div className="welcome-text">
            <h1>
              Bem vindo, {user.nome}!{" "}
              <span role="img" aria-label="mão acenando">
                👋
              </span>
            </h1>
            <p>
              Comece criando um mutirão ou encontre um para se voluntariar.
              <br />
              Juntos, podemos transformar o mundo!
            </p>
          </div>
          <Link
            to="/novo-mutirao"
            className="btn new-mutirao-btn"
            style={{
              fontSize: "1.1rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0.75rem 2rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
            }}
          >
            <span
              style={{ fontSize: "1.5rem", marginRight: 4, fontWeight: 700 }}
            >
              +
            </span>
            Novo Mutirão
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
