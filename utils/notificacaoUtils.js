export function criarNotificacaoPadronizada({ usuarioId, tipo, variaveis = {}, mutiraoId = null }) {
  return {
    usuarioId,
    tipo,
    ...variaveis, // Ex: { mutirao: "Mutirão de Limpeza" }
    mutiraoId,
    lida: false,
    data: new Date(),
  };
} 