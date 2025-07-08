import Wrapper from "../assets/wrappers/FAQ";
import { useTranslation } from "react-i18next";

const FAQ = () => {
  const { t } = useTranslation();

  const perguntasRespostas = [
    {
      pergunta: t('faq.perguntas.mutirao.pergunta'),
      resposta: t('faq.perguntas.mutirao.resposta'),
    },
    {
      pergunta: t('faq.perguntas.participar.pergunta'),
      resposta: t('faq.perguntas.participar.resposta'),
    },
    {
      pergunta: t('faq.perguntas.ajudar.pergunta'),
      resposta: t('faq.perguntas.ajudar.resposta'),
    },
    {
      pergunta: t('faq.perguntas.objetivo.pergunta'),
      resposta: t('faq.perguntas.objetivo.resposta'),
    },
    {
      pergunta: t('faq.perguntas.cancelar.pergunta'),
      resposta: t('faq.perguntas.cancelar.resposta'),
    },
    {
      pergunta: t('faq.perguntas.certificado.pergunta'),
      resposta: t('faq.perguntas.certificado.resposta'),
    },
    {
      pergunta: t('faq.perguntas.gratuito.pergunta'),
      resposta: t('faq.perguntas.gratuito.resposta'),
    },
    {
      pergunta: t('faq.perguntas.organizar.pergunta'),
      resposta: t('faq.perguntas.organizar.resposta'),
    },
    {
      pergunta: t('faq.perguntas.aceito.pergunta'),
      resposta: t('faq.perguntas.aceito.resposta'),
    },
    {
      pergunta: t('faq.perguntas.restricoes.pergunta'),
      resposta: t('faq.perguntas.restricoes.resposta'),
    },
    {
      pergunta: t('faq.perguntas.contato.pergunta'),
      resposta: t('faq.perguntas.contato.resposta'),
    },
  ];

  return (
    <Wrapper>
      <div className="faq-container">
        <h1 className="faq-title">{t('faq.titulo')}</h1>
        <div>
          {perguntasRespostas.map((item, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question">{item.pergunta}</div>
              <div className="faq-answer">{item.resposta}</div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default FAQ;
