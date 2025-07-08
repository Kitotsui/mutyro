import { useState } from "react";
import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  switchToRegister: () => void;
  closeModal?: () => void;
}

const Login = ({ switchToRegister, closeModal }: LoginProps) => {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const { t } = useTranslation();
  const { setUsuario } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await customFetch.post("/auth/login", formData);
      if (response.data && response.data.usuario) {
        setUsuario(response.data.usuario);
        toast.success(t('geral.loginSucesso'));
        if (closeModal) {
          closeModal();
        }
        navigate("/user");
      }
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error.response as { data?: { msg?: string } })?.data?.msg 
        : undefined;
      toast.error(errorMessage || t('geral.erro'));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h4>{t('navbar.login')}</h4>
        <FormRow
          type="email"
          name="email"
          value={formData.email}
          handleChange={handleInputChange}
          labelText={t('usuario.email')}
          placeHolder={t('usuario.email')}
        />
        <FormRow
          type="password"
          name="senha"
          value={formData.senha}
          handleChange={handleInputChange}
          labelText={t('usuario.senha')}
          placeHolder={t('usuario.senha')}
        />
        <button type="submit" className="btn btn-block">
          {t('navbar.login')}
        </button>
        <p>
          {t('usuario.naoTemConta')}{" "}
          <button
            type="button"
            className="member-btn"
            onClick={switchToRegister}
          >
            {t('navbar.cadastro')}
        </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Login;
