import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

type Usuario = {
  _id: string;
  nome: string;
  email: string;
  isAdmin: boolean;
  cpf: string;
  endereco: string;
  dataNascimento: string;
  avatar?: string;
};

type AuthContextType = {
  usuario: Usuario | null;
  setUsuario: (usuario: Usuario | null) => void;
  isLoading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verifica se há um usuário logado ao iniciar
  useEffect(() => {
    const verificarUsuario = async () => {
      try {
        const response = await customFetch.get("/usuarios/atual-usuario");
        console.log("Usuário atual verificado:", response.data);
        if (response.data && response.data.usuario) {
          setUsuario(response.data.usuario);
        } else {
          setUsuario(null);
        }
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          setUsuario(null);
        } else {
          console.error("Erro ao verificar usuário:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    verificarUsuario();
  }, []);

  const logout = async () => {
    try {
      await customFetch.get("/auth/logout");
      setUsuario(null);
      toast.success("Logout realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast.error("Erro ao fazer logout");
    }
  };

  // Log quando o estado do usuário mudar
  useEffect(() => {
    console.log("Estado do usuário atualizado:", usuario);
  }, [usuario]);

  return (
    <AuthContext.Provider value={{ usuario, setUsuario, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
