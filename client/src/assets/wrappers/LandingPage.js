import styled from "styled-components";

const Wrapper = styled.section`
  .page {
    min-height: calc(100vh - var(--nav-height));
    /* display: grid; */
    align-items: center;
    margin-top: -3rem;
    /*  */
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding-top: var(--nav-height);
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
    margin-bottom: 1.5rem;
  }
  p {
    line-height: 2;
    color: var(--dark-color);
    margin-bottom: 1.5rem;
    max-width: 35em;
  }
  .register-link {
    margin-right: 1rem;
  }
  .main-img {
    display: none;
  }

  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 400px;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;
export default Wrapper;
