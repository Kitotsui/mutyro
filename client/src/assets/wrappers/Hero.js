import styled from "styled-components";

const Wrapper = styled.div`
  .hero {
    position: relative;
    height: 80vh;
    /* width: 100%; */
    /* padding: 11.5rem 2rem 8rem; */
    color: white;
    overflow-x: hidden;
    background-image: url("../src/assets/images/community.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    /* padding: 2rem 0; */
    /*  */
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 5rem;
    max-width: var(--max-width);
    margin-bottom: 0;
  }

  .hero-content {
    align-items: center;
    gap: 1.5rem;
  }

  .hero-cta {
    position: relative;
    display: flex;
    max-width: var(--max-width);
    flex-direction: row;
    gap: 1rem;
  }

  .hero-text {
    display: flex;
    flex-direction: column; /* Stack items */
    align-items: flex-start; /* Align text & buttons to the left */
  }

  p {
    font-family: Montserrat;
    font-weight: 500;
    color: var(--dark-color);
    padding-right: 3rem;
    font-style: italic;
    position: absolute;
    z-index: 1;
    right: 0;
    max-width: 100%;
  }

  .hero::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: rgba(
      255,
      210,
      149,
      0.6
    ); /* Adjust opacity here (0 = transparent, 1 = solid) */
  }

  .hero h1 {
    line-height: 3rem;
    font-size: 8.5rem;
    color: orange;
    text-shadow: 6px 1px rgba(0, 153, 255, 1);
    z-index: 1;
    font-family: "Bebas Neue";
  }
  .hero h2 {
    line-height: 4rem;
    font-size: 2.5rem;
    color: white;
    text-shadow: 6px 1px rgba(0, 153, 255, 1);
    z-index: 1;
    font-family: "Bebas Neue";
  }
  .hero .wave {
    position: absolute; /* Position the SVG at the bottom */
    bottom: 0; /* Align to the bottom of the parent */
    left: 0;
    max-width: var(--max-width);
    transform: scaleY(0.6) translateY(150px);
  }

  .btn {
    font-weight: 600;
    font-size: 14px;
    color: white;
    width: 6rem;
    padding: 0.8rem;
    text-align: center;
    margin: 0 auto;
  }

  .login-link {
    color: var(--dark-color);
    background-color: var(--light-color);
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    transform: translateY(0);
    background: rgba(0, 0, 0, 0.5); /* Dark overlay */
    backdrop-filter: blur(5px); /* Blur effect */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background: white;
    border-radius: 8px;
    box-shadow: var(--shadow-2);
    position: relative;
    text-align: center;
    transform: translateY(0);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 0;
  }

  @media (max-width: 1300px) {
    p {
      width: 30vw;
      padding-left: 2rem;
      margin-left: 2rem;
    }
  }

  @media (max-width: 768px) {
    p {
      max-width: var(--max-width);
      font-size: 0.9rem;
      text-align: center;
      padding: 0 auto;
      margin: 5rem auto;
    }

    .hero-content {
      display: flex;
      flex-direction: column; /* Switch to column on smaller screens */
      text-align: left; /* Center text */
      gap: 1rem; /* Reduce spacing */
    }

    .hero-cta {
      flex-direction: row;
      gap: 1rem;
      padding-bottom: 3rem;
    }

    .hero {
      flex-direction: column;
      text-align: center;
      justify-content: center;
      padding: var(--nav-height) 2rem 4rem;
    }

    .hero h1 {
      font-size: 5.8rem;
    }
    .hero h2 {
      font-size: 1.8rem;
    }
  }
`;

export default Wrapper;
