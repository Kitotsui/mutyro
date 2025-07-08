import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface FormRowProps {
  type: string;
  name: string;
  labelText?: string;
  defaultValue?: string;
  placeHolder?: string;
  value?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormRow = ({ 
  type, 
  name, 
  labelText, 
  defaultValue, 
  placeHolder = "",
  value,
  handleChange
}: FormRowProps) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <div className="input-container">
      <input
          type={inputType}
        id={name}
        name={name}
        className="form-input"
        defaultValue={defaultValue}
          value={value}
          onChange={handleChange}
        placeholder={placeHolder}
        required
      />
        {isPassword && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? t('geral.ocultarSenha') : t('geral.mostrarSenha')}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormRow;
