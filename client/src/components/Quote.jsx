import { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/Quote";
import quotes from "../data/quotes.json";

const Quote = () => {
  const [quote, setQuote] = useState("");
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return <Wrapper>{quote}</Wrapper>;
};
export default Quote;
