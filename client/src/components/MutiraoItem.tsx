const MutiraoItem = ({ titulo, data, status }: { titulo: string, data: string, status: string }) => {
    return (
      <div className="mutirao-item">
        <h4>{titulo}</h4>
        <p>Data: {data}</p>
        <p>Status: {status}</p>
      </div>
    );
  };
  
  export default MutiraoItem;
  