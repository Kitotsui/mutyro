import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import i18n from '../i18n';

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
  // Inicializa com o idioma do localStorage ou o idioma atual do i18n
  const [idioma, setIdiomaState] = useState<string>(() => {
    const storedIdioma = localStorage.getItem("idioma");
    if (storedIdioma && i18n.languages.includes(storedIdioma)) {
      return storedIdioma;
    }
    return i18n.language || "pt-BR";
  });

  // Sincroniza o idioma com o i18n na inicialização
  useEffect(() => {
    if (i18n.language !== idioma) {
      i18n.changeLanguage(idioma);
    }
  }, []);

  // Escuta mudanças no i18n
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      if (lng !== idioma) {
        setIdiomaState(lng);
        localStorage.setItem("idioma", lng);
      }
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [idioma]);

  const setIdioma = (novoIdioma: string) => {
    if (novoIdioma !== idioma) {
      setIdiomaState(novoIdioma);
      localStorage.setItem("idioma", novoIdioma);
      i18n.changeLanguage(novoIdioma);
    }
  };

  return (
    <IdiomaContext.Provider value={{ idioma, setIdioma }}>
      {children}
    </IdiomaContext.Provider>
  );
};
