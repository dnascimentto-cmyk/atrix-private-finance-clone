import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase env vars not set. Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

export async function resetAllData(userId: string) {
  // Zerar & Reiniciar: apaga extratos importados e zera saldos/derivados
  await supabase.from('transactions').delete().eq('user_id', userId);
  await supabase.from('vault_documents').delete().eq('user_id', userId);
  const { data: accounts } = await supabase.from('accounts').select('id').eq('user_id', userId);
  if (accounts) {
    for (const acc of accounts) {
      await supabase.from('accounts').update({ balance: 0 }).eq('id', acc.id);
    }
  }
  return true;
}
