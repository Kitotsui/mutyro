import logo from '../assets/images/logo.svg';
import { useTranslation } from 'react-i18next';

const Logo = () => {
  const { t } = useTranslation();
  return <img src={logo} alt={t('geral.logoAlt')} className='logo' />;
};

export default Logo;