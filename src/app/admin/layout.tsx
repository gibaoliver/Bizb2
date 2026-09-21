import Link from "next/link";
import { 
  LayoutDashboard, 
  PlusCircle, 
  Settings, 
  LogOut,
  PackageSearch
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-zinc-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800/50 bg-zinc-950/50 backdrop-blur-xl flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800/50">
          <Link href="/admin" className="text-2xl font-black tracking-tighter">
            BIZB<span className="text-blue-500">.</span>
            <span className="text-xs font-medium text-zinc-500 ml-2 tracking-normal">ADMIN</span>
          </Link>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-zinc-900/50 text-white font-medium hover:bg-zinc-800 transition-colors">
            <LayoutDashboard className="h-5 w-5 text-blue-500" />
            Dashboard
          </Link>
          <Link href="/admin/novo-anuncio" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 font-medium hover:text-white hover:bg-zinc-900/50 transition-colors">
            <PlusCircle className="h-5 w-5" />
            Novo Anúncio
          </Link>
          <Link href="/admin/anuncios" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 font-medium hover:text-white hover:bg-zinc-900/50 transition-colors">
            <PackageSearch className="h-5 w-5" />
            Meus Anúncios
          </Link>
        </nav>

        <div className="p-4 border-t border-zinc-800/50">
          <Link href="/admin/config" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 font-medium hover:text-white hover:bg-zinc-900/50 transition-colors">
            <Settings className="h-5 w-5" />
            Configurações
          </Link>
          <Link href="/login" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 font-medium hover:text-red-300 hover:bg-red-950/20 transition-colors mt-2">
            <LogOut className="h-5 w-5" />
            Sair
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
        
        <header className="h-16 border-b border-zinc-800/50 bg-black/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-lg font-medium text-zinc-200">Painel de Controle</h2>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-lg">
              S
            </div>
            <span className="text-sm font-medium text-zinc-300 hidden sm:block">Super Admin</span>
          </div>
        </header>

        <div className="flex-1 p-8 overflow-y-auto z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
