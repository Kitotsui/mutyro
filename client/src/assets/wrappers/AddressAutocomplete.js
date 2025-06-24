import styled from "styled-components";

const Wrapper = styled.div`
  position: relative; /* For positioning the suggestions list */
  width: 100%; /* Default to full width, can be overridden by parent if needed */

  /* Styles for the input field within this component */
  input[type="text"] {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--grey-200, #ccc); /* Use your theme variables */
    border-radius: 0.5rem; /* Use your theme variables */
    background: var(--white, #fff);
    font-size: 0.9rem;
    box-sizing: border-box;

    &:focus {
      border-color: var(--primary-500, #007bff); /* Use your theme variables */
      outline: none;
    }

    &::placeholder {
      color: var(--grey-400, #aaa); /* Use your theme variables */
    }
  }

  /* Styles for the dropdown list of suggestions */
  .suggestions-list {
    list-style-type: none;
    padding: 0;
    margin: 2px 0 0 0; /* Small space below input, reset other margins */
    border: 1px solid var(--grey-300, #ccc);
    border-radius: 0.5rem;
    position: absolute;
    background-color: var(--white, #fff);
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000; /* Ensure it's above other elements on the same level */
    box-shadow: var(--shadow-1, 0 1px 3px rgba(0, 0, 0, 0.1));
  }

  .suggestions-list li {
    padding: 0.75rem;
    cursor: pointer;
    font-size: 0.9rem;
    color: var(--text-color, #333);
    border-bottom: 1px solid var(--grey-100, #f0f0f0);

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: var(--grey-50, #f8f9fa);
    }
  }

  .loading-indicator {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
    color: var(--grey-500, #6c757d);
    font-style: italic;
  }
`;

export default Wrapper;
