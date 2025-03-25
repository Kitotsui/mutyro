import bcrypt from 'bcryptjs';

export const senhaHash = async (senha) => {
      const salt = await bcrypt.genSalt(10);
      const senhaComHash = await bcrypt.hash(senha, salt);
      return senhaComHash;
};

export const compararSenha = async (senha, senhaComHash) => {
      const senhaBateu = await bcrypt.compare(senha, senhaComHash);
      return senhaBateu;
};