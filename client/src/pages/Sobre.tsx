import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Sobre";
import { toast } from "react-toastify";

const equipe = [
  {
    name: "Bruno Veloso",
    role: "Desenvolvedor Full-Stack",
    imageUrl:
      "https://res.cloudinary.com/dunfagpl8/image/upload/v1751735102/bruno_wfjhnu.png",
    bio: "Estudante do curso de Análise e Desenvolvimento de Sistemas no IFTM - Campus Uberaba Parque Tecnológico.",
    linkedinUrl: "https://www.linkedin.com/in/brunoaaveloso/",
    githubUrl: "https://github.com/brunoaaveloso",
  },
  {
    name: "Rogério Coutinho",
    role: "Desenvolvedor Full-Stack",
    imageUrl:
      "https://res.cloudinary.com/dunfagpl8/image/upload/v1751735102/rogerio_upylxb.png",
    bio: "Estudante do curso de Análise e Desenvolvimento de Sistemas no IFTM - Campus Uberaba Parque Tecnológico.",
    linkedinUrl: "https://www.linkedin.com/in//",
    githubUrl: "https://github.com/kitotsui",
  },
  {
    name: "João Henrique Lamounier",
    role: "Desenvolvedor Full-Stack",
    imageUrl:
      "https://res.cloudinary.com/dunfagpl8/image/upload/v1751735102/joao_oy5azj.png",
    bio: "Estudante do curso de Análise e Desenvolvimento de Sistemas no IFTM - Campus Uberaba Parque Tecnológico.",
    linkedinUrl: "https://www.linkedin.com/in//",
    githubUrl: "https://github.com/Lamouniers",
  },
  {
    name: "Thiago Parreira",
    role: "Desenvolvedor Full-Stack",
    imageUrl:
      "https://res.cloudinary.com/dunfagpl8/image/upload/v1751735102/thiago_azc7or.png",
    bio: "Estudante do curso de Análise e Desenvolvimento de Sistemas no IFTM - Campus Uberaba Parque Tecnológico.",
    linkedinUrl: "https://www.linkedin.com/in//",
    githubUrl: "https://github.com/Dev-ThiagoParreira",
  },
];

const Sobre = () => {
  const sortedEquipe = useMemo(() => {
    return [...equipe].sort(() => Math.random() - 0.5);
  }, [equipe]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        toast.success(
          "Obrigado pela sua mensagem! Entraremos em contato em breve."
        );
        form.reset();
      } else {
        const errorData = await response.json();
        const errorMessage =
          errorData.errors?.map((err: any) => err.message).join(", ") ||
          "Ocorreu um erro ao enviar sua mensagem.";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Erro ao submeter formulário de contato:", error);
      toast.error(
        "Ocorreu um erro na comunicação. Por favor, tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <div className="page-header">
        <h1>Projeto Mutyro</h1>
        <p className="mission-statement">
          Mutyro nasceu da crença de que, juntos, podemos transformar nossa
          comunidade. Nossa plataforma é um ponto de encontro digital para
          pessoas que querem fazer a diferença, conectando voluntários a
          mutirões locais que precisam de ajuda.
        </p>
        <p className="mission-statement">
          Este projeto foi desenvolvido com dedicação como parte da disciplina
          de Laboratório de Engenharia de Software (LabESOF) do curso de Análise
          e Desenvolvimento de Sistemas do IFTM - Campus Uberaba Parque
          Tecnológico, sob a orientação do Prof. Mauro Borges França. Nosso
          objetivo é aplicar o conhecimento técnico adquirido em sala de aula
          para criar uma solução real que gere valor e fortaleça os laços
          comunitários em Uberaba e região.
        </p>

        <div className="faq-link-container">
          <p>Tem alguma dúvida sobre como funciona?</p>
          <Link to="/faq" className="btn faq-btn">
            Visite nosso FAQ
          </Link>
        </div>
      </div>
      <div className="team-section">
        <h2>Nossa Equipe</h2>
        <div className="team-grid">
          {sortedEquipe.map((member) => (
            <div key={member.name} className="team-member-card">
              <img
                src={member.imageUrl}
                alt={`Foto de ${member.name}`}
                className="team-member-avatar"
              />
              <h3 className="member-name">{member.name}</h3>
              <h4 className="member-role">{member.role}</h4>
              <p className="member-bio">{member.bio}</p>
              <div className="member-socials">
                {member.linkedinUrl && (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={`LinkedIn de ${member.name}`}
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                )}
                {member.githubUrl && (
                  <a
                    href={member.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={`GitHub de ${member.name}`}
                  >
                    <i className="fab fa-github"></i>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cta-section">
        <h2>Pronto para fazer a diferença?</h2>
        <Link to="/mutiroes" className="btn cta-btn">
          Ver Mutirões Ativos
        </Link>
      </div>

      <div className="support-section">
        <h2>Realização e Apoio</h2>
        <div className="support-logos">
          <a
            href="https://iftm.edu.br/uberaba-parque-tecnologico/"
            target="_blank"
            rel="noopener noreferrer"
            title="IFTM - Campus Uberaba Parque Tecnológico"
          >
            <img
              src={
                "https://res.cloudinary.com/dunfagpl8/image/upload/v1751741355/Horizontal_20resumida_sncm38.png"
              }
              alt="Logo do IFTM"
              className="support-logo"
            />
          </a>
          <a
            href="https://github.com/Kitotsui/mutyro"
            target="_blank"
            rel="noopener noreferrer"
            className="btn github-btn"
            title="Ver projeto no GitHub"
          >
            <i className="fab fa-github"></i> Ver no GitHub
          </a>
        </div>
        <p className="agradecimentos">
          Um agradecimento especial ao Prof. Mauro Borges França pela orientação
          e apoio contínuo.
        </p>
      </div>

      <div className="contact-section">
        <h2>Entre em Contato</h2>
        <p>
          Tem alguma dúvida, sugestão ou proposta de parceria? Adoraríamos ouvir
          você!
        </p>

        <form
          action="https://formspree.io/f/xgvybyoz"
          method="POST"
          className="contact-form"
          onSubmit={handleContactSubmit}
        >
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="contact-name">Seu Nome</label>
              <input type="text" id="contact-name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">Seu Email</label>
              <input type="email" id="contact-email" name="email" required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="contact-message">Mensagem</label>
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
          </button>
        </form>
      </div>
    </Wrapper>
  );
};
export default Sobre;
