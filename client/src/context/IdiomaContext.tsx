import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface IdiomaContextType {
  idioma: string;
  setIdioma: (idioma: string) => void;
}

const IdiomaContext = createContext<IdiomaContextType>({
  idioma: "pt-BR",
  setIdioma: () => {},
});

export const useIdioma = () => useContext(IdiomaContext);

export const IdiomaProvider = ({ children }: { children: ReactNode }) => {
  const [idioma, setIdiomaState] = useState<string>(
    localStorage.getItem("idioma") || "pt-BR"
  );

  useEffect(() => {
    localStorage.setItem("idioma", idioma);
  }, [idioma]);

  const setIdioma = (novoIdioma: string) => {
    setIdiomaState(novoIdioma);
  };

  return (
    <IdiomaContext.Provider value={{ idioma, setIdioma }}>
      {children}
    </IdiomaContext.Provider>
  );
};
