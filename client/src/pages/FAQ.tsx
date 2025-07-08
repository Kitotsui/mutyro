import React from "react";
import Wrapper from "../assets/wrappers/FAQ";
import { useTranslation } from "react-i18next";

const perguntasRespostas = [
  "mutirao",
  "participar", 
  "ajudar",
  "objetivo",
  "cancelar",
  "certificado",
  "gratuito",
  "organizar",
  "aceito",
  "restricoes",
  "contato"
];

const FAQ = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <div className="faq-container">
        <h1 className="faq-title">{t('faq.titulo')}</h1>
        <div>
          {perguntasRespostas.map((chave) => (
            <div key={chave} className="faq-item">
              <div className="faq-question">{t(`faq.perguntas.${chave}.pergunta`)}</div>
              <div className="faq-answer">{t(`faq.perguntas.${chave}.resposta`)}</div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default FAQ; 