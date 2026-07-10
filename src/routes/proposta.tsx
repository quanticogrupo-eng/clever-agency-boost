import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  RotateCcw,
  Compass,
  BadgeCheck,
  Megaphone,
  Handshake,
  TrendingUp,
  KeyRound,
  ClipboardList,
  Presentation,
  PenLine,
  Clapperboard,
  Rocket,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/proposta")({
  head: () => ({
    meta: [
      { title: "Proposta Comercial | Frota Performance" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Proposta,
});

/* ------------------------ Editable primitives ------------------------ */

const STORE = "frota-proposta:";
const ORANGE = "#F26A21";

function useEditable(id: string, initial: string) {
  const [val, setVal] = useState(initial);
  useEffect(() => {
    try {
      const v = localStorage.getItem(STORE + id);
      if (v !== null) setVal(v);
    } catch {
      // ignore
    }
  }, [id]);
  const save = useCallback(
    (next: string) => {
      setVal(next);
      try {
        localStorage.setItem(STORE + id, next);
      } catch {
        // ignore
      }
    },
    [id],
  );
  return [val, save] as const;
}

function Editable({
  id,
  initial,
  as: Tag = "span",
  className = "",
  multiline = false,
}: {
  id: string;
  initial: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  multiline?: boolean;
}) {
  const [val, save] = useEditable(id, initial);
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (ref.current && ref.current.innerText !== val) {
      ref.current.innerText = val;
    }
  }, [val]);
  const Comp = Tag as any;
  return (
    <Comp
      ref={ref as any}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      onBlur={(e: any) => save(e.currentTarget.innerText)}
      onKeyDown={(e: any) => {
        if (!multiline && e.key === "Enter") {
          e.preventDefault();
          (e.currentTarget as HTMLElement).blur();
        }
      }}
      className={
        "outline-none focus:ring-2 focus:ring-[#F26A21]/40 rounded-sm px-0.5 -mx-0.5 " +
        className
      }
    >
      {initial}
    </Comp>
  );
}

/* ------------------------------ Slide wrapper ------------------------------ */

function Slide({
  index,
  total,
  children,
}: {
  index: number;
  total: number;
  children: React.ReactNode;
}) {
  return (
    <section className="relative w-full h-full bg-white text-neutral-900 overflow-hidden flex flex-col">
      {/* header */}
      <header className="flex items-center justify-between px-10 md:px-16 pt-8">
        <div className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: ORANGE }}
          />
          <span className="text-sm font-bold tracking-tight text-neutral-900">
            Frota Performance
          </span>
        </div>
        <span className="text-xs font-medium tabular-nums text-neutral-500">
          {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </header>

      {/* accent bar */}
      <div
        className="mx-10 md:mx-16 mt-4 h-[3px] w-16 rounded-full"
        style={{ backgroundColor: ORANGE }}
      />

      {/* body */}
      <div className="flex-1 px-10 md:px-16 py-6 md:py-8 flex flex-col">
        {children}
      </div>

      {/* footer */}
      <footer className="px-10 md:px-16 pb-6 text-[11px] tracking-[0.2em] uppercase text-neutral-400 flex items-center justify-between">
        <span>Proposta Comercial · Clínicas de Harmonização Facial</span>
        <span>Frota Performance</span>
      </footer>
    </section>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.24em] uppercase"
      style={{ color: ORANGE }}
    >
      <span className="h-px w-8" style={{ backgroundColor: ORANGE }} />
      {children}
    </div>
  );
}

/* --------------------------------- Slides --------------------------------- */

const TOTAL = 9;

/* 1 — Capa */
function Slide1() {
  return (
    <Slide index={1} total={TOTAL}>
      <div className="flex-1 flex flex-col justify-center max-w-5xl">
        <Kicker>Proposta Comercial</Kicker>
        <Editable
          id="s1-title"
          as="h1"
          className="mt-6 text-6xl md:text-8xl font-black tracking-tight leading-[0.95]"
          initial="Frota Performance"
        />
        <div
          className="mt-6 h-1 w-24 rounded-full"
          style={{ backgroundColor: ORANGE }}
        />
        <Editable
          id="s1-sub"
          as="p"
          multiline
          className="mt-6 text-2xl md:text-3xl text-neutral-700 leading-snug max-w-4xl font-light"
          initial="Posicionamento, Tráfego e Crescimento para Clínicas de Harmonização Facial."
        />
        <Editable
          id="s1-foot"
          as="p"
          className="mt-12 text-sm text-neutral-500 tracking-wide"
          initial="Proposta comercial preparada para [Nome da Clínica]"
        />
      </div>
    </Slide>
  );
}

/* 2 — Quem somos */
function Slide2() {
  return (
    <Slide index={2} total={TOTAL}>
      <div className="max-w-5xl">
        <Kicker>Quem somos</Kicker>
        <Editable
          id="s2-title"
          as="h2"
          className="mt-5 text-5xl md:text-6xl font-black tracking-tight leading-[1.02]"
          initial="Especialistas em um único mercado."
        />
      </div>

      <div className="mt-10 flex-1 grid md:grid-cols-[1fr_auto] gap-10 items-start">
        <Editable
          id="s2-body"
          as="p"
          multiline
          className="text-xl md:text-2xl leading-relaxed text-neutral-700 max-w-3xl font-light"
          initial={
            "A Frota Performance é uma assessoria de marketing e vendas especializada exclusivamente em clínicas de harmonização facial. Não atendemos dezenas de nichos ao mesmo tempo — cada estratégia, cada criativo, cada campanha é pensada só para esse mercado, incluindo as regras específicas de publicidade do CFM e do CFO.\n\nNosso trabalho começa onde o da maioria termina: não vendemos tráfego, vendemos crescimento real de faturamento — porque só ganhamos de verdade quando sua clínica também ganha."
          }
        />

        <div className="flex flex-col gap-4 md:pl-6 md:border-l md:border-neutral-200 min-w-[220px]">
          {[
            { k: "1 nicho", v: "Harmonização facial" },
            { k: "CFM + CFO", v: "Anúncios em conformidade" },
            { k: "Parceria", v: "Ganhamos quando você ganha" },
          ].map((it) => (
            <div key={it.k}>
              <div
                className="text-3xl font-black tracking-tight"
                style={{ color: ORANGE }}
              >
                {it.k}
              </div>
              <div className="text-sm text-neutral-500 mt-1">{it.v}</div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* 3 — Objetivo */
function Slide3() {
  return (
    <Slide index={3} total={TOTAL}>
      <div className="max-w-5xl">
        <Kicker>Nosso objetivo com você</Kicker>
        <Editable
          id="s3-title"
          as="h2"
          className="mt-5 text-5xl md:text-6xl font-black tracking-tight leading-[1.02]"
          initial="Referência regional. Agenda previsível."
        />
      </div>

      <div className="mt-12 flex-1 flex items-center">
        <div className="relative max-w-4xl">
          <div
            className="absolute -left-5 top-1 bottom-1 w-1.5 rounded-full"
            style={{ backgroundColor: ORANGE }}
          />
          <Editable
            id="s3-body"
            as="p"
            multiline
            className="pl-8 text-2xl md:text-[26px] leading-relaxed text-neutral-800 font-light"
            initial={
              "Nosso objetivo não é gerar leads ou rodar campanha. É transformar sua clínica em uma referência regional em harmonização facial, com agenda previsível, pacientes qualificados todos os meses e crescimento sustentável que não depende só de indicação.\n\nNão trabalhamos pra entregar número bonito de relatório. Trabalhamos pra você faturar mais — porque é assim que nós também crescemos."
            }
          />
        </div>
      </div>
    </Slide>
  );
}

/* 4 — Diferencial */
function Slide4() {
  return (
    <Slide index={4} total={TOTAL}>
      <div className="max-w-5xl">
        <Kicker>Nosso diferencial</Kicker>
        <Editable
          id="s4-title"
          as="h2"
          className="mt-5 text-5xl md:text-6xl font-black tracking-tight leading-[1.02]"
          initial="O que nos torna diferentes."
        />
      </div>

      <div className="mt-10 flex-1 grid md:grid-cols-2 gap-10">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-neutral-400">
            A maioria das agências
          </div>
          <Editable
            id="s4-generic"
            as="p"
            multiline
            className="mt-3 text-lg md:text-xl leading-relaxed text-neutral-600 font-light"
            initial={
              "Atende dezenas de nichos ao mesmo tempo — de dentista a loja de roupa, de advogado a estética. Resultado: criativo genérico, estratégia genérica, resultado genérico."
            }
          />
        </div>

        <div className="md:pl-8 md:border-l-2" style={{ borderColor: ORANGE }}>
          <div
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: ORANGE }}
          >
            Frota Performance
          </div>
          <Editable
            id="s4-us"
            as="p"
            multiline
            className="mt-3 text-lg md:text-xl leading-relaxed text-neutral-800"
            initial={
              "Atendemos só clínicas de harmonização facial. Conhecemos as objeções, a linguagem e o comportamento de compra da sua paciente, e garantimos anúncios sempre dentro das normas do CFM e CFO — sem risco de banimento ou multa.\n\nE o mais importante: nosso modelo de parceria é construído para que a gente só ganhe de verdade quando você ganhar."
            }
          />
        </div>
      </div>
    </Slide>
  );
}

/* 5 — Método PATCE */
function Slide5() {
  const patce = [
    {
      l: "P",
      title: "Posicionamento",
      desc: "Como sua clínica é percebida no mercado e o que te diferencia da concorrência.",
      icon: Compass,
    },
    {
      l: "A",
      title: "Autoridade",
      desc: "Construção de confiança e reconhecimento como referência na sua região.",
      icon: BadgeCheck,
    },
    {
      l: "T",
      title: "Tráfego",
      desc: "Gestão de anúncios (Meta + Google) feita só pra harmonização facial.",
      icon: Megaphone,
    },
    {
      l: "C",
      title: "Comercial",
      desc: "Estruturação do atendimento e follow-up para transformar lead em paciente agendado.",
      icon: Handshake,
    },
    {
      l: "E",
      title: "Escala",
      desc: "Crescimento sustentável e previsível, mês após mês.",
      icon: TrendingUp,
    },
  ];
  return (
    <Slide index={5} total={TOTAL}>
      <div className="max-w-5xl">
        <Kicker>Nosso método próprio</Kicker>
        <Editable
          id="s5-title"
          as="h2"
          className="mt-5 text-5xl md:text-6xl font-black tracking-tight leading-[1.02]"
          initial="Método PATCE"
        />
      </div>

      <div className="mt-8 flex-1 grid grid-cols-5 gap-4">
        {patce.map((p, i) => {
          const Icon = p.icon;
          return (
            <div
              key={p.l}
              className="rounded-2xl border border-neutral-200 bg-white p-5 flex flex-col"
            >
              <div className="flex items-center justify-between">
                <div
                  className="text-5xl font-black leading-none"
                  style={{ color: ORANGE }}
                >
                  {p.l}
                </div>
                <Icon
                  className="h-6 w-6"
                  style={{ color: ORANGE }}
                  strokeWidth={2}
                />
              </div>
              <Editable
                id={`s5-t-${i}`}
                as="h3"
                className="mt-4 text-xl font-bold tracking-tight text-neutral-900"
                initial={p.title}
              />
              <Editable
                id={`s5-d-${i}`}
                as="p"
                multiline
                className="mt-2 text-[13px] leading-relaxed text-neutral-600"
                initial={p.desc}
              />
            </div>
          );
        })}
      </div>

      <Editable
        id="s5-foot"
        as="p"
        multiline
        className="mt-8 text-lg md:text-xl text-neutral-700 max-w-4xl font-light"
        initial="Não é só tráfego. É um sistema completo, do primeiro clique até o paciente sentado na sua cadeira."
      />
    </Slide>
  );
}

/* 6 — Como funciona a entrega */
function Slide6() {
  const steps = [
    { icon: KeyRound, title: "Coleta de acessos", desc: "Configuramos o acesso às suas contas de tráfego com segurança." },
    { icon: ClipboardList, title: "Onboarding", desc: "Entendemos a fundo sua clínica, sua região e sua concorrência." },
    { icon: Presentation, title: "Apresentação da estratégia", desc: "Te mostramos exatamente o plano antes de qualquer ação." },
    { icon: PenLine, title: "Criação das copys", desc: "Escrevemos toda a comunicação da sua campanha." },
    { icon: Clapperboard, title: "Artes e edição de vídeo", desc: "Produzimos o material visual completo." },
    { icon: Rocket, title: "Subimos as campanhas", desc: "E sua clínica já está no ar." },
  ];
  return (
    <Slide index={6} total={TOTAL}>
      <div className="max-w-5xl">
        <Kicker>Como funciona a entrega</Kicker>
        <Editable
          id="s6-title"
          as="h2"
          className="mt-5 text-5xl md:text-6xl font-black tracking-tight leading-[1.02]"
          initial="Como funciona, na prática."
        />
      </div>

      <div className="mt-8 flex-1 grid grid-cols-3 gap-x-6 gap-y-5">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="flex gap-4">
              <div
                className="text-4xl font-black leading-none tabular-nums shrink-0"
                style={{ color: ORANGE }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" style={{ color: ORANGE }} />
                  <Editable
                    id={`s6-t-${i}`}
                    as="h3"
                    className="text-lg font-bold tracking-tight text-neutral-900"
                    initial={s.title}
                  />
                </div>
                <Editable
                  id={`s6-d-${i}`}
                  as="p"
                  multiline
                  className="mt-1 text-sm leading-relaxed text-neutral-600"
                  initial={s.desc}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="mt-8 rounded-xl px-6 py-4 flex items-center gap-4 text-white"
        style={{ backgroundColor: ORANGE }}
      >
        <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-80">
          Prazo
        </span>
        <Editable
          id="s6-prazo"
          as="span"
          className="text-lg md:text-xl font-semibold"
          initial="Em até 15 dias, sua campanha está rodando."
        />
      </div>
    </Slide>
  );
}

/* 7 — O que o mercado cobra */
function Slide7() {
  return (
    <Slide index={7} total={TOTAL}>
      <div className="max-w-5xl">
        <Kicker>Investimento · Mercado</Kicker>
        <Editable
          id="s7-title"
          as="h2"
          className="mt-5 text-5xl md:text-6xl font-black tracking-tight leading-[1.02]"
          initial="O que o mercado cobra hoje."
        />
      </div>

      <div className="mt-10 flex-1 grid md:grid-cols-[1fr_1.1fr] gap-12 items-center">
        <div>
          <div className="text-sm font-bold uppercase tracking-widest text-neutral-400">
            Agências genéricas
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-neutral-400 text-2xl">A partir de</span>
          </div>
          <Editable
            id="s7-price"
            as="div"
            className="mt-1 text-[120px] md:text-[160px] font-black leading-none tracking-tighter"
            initial="R$ 2.500"
          />
          <div className="mt-2 text-lg text-neutral-500">
            por mês · só de taxa de gestão
          </div>

          {/* comparison bar */}
          <div className="mt-8">
            <div className="h-3 w-full rounded-full bg-neutral-100 overflow-hidden">
              <div
                className="h-full"
                style={{ backgroundColor: ORANGE, width: "100%" }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-neutral-400 uppercase tracking-widest">
              <span>Taxa fixa mensal</span>
              <span>R$ 2.500</span>
            </div>
          </div>
        </div>

        <div>
          <Editable
            id="s7-body"
            as="p"
            multiline
            className="text-xl md:text-2xl leading-relaxed text-neutral-700 font-light"
            initial={
              "Agências de tráfego genéricas, que atendem 50 nichos diferentes ao mesmo tempo, normalmente cobram a partir de R$ 2.500 por mês, só de taxa de gestão."
            }
          />
          <div
            className="mt-8 border-l-4 pl-6"
            style={{ borderColor: ORANGE }}
          >
            <Editable
              id="s7-note"
              as="p"
              multiline
              className="text-lg md:text-xl leading-relaxed text-neutral-800 font-medium"
              initial={
                "E o que poucos clientes percebem: na maioria das vezes, essas agências investem mais dinheiro na própria taxa de gestão delas do que no tráfego que efetivamente traz pacientes pra sua clínica."
              }
            />
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* 8 — Nosso investimento */
function Slide8() {
  return (
    <Slide index={8} total={TOTAL}>
      <div className="max-w-5xl">
        <Kicker>Nosso investimento</Kicker>
        <Editable
          id="s8-title"
          as="h2"
          className="mt-5 text-5xl md:text-6xl font-black tracking-tight leading-[1.02]"
          initial="Como trabalhamos com você."
        />
      </div>

      <div className="mt-8 flex-1 grid md:grid-cols-2 gap-6">
        <div
          className="rounded-3xl p-8 flex flex-col justify-between text-white"
          style={{ backgroundColor: ORANGE }}
        >
          <div className="text-xs font-bold uppercase tracking-[0.24em] opacity-80">
            Investimento fixo
          </div>
          <div>
            <Editable
              id="s8-fixo"
              as="div"
              className="text-[120px] md:text-[160px] font-black leading-none tracking-tighter"
              initial="R$ 1.000"
            />
            <div className="mt-2 text-lg opacity-90">
              menos da metade do mercado
            </div>
          </div>
          {/* bar */}
          <div>
            <div className="h-3 w-full rounded-full bg-white/25 overflow-hidden">
              <div
                className="h-full bg-white"
                style={{ width: "40%" }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs uppercase tracking-widest opacity-80">
              <span>vs. R$ 2.500 do mercado</span>
              <span>40%</span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border-2 border-neutral-900 p-8 flex flex-col justify-between bg-white">
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-neutral-500">
            Comissão por venda
          </div>
          <div>
            <Editable
              id="s8-comissao"
              as="div"
              className="text-[120px] md:text-[160px] font-black leading-none tracking-tighter text-neutral-900"
              initial="10%"
            />
            <div className="mt-2 text-lg text-neutral-500">
              sobre cada venda gerada
            </div>
          </div>
          <Editable
            id="s8-body"
            as="p"
            multiline
            className="text-[15px] leading-relaxed text-neutral-700"
            initial={
              "Não queremos ser mais uma agência com 200 clientes pequenos. Queremos 10 clientes bons, que faturam bem, e crescer junto. Quando sua clínica fatura mais, nós faturamos mais — a gente só fica rico se você também ficar."
            }
          />
        </div>
      </div>
    </Slide>
  );
}

/* 9 — Fechamento */
function Slide9() {
  return (
    <Slide index={9} total={TOTAL}>
      <div className="max-w-5xl">
        <Kicker>Fechamento</Kicker>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-5xl">
        <Editable
          id="s9-title"
          as="h2"
          className="text-6xl md:text-8xl font-black tracking-tight leading-[0.95]"
          initial="Vamos começar?"
        />
        <div
          className="mt-6 h-1 w-24 rounded-full"
          style={{ backgroundColor: ORANGE }}
        />
        <Editable
          id="s9-body"
          as="p"
          multiline
          className="mt-8 text-2xl md:text-3xl leading-snug text-neutral-700 max-w-4xl font-light"
          initial={
            "Em 15 dias sua clínica pode estar com posicionamento, autoridade e tráfego rodando, com uma parceria que só faz sentido pra nós se fizer sentido pro seu faturamento também."
          }
        />

        <div className="mt-12">
          <button
            className="inline-flex items-center gap-3 rounded-full px-10 py-5 text-white text-xl md:text-2xl font-bold shadow-[0_20px_50px_-15px_rgba(242,106,33,0.55)] hover:opacity-95 transition"
            style={{ backgroundColor: ORANGE }}
          >
            <Editable
              id="s9-cta"
              as="span"
              initial="Quero começar agora"
            />
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </Slide>
  );
}

/* --------------------------------- Shell --------------------------------- */

const SLIDES = [
  Slide1,
  Slide2,
  Slide3,
  Slide4,
  Slide5,
  Slide6,
  Slide7,
  Slide8,
  Slide9,
];

function Proposta() {
  const [i, setI] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const go = useCallback(
    (n: number) => setI((p) => Math.max(0, Math.min(SLIDES.length - 1, n))),
    [],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        (e.target as HTMLElement)?.isContentEditable ||
        (e.target as HTMLElement)?.tagName === "INPUT"
      )
        return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown")
        go(i + 1);
      if (e.key === "ArrowLeft" || e.key === "PageUp") go(i - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [i, go]);

  const present = async () => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) await document.exitFullscreen();
    else await el.requestFullscreen?.();
  };

  const resetAll = () => {
    if (!confirm("Restaurar todos os textos originais da proposta?")) return;
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith(STORE))
        .forEach((k) => localStorage.removeItem(k));
    } catch {
      // ignore
    }
    location.reload();
  };

  const Current = SLIDES[i];

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 px-4 md:px-8 py-3 bg-white border-b border-neutral-200 print:hidden">
        <div className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: ORANGE }}
          />
          <span className="text-sm font-bold">
            Proposta · Frota Performance
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => go(i - 1)}
            className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-neutral-200 hover:bg-neutral-50"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-xs tabular-nums text-neutral-500 min-w-[56px] text-center">
            {i + 1} / {SLIDES.length}
          </span>
          <button
            onClick={() => go(i + 1)}
            className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-neutral-200 hover:bg-neutral-50"
            aria-label="Próximo"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="w-px h-6 bg-neutral-200 mx-1" />
          <button
            onClick={present}
            className="h-9 px-3 inline-flex items-center gap-2 rounded-md text-white text-sm font-medium hover:opacity-90"
            style={{ backgroundColor: ORANGE }}
          >
            <Maximize2 className="h-4 w-4" /> Apresentar
          </button>
          <button
            onClick={resetAll}
            className="h-9 px-3 inline-flex items-center gap-2 rounded-md border border-neutral-200 text-sm hover:bg-neutral-50"
          >
            <RotateCcw className="h-4 w-4" /> Restaurar
          </button>
        </div>
      </div>

      {/* Stage */}
      <div
        ref={containerRef}
        className="w-full bg-neutral-100 flex items-center justify-center p-4 md:p-8"
        style={{ minHeight: "calc(100vh - 57px)" }}
      >
        <div
          className="w-full max-w-[1280px] aspect-[16/9] rounded-2xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)] bg-white border border-neutral-200"
          style={{ maxHeight: "calc(100vh - 120px)" }}
        >
          <Current />
        </div>
      </div>
    </div>
  );
}
