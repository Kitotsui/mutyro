import { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/Quote";
import { useTranslation } from "react-i18next";

const Quote = () => {
  const { t } = useTranslation();
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 10); // 10 quotes disponíveis
    setQuoteIndex(randomIndex);
  }, []);

  const getQuote = () => {
    const quotes = [
      t('quotes.quote1'),
      t('quotes.quote2'),
      t('quotes.quote3'),
      t('quotes.quote4'),
      t('quotes.quote5'),
      t('quotes.quote6'),
      t('quotes.quote7'),
      t('quotes.quote8'),
      t('quotes.quote9'),
      t('quotes.quote10'),
    ];
    return quotes[quoteIndex] || quotes[0];
  };

  return <Wrapper>{getQuote()}</Wrapper>;
};
export default Quote;
