import { Package, Eye, TrendingUp, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { name: "Total de Anúncios", value: "142", icon: Package, change: "+12%", color: "text-blue-500" },
    { name: "Visualizações (30d)", value: "24.5k", icon: Eye, change: "+18%", color: "text-purple-500" },
    { name: "Cliques", value: "3.2k", icon: TrendingUp, change: "+5%", color: "text-emerald-500" },
    { name: "Receita Estimada", value: "R$ 4.250", icon: DollarSign, change: "+22%", color: "text-amber-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Dashboard</h1>
        <p className="text-zinc-400">Bem-vindo de volta! Aqui está o resumo dos seus anúncios.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-zinc-900 rounded-xl">
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <span className="text-emerald-400 text-sm font-medium bg-emerald-400/10 px-2.5 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-zinc-400 text-sm font-medium">{stat.name}</p>
              <h3 className="text-3xl font-bold text-white mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Anúncios Recentes</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-zinc-900/30 border border-zinc-800/50 rounded-xl hover:bg-zinc-900/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-zinc-800 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-zinc-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Produto Exemplo {i}</h4>
                    <p className="text-zinc-500 text-sm">Categoria • Há 2 horas</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">R$ 199,90</div>
                  <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full mt-1 inline-block">
                    Ativo
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Ações Rápidas</h3>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
              Criar Novo Anúncio
            </button>
            <button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 font-medium py-3 px-4 rounded-xl transition-colors">
              Ver Todos os Anúncios
            </button>
            <button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 font-medium py-3 px-4 rounded-xl transition-colors">
              Estatísticas Detalhadas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
