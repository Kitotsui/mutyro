import React from "react";
import { FaTwitter, FaFacebook, FaWhatsapp, FaTelegram } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 1.5rem 0 2rem 0;
  .share-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--primary-900);
    margin-bottom: 0.7rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .share-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: center;
  }
  .share-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    border: none;
    border-radius: 2rem;
    padding: 0.5rem 1.2rem;
    background: var(--grey-100);
    color: var(--primary-900);
    box-shadow: var(--shadow-1);
    cursor: pointer;
    transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.15s;
    text-decoration: none;
    outline: none;
    border: 2px solid transparent;
    min-width: 120px;
    justify-content: center;
  }
  .share-btn span {
    font-weight: 600;
    font-size: 1rem;
  }
  .share-btn:hover {
    background: var(--grey-200);
    box-shadow: var(--shadow-2);
    transform: translateY(-2px) scale(1.04);
    border-color: var(--grey-400);
  }
  .twitter {
    color: #1da1f2;
  }
  .facebook {
    color: #1877f3;
  }
  .whatsapp {
    color: #25d366;
  }
  .telegram {
    color: #229ed9;
  }
  @media (max-width: 600px) {
    .share-buttons {
      flex-direction: column;
      gap: 0.7rem;
      align-items: flex-start;
    }
    .share-btn {
      width: 100%;
      min-width: 0;
      justify-content: flex-start;
    }
  }
`;

interface ShareMutiraoProps {
  url: string;
  titulo: string;
}

const ShareMutirao: React.FC<ShareMutiraoProps> = ({ url, titulo }) => {
  const { t } = useTranslation();
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(titulo);

  return (
    <Wrapper>
      <div className="share-title">{t('geral.compartilhar')}:</div>
      <div className="share-buttons">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn twitter"
        >
          <FaTwitter size={20} /> <span>Twitter</span>
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn facebook"
        >
          <FaFacebook size={20} /> <span>Facebook</span>
        </a>
        <a
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn whatsapp"
        >
          <FaWhatsapp size={20} /> <span>WhatsApp</span>
        </a>
        <a
          href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn telegram"
        >
          <FaTelegram size={20} /> <span>Telegram</span>
        </a>
      </div>
    </Wrapper>
  );
};

export default ShareMutirao; 