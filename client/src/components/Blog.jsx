import styled from "styled-components";
import logo from "../assets/images/mutyroinnerlogotextless.png";

const Wrapper = styled.div`
  padding: 0 1rem;

  .filter-nav-btn {
    width: 50px;
    height: 50px;
    background: #ff9c39; /* Change to match your design */
    color: white;
    border: none;
    border-radius: 50%; /* Makes it a perfect circle */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem; /* Adjust icon size */
    cursor: pointer;
    transition: 0.3s ease;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  }

  .filter-nav-btn:hover {
    background: darkred; /* Slightly darker on hover */
  }

  .filter-nav-btn i {
    pointer-events: none; /* Ensures the icon doesn't interfere with clicks */
  }

  span {
    font-weight: 700;
    color: #ff9c39;
    line-height: 2rem;
  }

  ul {
    justify-content: space-evenly;
    display: grid;
    grid-auto-flow: column;
    gap: 5rem;
    align-items: center;
    overflow: hidden;
  }

  li {
    position: relative;
    text-align: center;
    padding-bottom: 10px;
  }

  @media (max-width: 950px) {
    ul {
      gap: 2rem;
    }

    li:nth-child(n + 7):not(:last-child) {
      display: none;
    }
  }

  @media (max-width: 767px) {
    li:nth-child(n + 5):not(:last-child) {
      display: none;
    }
  }

  /* BLOG CARDS */
  .blog-heading {
    display: flex;
    align-items: center;
    gap: 3rem;
    padding: 3rem 2rem;
    margin-bottom: 15rem;
  }

  .blog-heading img {
    max-height: 50px;
    width: auto;
  }
  .blog-heading h2 {
    font-size: 36px;
    font-weight: 500;
    color: var(--dark-color);
  }
`;

const Blog = () => {
  return (
    <Wrapper>
      {/* TO DO: SEPARAR AS SESSÕES ABAIXO EM COMPONENTES SEPARADOS */}
      {/* FILTER NAV */}
      <div>
        <ul>
          <li>
            <i className="fas fa-chevron-left"></i>
          </li>
          <li>
            <button className="filter-nav-btn">
              <i className="fas fa-heartbeat"></i>
            </button>
            <span>Saúde</span>
          </li>
          <li>|</li>
          <li>
            <button className="filter-nav-btn">
              <i className="fas fa-heartbeat"></i>
            </button>
            <span>Saúde</span>
          </li>
          <li>|</li>
          <li>
            <button className="filter-nav-btn">
              <i className="fas fa-heartbeat"></i>
            </button>
            <span>Saúde</span>
          </li>
          <li>|</li>
          <li>
            <button className="filter-nav-btn">
              <i className="fas fa-heartbeat"></i>
            </button>
            <span>Saúde</span>
          </li>
          <li>
            <i className="fas fa-chevron-right"></i>
          </li>
        </ul>
      </div>

      {/* BLOG CARDS */}
      <div className="blog-heading">
        <img src={logo} alt="Blog Heading Logo" />
        <h2>Mutirões Ativos</h2>
      </div>
    </Wrapper>
  );
};
export default Blog;
