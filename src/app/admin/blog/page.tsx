'use client';

import { useState } from 'react';
import {
  Sparkles, Copy, Check, LogOut, FileText,
  Linkedin, ChevronDown, Loader2, Lock, Eye, EyeOff,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

const CATEGORIES = [
  { id: 'nearshoring', label: 'Nearshoring & inversión', emoji: '🏭' },
  { id: 'real-estate', label: 'Real Estate México', emoji: '🏢' },
  { id: 'networking', label: 'Networking estratégico', emoji: '🤝' },
  { id: 'mercado', label: 'Mercado mexicano', emoji: '🇲🇽' },
  { id: 'tmec', label: 'T-MEC & comercio exterior', emoji: '🌎' },
  { id: 'consultoria', label: 'Consultoría & expansión', emoji: '📊' },
];

const CAL_SCHEDULE: Record<number, string> = {
  1: 'Nearshoring & inversión',
  2: 'Real Estate México',
  3: 'Networking estratégico',
  4: 'T-MEC & comercio exterior',
  5: 'Real Estate México',
  6: 'Consultoría & expansión',
  0: 'Mercado mexicano',
};

type Tab = 'generate' | 'article' | 'linkedin';

export default function AdminBlogPage() {
  // Auth
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Form
  const [category, setCategory] = useState(CATEGORIES[0].label);
  const [customTopic, setCustomTopic] = useState('');
  const [audience, setAudience] = useState('ambos');
  const [tone, setTone] = useState('profesional');

  // Output
  const [article, setArticle] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('generate');

  // Copy states
  const [copiedArticle, setCopiedArticle] = useState(false);
  const [copiedLinkedin, setCopiedLinkedin] = useState(false);

  // History
  const [history, setHistory] = useState<{ title: string; date: string; cat: string; article: string; linkedin: string }[]>([]);

  const todayCat = CAL_SCHEDULE[new Date().getDay()];

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    // Verify password against API
    try {
      const res = await fetch('/api/admin/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password,
          category: 'test',
          customTopic: '__auth_check__',
          audience: 'ambos',
          tone: 'profesional',
        }),
      });
      if (res.status === 401) {
        setAuthError('Contraseña incorrecta');
      } else {
        setAuthed(true);
      }
    } catch {
      setAuthError('Error de conexión');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setArticle('');
    setLinkedin('');
    setActiveTab('generate');

    try {
      const res = await fetch('/api/admin/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, customTopic, audience, tone, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al generar');

      setArticle(data.article);
      setLinkedin(data.linkedin);
      setActiveTab('article');

      const titleMatch = data.article.match(/title:\s*"([^"]+)"/);
      const title = titleMatch ? titleMatch[1] : category + ' — ' + new Date().toLocaleDateString('es-MX');
      setHistory(h => [{ title, date: new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' }), cat: category, article: data.article, linkedin: data.linkedin }, ...h.slice(0, 9)]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const copy = async (text: string, type: 'article' | 'linkedin') => {
    await navigator.clipboard.writeText(text);
    if (type === 'article') { setCopiedArticle(true); setTimeout(() => setCopiedArticle(false), 2000); }
    else { setCopiedLinkedin(true); setTimeout(() => setCopiedLinkedin(false), 2000); }
  };

  // ── LOGIN SCREEN ──────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-4">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white mb-1">Blog Admin</h1>
            <p className="text-sm text-gray-400">Growth BDM · Acceso restringido</p>
          </div>

          <form onSubmit={handleAuth} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Contraseña de acceso</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500 pr-10"
                  required
                />
                <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {authError && <p className="text-xs text-red-400 mt-1.5">{authError}</p>}
            </div>
            <button
              type="submit"
              disabled={authLoading || !password}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors"
            >
              {authLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
              {authLoading ? 'Verificando…' : 'Acceder'}
            </button>
          </form>

          <p className="text-center text-xs text-gray-600 mt-4">
            Esta área no es accesible desde la navegación pública de growthbdm.com
          </p>
        </div>
      </div>
    );
  }

  // ── ADMIN UI ──────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <div>
              <span className="text-sm font-semibold text-white">Blog Admin</span>
              <span className="text-xs text-gray-400 ml-2">Growth BDM</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 hidden sm:block">
              Hoy toca: <span className="text-blue-400 font-medium">{todayCat}</span>
            </span>
            <button onClick={() => setAuthed(false)} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
              <LogOut className="h-3.5 w-3.5" /> Salir
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">

        {/* ── PANEL IZQUIERDO — CONFIGURACIÓN ── */}
        <div className="space-y-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-white mb-4">Configurar artículo</h2>

            {/* Sugerencia del día */}
            <div className="bg-blue-950/50 border border-blue-900/50 rounded-xl p-3 mb-4">
              <p className="text-xs text-blue-300 font-medium mb-0.5">Sugerencia de hoy</p>
              <p className="text-xs text-blue-200">{todayCat}</p>
            </div>

            {/* Categoría */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-400 mb-2">Categoría</label>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.label)}
                    className={`text-left px-3 py-2 rounded-xl text-xs border transition-all ${
                      category === cat.label
                        ? 'bg-blue-600/20 border-blue-500/50 text-blue-300'
                        : 'bg-gray-800/50 border-gray-700/50 text-gray-400 hover:border-gray-600 hover:text-gray-200'
                    }`}
                  >
                    <span className="mr-1.5">{cat.emoji}</span>{cat.label.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Tema personalizado */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Tema específico (opcional)</label>
              <input
                type="text"
                value={customTopic}
                onChange={e => setCustomTopic(e.target.value)}
                placeholder="Ej: Ford anuncia planta en NL…"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Déjalo vacío para búsqueda automática</p>
            </div>

            {/* Audiencia */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Audiencia</label>
              <div className="relative">
                <select
                  value={audience}
                  onChange={e => setAudience(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-blue-500 appearance-none"
                >
                  <option value="ambos">Nacionales y extranjeros</option>
                  <option value="extranjeros">Inversionistas extranjeros</option>
                  <option value="nacionales">Empresarios mexicanos</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Tono */}
            <div className="mb-5">
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Tono</label>
              <div className="relative">
                <select
                  value={tone}
                  onChange={e => setTone(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-blue-500 appearance-none"
                >
                  <option value="profesional">Profesional y directo</option>
                  <option value="consultivo">Consultivo y analítico</option>
                  <option value="oportunidad">Enfocado en oportunidad</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {loading ? 'Generando artículo…' : 'Generar artículo + LinkedIn'}
            </button>

            {error && (
              <p className="text-xs text-red-400 mt-2 text-center">{error}</p>
            )}
          </div>

          {/* Historial */}
          {history.length > 0 && (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Historial</h3>
              <div className="space-y-2">
                {history.map((h, i) => (
                  <button
                    key={i}
                    onClick={() => { setArticle(h.article); setLinkedin(h.linkedin); setActiveTab('article'); }}
                    className="w-full text-left bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 rounded-xl px-3 py-2 transition-colors"
                  >
                    <p className="text-xs font-medium text-white truncate">{h.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{h.date} · {h.cat.split(' ')[0]}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── PANEL DERECHO — OUTPUT ── */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">

          {/* Tabs */}
          <div className="flex border-b border-gray-800">
            {([
              { id: 'generate', icon: Sparkles, label: 'Inicio' },
              { id: 'article', icon: FileText, label: 'Artículo (Wisp)' },
              { id: 'linkedin', icon: Linkedin, label: 'Post LinkedIn' },
            ] as { id: Tab; icon: React.ElementType; label: string }[]).map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-3 text-xs font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                <tab.icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-5">
            {/* Tab: Inicio / estado vacío / loading */}
            {activeTab === 'generate' && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                {loading ? (
                  <>
                    <Loader2 className="h-10 w-10 text-blue-500 animate-spin mb-4" />
                    <p className="text-sm font-medium text-white mb-1">Generando contenido…</p>
                    <p className="text-xs text-gray-400">Claude está redactando el artículo y el post de LinkedIn</p>
                  </>
                ) : article ? (
                  <>
                    <div className="w-12 h-12 rounded-full bg-green-900/50 border border-green-800/50 flex items-center justify-center mb-4">
                      <Check className="h-5 w-5 text-green-400" />
                    </div>
                    <p className="text-sm font-medium text-white mb-1">Contenido listo</p>
                    <p className="text-xs text-gray-400">Revisa las pestañas Artículo y Post LinkedIn</p>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-10 w-10 text-gray-600 mb-4" />
                    <p className="text-sm font-medium text-gray-300 mb-1">Listo para generar</p>
                    <p className="text-xs text-gray-500 max-w-xs">
                      Selecciona la categoría del día, ajusta las opciones y presiona el botón azul. El artículo aparecerá aquí en ~20 segundos.
                    </p>
                  </>
                )}
              </div>
            )}

            {/* Tab: Artículo */}
            {activeTab === 'article' && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-white">Artículo — formato Wisp</p>
                    <p className="text-xs text-gray-400 mt-0.5">Copia y pega directamente en el editor de Wisp</p>
                  </div>
                  <button
                    onClick={() => copy(article, 'article')}
                    disabled={!article}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all disabled:opacity-30 ${
                      copiedArticle
                        ? 'bg-green-900/40 border-green-700/50 text-green-400'
                        : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {copiedArticle ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copiedArticle ? 'Copiado' : 'Copiar'}
                  </button>
                </div>
                <textarea
                  readOnly
                  value={article || 'Aún no has generado un artículo. Configura las opciones y haz clic en "Generar artículo + LinkedIn".'}
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 text-xs text-gray-300 font-mono leading-relaxed outline-none resize-none"
                  style={{ minHeight: '480px' }}
                />

                {article && (
                  <div className="mt-3 bg-blue-950/30 border border-blue-900/30 rounded-xl p-3">
                    <p className="text-xs text-blue-300 font-medium mb-1">Cómo publicar en Wisp</p>
                    <ol className="text-xs text-blue-200/80 space-y-1 list-decimal list-inside">
                      <li>Copia el texto completo con el botón de arriba</li>
                      <li>Ve a wisp.blog → New Post</li>
                      <li>Pega en el editor — el frontmatter se aplica automáticamente</li>
                      <li>Revisa y haz clic en Publish</li>
                    </ol>
                  </div>
                )}
              </div>
            )}

            {/* Tab: LinkedIn */}
            {activeTab === 'linkedin' && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-white">Post LinkedIn</p>
                    <p className="text-xs text-gray-400 mt-0.5">Copia, agrega la URL del artículo y publica</p>
                  </div>
                  <button
                    onClick={() => copy(linkedin, 'linkedin')}
                    disabled={!linkedin}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all disabled:opacity-30 ${
                      copiedLinkedin
                        ? 'bg-green-900/40 border-green-700/50 text-green-400'
                        : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {copiedLinkedin ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copiedLinkedin ? 'Copiado' : 'Copiar'}
                  </button>
                </div>
                <textarea
                  readOnly
                  value={linkedin || 'El post de LinkedIn aparecerá aquí junto con el artículo.'}
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 text-sm text-gray-300 leading-relaxed outline-none resize-none"
                  style={{ minHeight: '480px' }}
                />
                {linkedin && (
                  <div className="mt-3 bg-blue-950/30 border border-blue-900/30 rounded-xl p-3">
                    <p className="text-xs text-blue-300 font-medium mb-1">Antes de publicar</p>
                    <p className="text-xs text-blue-200/80">Reemplaza "growthbdm.com/blog" con la URL exacta del artículo que acabas de publicar en Wisp.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
