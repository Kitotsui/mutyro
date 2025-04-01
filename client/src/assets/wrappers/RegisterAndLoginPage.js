import styled from "styled-components";

const Wrapper = styled.section`
  min-height: fit-content;
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    margin: 0 auto;
    max-height: fit-content;
    max-width: 400px;
    border-top: 5px solid var(--primary-300);
  }
  h4 {
    text-align: center;
    margin-bottom: 1.38rem;
  }
  p {
    text-align: center;
    line-height: 1rem;
    color: var(--dark-color);
    margin: 0 auto;
  }
  .btn {
    margin-top: 1rem;
  }

  .btn-link {
    display: block;
    margin-top: 1rem;
    width: 100%;
    text-align: center;
  }
  .member-btn {
    color: var(--primary-300);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }
`;
export default Wrapper;
