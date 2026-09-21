'use client';

import Link from "next/link";
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { login } from "./actions";
import { useState, useTransition } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block text-3xl font-black text-white tracking-tighter mb-2">
            BIZB<span className="text-blue-500">.</span>
          </Link>
          <h1 className="text-2xl font-semibold mb-2">Acesso Restrito</h1>
          <p className="text-zinc-400 text-sm">Painel exclusivo do administrador.</p>
        </div>

        <div className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 p-8 rounded-2xl shadow-2xl">
          <form action={handleSubmit} className="space-y-6">
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300" htmlFor="email">
                E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@bizb.com.br"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  required
                  disabled={isPending}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-300" htmlFor="password">
                  Senha
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  required
                  disabled={isPending}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Autenticando...
                </>
              ) : (
                <>
                  Entrar no Painel
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>
        </div>
        
        <p className="text-center text-zinc-600 text-xs mt-8">
          Acesso monitorado. Tentativas não autorizadas serão registradas.
        </p>
      </div>
    </div>
  );
}
