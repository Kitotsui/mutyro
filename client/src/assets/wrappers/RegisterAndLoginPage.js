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
  }
  h4 {
    font-size: 56px;
    font-weight: 500;
    text-align: left;
    margin-bottom: 1.38rem;
  }
  span {
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    color: var(--dark-color);
  }

  input::placeholder {
    color: var(--grey-600);
    font-weight: 600;
    opacity: 1;
  }

  .btn {
    display: block;
    margin: 10px auto;
    width: 100%;
    text-align: center;
  }
  .member-btn {
    color: var(--primary-300);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }

  .link-esqueci {
    color: var(--grey-500);
    font-weight: 600;
    display: block;
    padding: 15px 0;
  }
`;
export default Wrapper;
