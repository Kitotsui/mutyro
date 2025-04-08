import styled from "styled-components";

const Wrapper = styled.section`
  .main-content {
    display: flex;
    gap: 2rem;
    padding: 2rem;
    background-color: #f5f7fa;
    align-items: flex-start;
  }

  .left-panel {
    width: 30%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .right-panel {
    width: 50%;
    display: flex;
    flex-direction: column;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .header h2 {
    margin: 100px;
    font-size: 1.5rem;
    color: #333;
  }

  .btn {
    background-color: #FF9100;
    color: white;
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s;
  }

  .btn:hover {
    background-color: #EF561D;
  }

  /* ProfileCard */
  .profile-card {
    background-color: #ffffff;
    padding: 5.5rem;
    margin-top: 5rem;
    text-align: center;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  }

  .profile-img {
    border-radius: 50%;
    width: 110px;
    height: 110px;
    object-fit: cover;
    background-color: #fff;
    margin-bottom: 1rem;
  }

  /* CalendarSection */
 /* CalendarSection */
.calendar-section {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  width: 100%;  /* Agora o calendário vai ocupar a largura do seu container pai */
  max-width: 400px;  /* Limita a largura máxima para o calendário */
  margin: 0 auto;  /* Centraliza o calendário no seu container */
}


/* Estilos para o calendário */
.calendar-section h4 {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  color: #333;
}

.calendar-wrapper {
  background-color: var(--light-color);
  border-radius: 8px;
  width: 100%;
  max-width: 350px; /* Ou ajuste conforme seu layout */
  height: auto; /* Remove altura fixa */
  flex-shrink: 0;
  margin: 0 auto; /* Centraliza */
}


.react-calendar {
  width: 100%;
  height: 100%;
  border: none;
  display: flex;
  flex-direction: column;
  background: transparent;
  font-family: inherit;
}

.react-calendar__navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.react-calendar__month-view__weekdays {
  font-size: 0.9rem;
  color: #333;
}

.react-calendar__month-view__days {
  display: flex;
  flex-wrap: wrap;
}

.react-calendar__tile {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 5px;
  cursor: pointer;
}

.react-calendar__tile--active {
  background-color: #007bff;
  color: white;
}

.react-calendar__tile--now {
  background-color: #e0e0e0;
}


  .mutiroes {
    margin-top: 1rem;
    background-color: #f8f9fa;
    padding: 1rem;
    border-radius: 6px;
    border: 1px solid #ddd;
  }

  /* InterestsBox */
  .interests-box {
    background-color: #ffffff;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  }

  .interests-box h4 {
    margin-bottom: 1rem;
    color: #333;
  }

  .tag {
    display: inline-block;
    background-color: #007aff;
    color: white;
    padding: 0.4rem 0.9rem;
    border-radius: 20px;
    font-size: 0.875rem;
    margin: 0.3rem 0.5rem 0 0;
  }

  /* Mutirões */
  .mutiroes-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .mutirao {
    display: flex;
    background-color: #ffffff;
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.08);
    gap: 1rem;
    align-items: flex-start;
  }

  .mutirao img {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    object-fit: cover;
  }

  .mutirao h5 {
    margin: 0;
    font-size: 1.2rem;
    color: #333;
  }

  .mutirao small {
    color: #777;
    display: block;
    margin: 0.3rem 0;
  }

  .mutirao p {
    margin: 0.5rem 0;
    color: #444;
  }

  .mutirao em {
    font-style: italic;
    color: #555;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    .main-content {
      flex-direction: column;
    }

    .left-panel,
    .right-panel {
      width: 100%;
    }
  }
    .dashboard-stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.stat-card {
  flex: 1;
  min-width: 150px;
  background: #ffffff;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.stat-card h3 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #007aff;
}

.stat-card p {
  color: #555;
}

`;

export default Wrapper;
