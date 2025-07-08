import { useTranslation } from "react-i18next";

const MutiraoItem = ({ titulo, data, status }: { titulo: string, data: string, status: string }) => {
  const { t } = useTranslation();
  
  return (
    <div className="mutirao-item">
      <h4>{titulo}</h4>
      <p>{t('geral.data')}: {data}</p>
      <p>{t('geral.status')}: {status}</p>
    </div>
  );
};

export default MutiraoItem;
  