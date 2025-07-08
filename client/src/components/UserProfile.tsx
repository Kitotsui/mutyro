import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface UserProfileProps {
  user: {
    nome: string;
    //username: string;
  };
}

const UserProfile = ({ user }: UserProfileProps) => {
  const { t } = useTranslation();

  return (
    <div className="profile-header" style={{width: '100%'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
        <div className="profile-info" style={{gap: '1.5rem'}}>
          <img
            src="https://i.pravatar.cc/150?img=11"
            alt="Foto de perfil"
            className="profile-image"
          />
          <div className="welcome-text">
            <h1>{t('usuario.bemVindo', { nome: user.nome })}</h1>
            <p>
              {t('usuario.descricao')}
            </p>
          </div>
        </div>
        <Link to="/novo-mutirao" className="new-mutirao-btn" style={{fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, padding: '0.75rem 2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.07)'}}>
          <span style={{fontSize: '1.5rem', marginRight: 4, fontWeight: 700}}>+</span>
          {t('mutiroes.novoMutirao')}
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
