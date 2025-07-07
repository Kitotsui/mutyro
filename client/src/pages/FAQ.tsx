import Wrapper from "../assets/wrappers/FAQ";

const perguntasRespostas = [
  {
    pergunta: "O que é um mutirão?",
    resposta:
      "Um mutirão é uma ação coletiva, geralmente voluntária, para realizar tarefas em benefício de uma comunidade ou causa social.",
  },
  {
    pergunta: "Como posso participar de um mutirão?",
    resposta:
      "Basta acessar a aba 'Mutirões', escolher um evento de interesse e clicar em 'Participar'. Você receberá todas as informações necessárias por e-mail.",
  },
  {
    pergunta: "Como posso ajudar além de participar presencialmente?",
    resposta:
      "Você pode ajudar divulgando os mutirões, doando materiais, convidando amigos ou até mesmo sugerindo novas ações para a comunidade.",
  },
  {
    pergunta: "Qual o objetivo dos mutirões?",
    resposta:
      "Nosso objetivo é promover a colaboração, fortalecer laços comunitários e gerar impacto positivo através do trabalho voluntário.",
  },
  {
    pergunta: "Posso cancelar minha participação?",
    resposta:
      "Sim, você pode cancelar sua participação a qualquer momento na página do mutirão em que se inscreveu.",
  },
  {
    pergunta: "Recebo certificado ao participar?",
    resposta:
      "Alguns mutirões oferecem certificado de participação. Verifique na descrição do evento ou entre em contato com o organizador.",
  },
  {
    pergunta: "Preciso pagar para participar?",
    resposta: "Não, todos os mutirões são gratuitos para os voluntários.",
  },
  {
    pergunta: "Quem pode organizar um mutirão?",
    resposta:
      "Qualquer pessoa cadastrada pode sugerir e organizar um mutirão, sujeito à aprovação da equipe do site.",
  },
  {
    pergunta: "Como saber se fui aceito em um mutirão?",
    resposta:
      "Você receberá uma notificação e um e-mail de confirmação assim que sua inscrição for aprovada.",
  },
  {
    pergunta: "Tenho restrições físicas, posso participar?",
    resposta:
      "Sim! Muitos mutirões possuem tarefas diversas, inclusive atividades leves. Consulte a descrição do evento ou fale com o organizador.",
  },
  {
    pergunta: "Como entro em contato com os organizadores?",
    resposta:
      "Na página de cada mutirão há um campo para dúvidas e comentários, além do contato do responsável pelo evento.",
  },
];

const FAQ = () => {
  return (
    <Wrapper>
      <div className="faq-container">
        <h1 className="faq-title">Perguntas Frequentes (FAQ)</h1>
        <div>
          {perguntasRespostas.map((item, idx) => (
            <div key={idx} className="faq-item">
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
