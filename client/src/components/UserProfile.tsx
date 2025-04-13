import { Link } from "react-router-dom";

interface UserProfileProps {
  user: {
    name: string;
    username: string;
  };
}

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div className="profile-header">
      <div className="profile-info">
        <img 
          src="https://i.pravatar.cc/150?img=11" 
          alt="Foto de perfil" 
          className="profile-image"
        />
        <div className="welcome-text">
          <h1>Bem vindo, {user.name}! 👋</h1>
          <p>
            Comece criando um mutirão ou encontre um para se voluntariar. Juntos, podemos transformar o mundo!
          </p>
        </div>
      </div>
      <Link 
        to="/novo-mutirao"
        className="new-mutirao-btn"
      >
        <span>+</span>
        Novo Mutirão
      </Link>
    </div>
  );
};

export default UserProfile; 