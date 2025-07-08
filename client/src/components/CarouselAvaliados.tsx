import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { useTranslation } from "react-i18next";
import Wrapper from "../assets/wrappers/CarouselAvaliados";
import customFetch from "../utils/customFetch";
import getImageUrl from "../utils/imageUrlHelper";
import { Link } from "react-router-dom";

import StarRating from "./StarRating";

interface Story {
  mutiraoId: string;
  mutiraoTitulo: string;
  mutiraoImagemCapa: { url: string };
  mutiraoTipo: string;
  comentario: string;
  autorComentario: string;
  averageRating: number;
}

const CarouselAvaliados = () => {
  const { t } = useTranslation();
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setIsLoading(true);
        const { data } = await customFetch.get("/mutiroes/historiasDeSucesso");
        setStories(data.avaliados || []);
      } catch (error) {
        console.error("Falha ao carregar histórias de sucesso:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (isLoading) {
    return (
      <Wrapper>
        <div className="loading-text">{t('geral.carregandoHistorias')}</div>
      </Wrapper>
    );
  }

  if (stories.length === 0) {
    return null;
  }

  const defaultImages = {
    SOCIAL:
      "https://res.cloudinary.com/dunfagpl8/image/upload/v1750033683/social_w337yo.jpg",
    SAUDE:
      "https://res.cloudinary.com/dunfagpl8/image/upload/v1750033683/saude_jxyour.jpg",
    CONSTRUCAO_REFORMA:
      "https://res.cloudinary.com/dunfagpl8/image/upload/v1750033683/construcao_llhyii.avif",
    AMBIENTAL_AGRICOLA:
      "https://res.cloudinary.com/dunfagpl8/image/upload/v1750033683/ambiental_upuyed.avif",
    CULTURA_EDUCACAO:
      "https://res.cloudinary.com/dunfagpl8/image/upload/v1750033683/educacao_zs4ywz.avif",
    TECNOLOGIA:
      "https://res.cloudinary.com/dunfagpl8/image/upload/v1750033683/tecnologia_o5ui0u.avif",
    FALLBACK:
      "https://res.cloudinary.com/dunfagpl8/image/upload/v1750033758/mutyrologo_bz2kon.png",
  };

  return (
    <Wrapper>
      <Marquee
        pauseOnHover={true}
        speed={40}
        gradient={true}
        gradientColor="var(--background-color, #f9fafb)"
      >
        {stories.map((story) => (
          <Link
            to={`/mutirao/${story.mutiraoId}`}
            className="story-card"
            key={story.mutiraoId}
            style={
              {
                "--bg-capa": `url(${getImageUrl(story.mutiraoImagemCapa.url)})`,
                "--bg-tipo": `url(${
                  defaultImages[story.mutiraoTipo] || defaultImages.FALLBACK
                })`,
              } as React.CSSProperties
            }
          >
            <div className="story-content">
              <p className="story-comment">"{story.comentario}"</p>
              <span className="story-author">
                - {story.autorComentario}, {t('geral.noMutirao')} {story.mutiraoTitulo}
              </span>
              <div className="story-header">
                {/* <span className="story-mutirao-title">
                  {story.mutiraoTitulo}
                </span> */}
                {story.averageRating && (
                  <StarRating rating={story.averageRating} />
                )}
              </div>
            </div>
          </Link>
        ))}
      </Marquee>
    </Wrapper>
  );
};

export default CarouselAvaliados;
