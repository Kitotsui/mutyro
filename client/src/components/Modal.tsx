import React from "react";
import { useTranslation } from "react-i18next";
import Wrapper from "../assets/wrappers/Modal";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  const { t } = useTranslation();
  
  if (!isOpen) return null;

  const handlePrint = () => {
    const printContent = document.getElementById("printable-content");
    if (printContent) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>${title}</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; text-align: justify; }
                h3 { text-align: center; margin-bottom: 20px; }
                ul { list-style-type: none; padding: 0; }
                li { margin-bottom: 10px; display: flex; align-items: center; }
                .checkbox { margin-right: 20px; }
                .inscrito-nome { font-weight: bold; flex: 1; }
                .inscrito-email { text-align: right; flex: 1; }
              </style>
            </head>
            <body>
              <h3>${t('geral.inscritosMutirao', { titulo: title })}</h3>
              <ul>
                ${printContent.innerHTML}
              </ul>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  return (
    <Wrapper>
      <div className="modal-overlay">
        <div className="modal-content">
          <h1>{title}</h1>
          <div id="printable-content" className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            <button className="print-btn" onClick={handlePrint}>
              {t('geral.imprimir')}
            </button>
            <button className="close-btn" onClick={onClose}>
              {t('geral.fechar')}
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Modal;