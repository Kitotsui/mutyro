import { useTranslation } from "react-i18next";

const UserCard = ({ nome, email, cpf }: { nome: string, email: string, cpf: string }) => {
  const { t } = useTranslation();
  
  return (
    <div className="user-card">
      <h2>{t('geral.informacoesUsuario')}</h2>
      <p><strong>{t('usuario.nome')}:</strong> {nome}</p>
      <p><strong>{t('usuario.email')}:</strong> {email}</p>
      <p><strong>{t('usuario.cpf')}:</strong> {cpf}</p>
    </div>
  );
};

export default UserCard;
  