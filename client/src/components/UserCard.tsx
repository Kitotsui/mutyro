const UserCard = ({ nome, email, cpf }: { nome: string, email: string, cpf: string }) => {
    return (
      <div className="user-card">
        <h2>Informações do Usuário</h2>
        <p><strong>Nome:</strong> {nome}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>CPF:</strong> {cpf}</p>
      </div>
    );
  };
  
  export default UserCard;
  