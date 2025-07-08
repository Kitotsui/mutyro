import styled from "styled-components";

const Wrapper = styled.section`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  color: var(--text-color);

  .page-header {
    text-align: center;
    max-width: 800px;
    margin: 2rem auto 4rem;
  }

  .page-header h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    /* color: var(--primary-color); */
  }

  .mission-statement {
    font-size: 1.1rem;
    line-height: 1.7;
    color: var(--dark-color);
    text-align: justify;
  }

  .team-section {
    margin-bottom: 4rem;
  }

  .team-section h2,
  .cta-section h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 2.5rem;
    font-weight: 600;
  }

  .team-grid {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  .team-member-card {
    background: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-2);
    padding: 2rem 1.5rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: var(--transition);
  }

  .team-member-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-3);
  }

  .team-member-avatar {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1.5rem;
    border: 4px solid var(--white);
    box-shadow: var(--shadow-2);
  }

  .member-name {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  .member-role {
    font-size: 0.9rem;
    color: var(--primary-500);
    font-weight: 500;
    margin-bottom: 1rem;
  }

  .member-bio {
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--text-secondary-color);
    flex-grow: 1;
  }

  .cta-section {
    text-align: center;
    padding: 2rem;
    background: var(--grey-50);
    border-radius: var(--border-radius);
  }

  .cta-btn {
    background: var(--primary-color);
    color: var(--white);
    padding: 0.75rem 2rem;
    font-size: 1rem;
    font-weight: bold;
    text-decoration: none;
    border-radius: var(--border-radius);
    transition: var(--transition);
  }

  .cta-btn:hover {
    background: var(--secondary-color);
  }

  .member-socials {
    display: flex;
    gap: 1.25rem;
    margin-top: 1rem;
  }

  .social-link {
    font-size: 1.75rem;
    color: var(--grey-400);
    transition: var(--transition);
  }

  .social-link:hover {
    color: var(--primary-500);
    transform: translateY(-2px);
  }

  .contact-section {
    h2 {
      margin-bottom: 1rem;
    }
    max-width: 700px;
    margin: 4rem auto;
    text-align: center;
  }

  .contact-form {
    margin-top: 2rem;
    text-align: left;
  }

  .contact-form .form-group {
    margin-bottom: 1.5rem;
  }

  .contact-form label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--text-color);
  }

  .contact-form input,
  .contact-form textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--grey-300);
    border-radius: var(--border-radius);
    font-size: 1rem;
    box-sizing: border-box;
  }

  .contact-form input:focus,
  .contact-form textarea:focus {
    outline: none;
    border-color: var(--primary-500);
    box-shadow: 0 0 0 2px var(--primary-100);
  }

  .contact-form .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .contact-form .submit-btn {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    font-weight: bold;
    background: var(--primary-color);
    color: var(--white);
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: var(--transition);
  }

  .contact-form .submit-btn:hover {
    background: var(--secondary-color);
  }

  .faq-link-container {
    margin-top: 2.5rem;
    padding: 1.5rem;
    background: var(--grey-50, #f8f9fa);
    border-radius: var(--border-radius);
    border: 1px solid var(--grey-100, #f1f5f9);
  }

  .faq-link-container p {
    margin: 0 0 1rem 0;
    font-size: 1rem;
    color: var(--text-secondary-color);
  }

  .faq-btn {
    background: var(--white);
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    font-weight: bold;
    padding: 0.6rem 1.5rem;
    text-decoration: none;
    display: inline-block;
    transition: var(--transition);
  }

  .faq-btn:hover {
    background: var(--secondary-color);
    transform: scale(1.02);
  }

  .mission-statement {
    font-size: 1.1rem;
    line-height: 1.7;
    color: var(--text-secondary-color);
    margin-top: 1rem;
  }

  .support-section {
    text-align: center;
    padding: 3rem 0;
    border-top: 1px solid var(--grey-100);
    border-bottom: 1px solid var(--grey-100);
    margin: 4rem auto;
    max-width: 900px;
  }

  .support-logos {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    flex-wrap: wrap;
  }

  .support-logo {
    max-height: 70px;
    filter: grayscale(100%);
    opacity: 0.7;
    transition: var(--transition);
  }

  .support-logo:hover {
    filter: grayscale(0%);
    opacity: 1;
  }

  .github-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #333;
    color: var(--white);
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    text-decoration: none;
    border-radius: var(--border-radius);
  }

  .github-btn:hover {
    background: #111;
  }

  .github-btn i {
    font-size: 1.2rem;
  }

  .agradecimentos {
    margin-top: 2rem;
    font-style: italic;
    color: var(--text-secondary-color);
  }

  @media (max-width: 600px) {
    .contact-form .form-row {
      grid-template-columns: 1fr;
    }
  }
`;

export default Wrapper;
