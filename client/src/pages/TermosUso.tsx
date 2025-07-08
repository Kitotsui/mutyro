import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/TermosUso";

const TermosUso = () => {
  return (
    <Wrapper>
      <div className="terms-container">
        <h1>Termos de Uso</h1>

        <h2>1. Aceitação dos Termos</h2>
        <p>
          Ao acessar o site <a href="http://mutyro.com.br/">Mutyro</a>, você
          concorda em cumprir estes Termos de Uso, bem como todas as leis e
          regulamentos aplicáveis, assumindo total responsabilidade pelo
          cumprimento das leis locais. Caso não concorde com algum destes
          termos, você está proibido de utilizar ou acessar este site. Os
          conteúdos e funcionalidades disponibilizados no site estão protegidos
          pelas leis de direitos autorais e marcas registradas.
        </p>

        <h2>2. Uso da Plataforma</h2>
        <p>
          A Mutyro concede a você permissão para utilizar a plataforma
          exclusivamente para fins pessoais ou institucionais relacionados à
          criação, organização e gerenciamento de mutirões. Esta é uma concessão
          de licença, não uma transferência de propriedade. Sob esta licença,
          você não poderá:
        </p>
        <ol>
          <li>
            Modificar ou copiar qualquer conteúdo do site, exceto onde permitido
            pela plataforma;
          </li>
          <li>
            Utilizar as informações ou serviços para fins comerciais alheios ao
            escopo da Mutyro;
          </li>
          <li>
            Tentar descompilar, fazer engenharia reversa ou obter acesso ao
            código-fonte da plataforma;
          </li>
          <li>
            Remover marcas, avisos de direitos autorais ou outras informações de
            propriedade;
          </li>
          <li>
            Transferir dados ou conteúdos da plataforma para terceiros ou
            espelhar os materiais em outros servidores sem autorização.
          </li>
        </ol>
        <p>
          Esta licença poderá ser revogada automaticamente caso você viole
          alguma dessas restrições, podendo a Mutyro encerrá-la a qualquer
          momento. Após o término do uso da plataforma ou do encerramento da
          licença, você deverá excluir qualquer material que tenha sido baixado
          ou salvo, seja em formato digital ou impresso.
        </p>

        <h2>3. Isenção de Responsabilidade</h2>
        <ol>
          <li>
            A plataforma Mutyro é fornecida “como está”. A Mutyro não oferece
            garantias expressas ou implícitas e, por meio deste documento,
            isenta-se de qualquer responsabilidade relacionada a garantias
            implícitas de comercialização, adequação a um propósito específico
            ou não violação de propriedade intelectual ou outros direitos.
          </li>
          <li>
            A Mutyro não garante a precisão, confiabilidade ou resultados
            decorrentes do uso das informações e funcionalidades do site, nem se
            responsabiliza por quaisquer conteúdos criados pelos próprios
            usuários no âmbito dos mutirões cadastrados.
          </li>
        </ol>

        <h2>4. Limitações de Responsabilidade</h2>
        <p>
          Em nenhuma circunstância a Mutyro ou seus responsáveis serão
          responsabilizados por quaisquer danos diretos, indiretos, incidentais,
          consequenciais ou especiais (incluindo, sem limitação, perda de
          lucros, interrupção de negócios ou perda de dados) decorrentes do uso
          ou da impossibilidade de uso da plataforma, mesmo que a Mutyro tenha
          sido informada sobre a possibilidade de tais danos. Algumas
          jurisdições não permitem limitações de responsabilidade, de modo que
          estas limitações podem não se aplicar a você.
        </p>

        <h2>5. Conteúdo Gerado por Usuários</h2>
        <p>
          Os mutirões cadastrados, bem como quaisquer informações, descrições,
          imagens ou textos publicados pelos usuários, são de inteira
          responsabilidade de seus autores. A Mutyro não se responsabiliza pela
          veracidade, legalidade ou segurança das informações inseridas pelos
          usuários, podendo, no entanto, remover conteúdos que violem estes
          Termos de Uso ou a legislação vigente.
        </p>

        <h2>6. Atualização das Informações</h2>
        <p>
          As informações disponibilizadas no site podem conter erros técnicos ou
          tipográficos. A Mutyro reserva-se o direito de modificar ou atualizar
          qualquer informação a qualquer momento, sem necessidade de aviso
          prévio. Contudo, não se obriga a manter os materiais atualizados.
        </p>

        <h2>7. Links para Terceiros</h2>
        <p>
          A Mutyro poderá conter links para sites externos, não sendo
          responsável pelo conteúdo ou práticas desses sites. A inclusão de
          qualquer link não implica endosso ou associação da Mutyro ao conteúdo
          ou à operação de tais sites. O uso de sites de terceiros é por conta e
          risco do usuário.
        </p>

        <h3>Modificações nos Termos</h3>
        <p>
          A Mutyro poderá alterar estes Termos de Uso a qualquer momento, sem
          aviso prévio. Ao continuar utilizando o site após a publicação das
          alterações, você concorda em estar vinculado à versão atualizada dos
          Termos.
        </p>

        <h3>Lei Aplicável</h3>
        <p>
          Estes Termos de Uso são regidos pelas leis brasileiras. Você concorda
          que quaisquer disputas decorrentes do uso da plataforma deverão ser
          dirimidas no foro da comarca onde se situa a sede da Mutyro.
        </p>

        <div className="cta-section">
          <Link to="/" className="btn cta-btn">
            Voltar para página inicial
          </Link>
        </div>        
      </div>
    </Wrapper>
  );
};

export default TermosUso;