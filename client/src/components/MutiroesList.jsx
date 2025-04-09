const mutiroes = [
    {
      titulo: "Reforma da Biblioteca",
      data: "Mar 28, 2024",
      descricao: "Com a ajuda de voluntários...",
      autor: "Rafael Lima",
      img: "https://via.placeholder.com/150",
    },
    {
      titulo: "Entrega de Flores",
      data: "Mar 8, 2025",
      descricao: "Em comemoração ao Dia Internacional da Mulher...",
      autor: "Ana Maria",
      img: "https://via.placeholder.com/150",
    },
  ];
  
  const MutiroesList = () => {
    return (
      <div className="mutiroes-list">
        {mutiroes.map((m, i) => (
          <div className="mutirao" key={i}>
            <img src={m.img} alt={m.titulo} />
            <div>
              <h5>{m.titulo}</h5>
              <small>{m.data}</small>
              <p>{m.descricao}</p>
              <em>Por {m.autor}</em>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default MutiroesList;
  