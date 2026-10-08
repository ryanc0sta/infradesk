/**
 * Tipos de usuário, iguais aos do banco (docs/data-model.md, tabela `profiles`).
 * Na Etapa 6 passam a vir de `database.ts`, gerado pelo Supabase.
 */
export type UserRole = 'user' | 'technician' | 'admin';

export type Profile = {
  id: string;
  full_name: string;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
};
