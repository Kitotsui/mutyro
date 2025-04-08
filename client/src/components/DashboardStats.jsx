const stats = [
    { label: "Mutirões Criados", value: 4 },
    { label: "Confirmados", value: 2 },
    { label: "Participações", value: 5 },
  ];
  
  const DashboardStats = () => {
    return (
      <div className="dashboard-stats">
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <h3>{s.value}</h3>
            <p>{s.label}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default DashboardStats;
  