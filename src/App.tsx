import React, { useState } from 'react';
import { mockUser, mockAccounts, mockTransactions } from './data/mockData';
import { Account, Transaction } from './types';
import { resetAllData } from './lib/supabase';

function formatCurrency(value: number, currency: string) {
  return new Intl.NumberFormat(currency === 'BRL' ? 'pt-BR' : 'pt-PT', {
    style: 'currency',
    currency,
  }).format(value);
}

export default function App() {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [isResetting, setIsResetting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const totalBRL = accounts.filter(a => a.currency === 'BRL').reduce((s, a) => s + a.balance, 0);
  const totalEUR = accounts.filter(a => a.currency === 'EUR').reduce((s, a) => s + a.balance, 0);

  async function handleResetConfirmed() {
    setIsResetting(true);
    try {
      await resetAllData(mockUser.email);
    } catch (e) {
      console.warn('Supabase reset failed (provisorio, sem chave configurada):', e);
    }
    setAccounts(prev => prev.map(a => ({ ...a, balance: 0 })));
    setTransactions([]);
    setIsResetting(false);
    setShowConfirm(false);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0B1F3A', color: '#F5F5F5', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 32px', borderBottom: '1px solid #1c3155' }}>
        <h1 style={{ color: '#C9A227', fontSize: 22, margin: 0 }}>ATRIX Private Finance</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span>{mockUser.name}</span>
          <button
            onClick={() => setShowConfirm(true)}
            style={{ background: '#C9A227', color: '#0B1F3A', border: 'none', padding: '10px 18px', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}
          >
            Zerar & Reiniciar
          </button>
        </div>
      </header>

      <main style={{ padding: 32 }}>
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 32 }}>
          <div style={{ background: '#122a4d', borderRadius: 12, padding: 20 }}>
            <p style={{ opacity: 0.7, margin: 0 }}>Saldo Total BRL</p>
            <h2 style={{ color: '#C9A227', margin: '8px 0 0' }}>{formatCurrency(totalBRL, 'BRL')}</h2>
          </div>
          <div style={{ background: '#122a4d', borderRadius: 12, padding: 20 }}>
            <p style={{ opacity: 0.7, margin: 0 }}>Saldo Total EUR</p>
            <h2 style={{ color: '#C9A227', margin: '8px 0 0' }}>{formatCurrency(totalEUR, 'EUR')}</h2>
          </div>
          <div style={{ background: '#122a4d', borderRadius: 12, padding: 20 }}>
            <p style={{ opacity: 0.7, margin: 0 }}>Cotacao BRL/EUR</p>
            <h2 style={{ color: '#C9A227', margin: '8px 0 0' }}>{mockUser.brlEurRate.toFixed(2)}</h2>
          </div>
        </section>

        <section>
          <h3 style={{ color: '#C9A227' }}>Contas</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {accounts.map(acc => (
              <div key={acc.id} style={{ background: '#122a4d', borderLeft: `4px solid ${acc.color}`, borderRadius: 10, padding: 16 }}>
                <p style={{ margin: 0, fontWeight: 600 }}>{acc.name}</p>
                <p style={{ margin: '4px 0', opacity: 0.7, fontSize: 13 }}>{acc.bankName} - {acc.country}</p>
                <h4 style={{ margin: 0, color: '#C9A227' }}>{formatCurrency(acc.balance, acc.currency)}</h4>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 32 }}>
          <h3 style={{ color: '#C9A227' }}>Transacoes Recentes</h3>
          {transactions.length === 0 ? (
            <p style={{ opacity: 0.6 }}>Nenhuma transacao importada. Use a importacao de extrato para comecar.</p>
          ) : (
            <ul>
              {transactions.map(t => (
                <li key={t.id}>{t.description} - {formatCurrency(t.amount, t.currency)}</li>
              ))}
            </ul>
          )}
        </section>
      </main>

      {showConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#122a4d', padding: 24, borderRadius: 12, maxWidth: 400 }}>
            <h3 style={{ color: '#C9A227', marginTop: 0 }}>Confirmar Zerar & Reiniciar</h3>
            <p>Isso ira apagar todos os extratos importados e zerar os saldos e dashboards. Esta acao nao pode ser desfeita.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowConfirm(false)} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #C9A227', background: 'transparent', color: '#F5F5F5', cursor: 'pointer' }}>Cancelar</button>
              <button onClick={handleResetConfirmed} disabled={isResetting} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: '#C9A227', color: '#0B1F3A', fontWeight: 700, cursor: 'pointer' }}>
                {isResetting ? 'Processando...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
