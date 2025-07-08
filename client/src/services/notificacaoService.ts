import customFetch from '../utils/customFetch';

export const getNotificacoes = async (lida?: boolean) => {
  const params = lida !== undefined ? { lida } : {};
  const response = await customFetch.get(`/notificacoes`, { params });
  return response.data;
};

export const marcarComoLida = async (id: string) => {
  const response = await customFetch.patch(`/notificacoes/${id}/marcar-lida`);
  return response.data;
};

export const contarNotificacoesNaoLidas = async () => {
  const response = await customFetch.get(`/notificacoes/contar`);
  return response.data;
};

export const criarNotificacao = async (dados: {
  usuarioId: string;
  tipo: 'info' | 'alerta' | 'sucesso';
  titulo: string;
  mensagem: string;
  mutiraoId?: string;
}) => {
  const response = await customFetch.post(`/notificacoes`, dados);
  return response.data;
};

export const marcarTodasComoLidas = async () => {
  const response = await customFetch.patch(`/notificacoes/todas/marcar-lidas`);
  return response.data;
};

export const excluirNotificacao = async (id: string) => {
  const response = await customFetch.delete(`/notificacoes/${id}`);
  return response.data;
};

export const toggleFavorita = async (id: string) => {
  const response = await customFetch.patch(`/notificacoes/${id}/favorita`);
  return response.data;
}; 