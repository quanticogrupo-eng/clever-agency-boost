import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  RotateCcw,
  Target,
  BarChart3,
  Settings,
  Users,
  Trophy,
  ShieldCheck,
  Wallet,
  Check,
} from "lucide-react";
import fymLogo from "@/assets/fym-logo.png";
import planilha from "@/assets/planilha-controle.png";
import felipe from "@/assets/felipe-torres.png";
import pedro from "@/assets/pedro-moro.png";

export const Route = createFileRoute("/proposta")({
  head: () => ({
    meta: [
      { title: "Proposta Comercial | FYM Group" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Proposta,
});

/* ------------------------ Editable primitives ------------------------ */

function useEditable(id: string, initial: string) {
  const [val, setVal] = useState(initial);
  useEffect(() => {
    try {
      const v = localStorage.getItem("fym-proposta:" + id);
      if (v !== null) setVal(v);
    } catch {
      // ignore
    }
  }, [id]);
  const save = useCallback(
    (next: string) => {
      setVal(next);
      try {
        localStorage.setItem("fym-proposta:" + id, next);
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
        "outline-none focus:ring-2 focus:ring-primary/40 rounded-sm px-0.5 -mx-0.5 " +
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
  bg = "white",
}: {
  index: number;
  total: number;
  children: React.ReactNode;
  bg?: "white" | "soft" | "dark";
}) {
  const bgClass =
    bg === "dark"
      ? "bg-[linear-gradient(135deg,#0F2A1C,#14693A)] text-white"
      : bg === "soft"
        ? "bg-[linear-gradient(180deg,#F2FBF5,#FFFFFF)] text-foreground"
        : "bg-white text-foreground";
  return (
    <section
      className={`relative w-full h-full ${bgClass} overflow-hidden flex flex-col`}
    >
      {/* header */}
      <header className="flex items-center justify-between px-10 md:px-16 pt-8">
        <div className="flex items-center gap-3">
          <img src={fymLogo} alt="FYM Group" className="h-9 w-auto" />
          <span
            className={`font-semibold tracking-tight ${bg === "dark" ? "text-white" : "text-foreground"}`}
          >
            FYM Group
          </span>
        </div>
        <span
          className={`text-xs font-medium tabular-nums ${bg === "dark" ? "text-white/70" : "text-muted-foreground"}`}
        >
          {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </header>

      {/* body */}
      <div className="flex-1 px-10 md:px-20 py-8 md:py-10 flex flex-col">
        {children}
      </div>

      {/* footer */}
      <footer
        className={`px-10 md:px-16 pb-6 text-[11px] tracking-wider uppercase ${bg === "dark" ? "text-white/50" : "text-muted-foreground"}`}
      >
        Proposta Comercial · Programa 90D Ops IA
      </footer>
    </section>
  );
}

function Kicker({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase ${dark ? "text-primary-glow" : "text-primary"}`}
    >
      <span
        className={`h-px w-8 ${dark ? "bg-primary-glow" : "bg-primary"}`}
      />
      {children}
    </div>
  );
}

/* --------------------------------- Slides --------------------------------- */

const TOTAL = 8;

function Slide1() {
  return (
    <Slide index={1} total={TOTAL} bg="dark">
      <div className="flex-1 flex flex-col justify-center max-w-5xl">
        <Kicker dark>Proposta Comercial</Kicker>
        <Editable
          id="s1-title"
          as="h1"
          className="mt-5 text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]"
          initial="Programa 90D Ops IA — Produtividade em 90 Dias"
        />
        <Editable
          id="s1-sub"
          as="p"
          multiline
          className="mt-7 text-xl md:text-2xl text-white/85 leading-relaxed max-w-4xl"
          initial="Aumente de 20% a 40% a produtividade da sua operação em até 90 dias com automação e IA — sem contratar mais gente."
        />
        <div className="mt-10 flex items-center gap-3 text-sm text-white/70">
          <span className="h-2 w-2 rounded-full bg-primary-glow" />
          <Editable id="s1-meta" initial="FYM Group · Automação & IA" />
        </div>
      </div>
    </Slide>
  );
}

function Slide2() {
  return (
    <Slide index={2} total={TOTAL} bg="soft">
      <div className="max-w-5xl">
        <Kicker>Objetivo</Kicker>
        <Editable
          id="s2-title"
          as="h2"
          className="mt-4 text-4xl md:text-6xl font-bold tracking-tight leading-tight"
          initial="Qual o principal objetivo do projeto?"
        />
      </div>

      <div className="mt-10 flex-1 flex items-center">
        <div className="relative max-w-5xl">
          <div className="absolute -left-4 top-0 bottom-0 w-1.5 rounded-full bg-primary" />
          <Editable
            id="s2-quote"
            as="p"
            multiline
            className="pl-8 text-2xl md:text-3xl leading-relaxed text-foreground/90 font-medium"
            initial="Aumentar de 20% a 40% a produtividade da sua agência em até 90 dias e colocar mais lucro no bolso da sua empresa com automação e IA aplicada ao dia a dia."
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-6 max-w-4xl">
        {[
          { k: "+20% a 40%", v: "Produtividade" },
          { k: "90 dias", v: "Prazo de entrega" },
          { k: "Mais lucro", v: "Sem aumentar equipe" },
        ].map((it) => (
          <div
            key={it.k}
            className="rounded-2xl bg-white border border-border p-5 shadow-[0_10px_30px_-15px_rgba(31,157,85,0.25)]"
          >
            <div className="text-2xl font-bold text-primary tracking-tight">
              {it.k}
            </div>
            <div className="text-sm text-muted-foreground mt-1">{it.v}</div>
          </div>
        ))}
      </div>
    </Slide>
  );
}

function Slide3() {
  return (
    <Slide index={3} total={TOTAL} bg="white">
      <div className="max-w-5xl">
        <Kicker>Mensuração</Kicker>
        <Editable
          id="s3-title"
          as="h2"
          className="mt-4 text-4xl md:text-5xl font-bold tracking-tight leading-tight"
          initial="Como vamos medir o nosso sucesso?"
        />
        <Editable
          id="s3-sub"
          as="p"
          multiline
          className="mt-3 text-lg text-muted-foreground max-w-3xl"
          initial="Através de uma planilha de controle de tempo economizado e de lucro:"
        />
      </div>

      <div className="mt-6 flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-5xl rounded-2xl border border-border bg-white shadow-[0_20px_50px_-20px_rgba(31,157,85,0.35)] overflow-hidden">
          <img
            src={planilha}
            alt="Planilha de controle de tempo economizado e lucro"
            className="w-full h-auto block"
          />
        </div>
        <Editable
          id="s3-foot"
          as="p"
          multiline
          className="mt-5 text-base md:text-lg text-foreground/80 text-center max-w-3xl"
          initial="Assim que atingirmos o aumento de produtividade de 20% a 40%, concluiremos nosso objetivo."
        />
      </div>
    </Slide>
  );
}

function Slide4() {
  const phases = [
    {
      icon: Target,
      tag: "30 dias",
      title: "Playbook",
      desc: "Playbook, métricas de tempo, dashboard e roadmap de automação.",
    },
    {
      icon: Settings,
      tag: "60 dias",
      title: "Implementação",
      desc: "3–5 automações ativas, documentações e vídeos de uso.",
    },
    {
      icon: BarChart3,
      tag: "90 dias",
      title: "Padronizar e Escalar",
      desc: "Ajustes, melhorias, novas automações menores e reunião mensal para apresentar o resultado.",
    },
  ];
  return (
    <Slide index={4} total={TOTAL} bg="soft">
      <div className="max-w-5xl">
        <Kicker>Método PIPE</Kicker>
        <Editable
          id="s4-title"
          as="h2"
          className="mt-4 text-4xl md:text-5xl font-bold tracking-tight leading-tight"
          initial="Como vamos automatizar a sua agência?"
        />
      </div>

      <div className="mt-10 flex-1 grid md:grid-cols-3 gap-6">
        {phases.map((p, i) => (
          <div
            key={p.title}
            className="rounded-2xl bg-white border border-border p-7 flex flex-col shadow-[0_10px_30px_-15px_rgba(31,157,85,0.25)]"
          >
            <div className="flex items-center justify-between">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <p.icon className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                {p.tag}
              </span>
            </div>
            <Editable
              id={`s4-t-${i}`}
              as="h3"
              className="mt-5 text-2xl font-bold tracking-tight"
              initial={p.title}
            />
            <Editable
              id={`s4-d-${i}`}
              as="p"
              multiline
              className="mt-2 text-base text-muted-foreground leading-relaxed"
              initial={p.desc}
            />
          </div>
        ))}
      </div>
    </Slide>
  );
}

function Slide5() {
  const clients = [
    {
      img: pedro,
      name: "Pedro Moro",
      handle: "@pedromoro93",
      desc: "Funis de Tráfego Pago (Perpétuo e Lançamento) · Top 01 HotmartPRO",
    },
    {
      img: felipe,
      name: "Felipe Torres",
      handle: "@ofelipetorresc",
      desc: "Metodologia de vendas validada · +200 empresas atendidas",
    },
  ];
  return (
    <Slide index={5} total={TOTAL} bg="white">
      <div className="max-w-5xl">
        <Kicker>Prova social</Kicker>
        <Editable
          id="s5-title"
          as="h2"
          className="mt-4 text-4xl md:text-5xl font-bold tracking-tight leading-tight"
          initial="Agências que confiaram no nosso trabalho"
        />
      </div>

      <div className="mt-10 flex-1 grid md:grid-cols-2 gap-8 items-center">
        {clients.map((c, i) => (
          <div
            key={c.name}
            className="rounded-2xl border border-border bg-white overflow-hidden shadow-[0_15px_40px_-20px_rgba(31,157,85,0.3)]"
          >
            <div className="bg-[linear-gradient(180deg,#F2FBF5,#FFFFFF)] p-2">
              <img
                src={c.img}
                alt={c.name}
                className="w-full h-auto block rounded-xl"
              />
            </div>
            <div className="p-6">
              <Editable
                id={`s5-n-${i}`}
                as="h3"
                className="text-2xl font-bold tracking-tight"
                initial={c.name}
              />
              <Editable
                id={`s5-h-${i}`}
                as="div"
                className="text-sm font-medium text-primary mt-0.5"
                initial={c.handle}
              />
              <Editable
                id={`s5-d-${i}`}
                as="p"
                multiline
                className="mt-2 text-sm text-muted-foreground leading-relaxed"
                initial={c.desc}
              />
            </div>
          </div>
        ))}
      </div>
    </Slide>
  );
}

function Slide6() {
  const blocks = [
    {
      icon: Trophy,
      title: "Resultado",
      items: [
        "+20% a +40% de produtividade em até 90 dias",
        "Mais margem sem aumentar equipe",
        "Menos retrabalho e tarefas manuais",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Probabilidade de sucesso",
      items: [
        "Método em 3 fases validado (Diagnóstico, Implementação, Otimização)",
        "Outras agências já automatizam sua operação conosco",
        "Painel de Produtividade para acompanhar o “antes e depois”",
      ],
    },
    {
      icon: BarChart3,
      title: "Tempo de espera",
      items: [
        "Projeto entregue em 90 dias",
        "Cronograma claro no método PIPE (30-60-90)",
      ],
    },
    {
      icon: Users,
      title: "Esforço e sacrifício do cliente",
      items: [
        "Implementação feita por nós",
        "Time treinado e processos documentados",
        "Sem precisar virar especialista em IA",
      ],
    },
  ];
  return (
    <Slide index={6} total={TOTAL} bg="soft">
      <div className="max-w-5xl">
        <Kicker>Por quê funciona</Kicker>
        <Editable
          id="s6-title"
          as="h2"
          className="mt-4 text-4xl md:text-5xl font-bold tracking-tight leading-tight"
          initial="Por que essa operação funciona?"
        />
      </div>

      <div className="mt-8 flex-1 grid md:grid-cols-2 gap-5">
        {blocks.map((b, i) => (
          <div
            key={b.title}
            className="rounded-2xl bg-white border border-border p-6 shadow-[0_10px_30px_-15px_rgba(31,157,85,0.2)]"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <b.icon className="h-5 w-5" />
              </div>
              <Editable
                id={`s6-t-${i}`}
                as="h3"
                className="text-xl font-bold tracking-tight"
                initial={b.title}
              />
            </div>
            <ul className="mt-4 space-y-2.5">
              {b.items.map((it, j) => (
                <li key={j} className="flex gap-2.5 text-[15px] leading-snug">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <Editable
                    id={`s6-i-${i}-${j}`}
                    as="span"
                    multiline
                    className="text-foreground/85"
                    initial={it}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Slide>
  );
}

function Slide7() {
  const e1 = [
    "Mapeamento completo da operação",
    "Identificação de gargalos e tarefas repetitivas",
    "Levantamento de oportunidades com IA e automação",
    "Criação do Playbook de Automação",
    "Roadmap personalizado de implementação",
  ];
  const e2 = [
    "Implementação das automações prioritárias",
    "Integrações e fluxos operacionais",
    "Ajustes e otimizações",
    "Treinamento e documentação da equipe",
  ];
  return (
    <Slide index={7} total={TOTAL} bg="white">
      <div className="max-w-5xl">
        <Kicker>Investimento</Kicker>
        <Editable
          id="s7-title"
          as="h2"
          className="mt-4 text-4xl md:text-5xl font-bold tracking-tight leading-tight"
          initial="Investimento"
        />
      </div>

      <div className="mt-8 flex-1 grid md:grid-cols-2 gap-6">
        {/* Etapa 1 */}
        <div className="rounded-2xl border border-border bg-white p-7 flex flex-col shadow-[0_10px_30px_-15px_rgba(31,157,85,0.25)]">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
            <Wallet className="h-4 w-4" /> Etapa 1
          </div>
          <Editable
            id="s7-e1-title"
            as="h3"
            className="mt-2 text-2xl font-bold tracking-tight"
            initial="Diagnóstico Estratégico"
          />
          <div className="mt-3 flex items-baseline gap-2">
            <Editable
              id="s7-e1-price"
              as="span"
              className="text-5xl font-bold tracking-tight text-primary"
              initial="R$ 997"
            />
          </div>
          <ul className="mt-5 space-y-2 flex-1">
            {e1.map((it, j) => (
              <li key={j} className="flex gap-2 text-[15px] leading-snug">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <Editable
                  id={`s7-e1-${j}`}
                  as="span"
                  multiline
                  className="text-foreground/85"
                  initial={it}
                />
              </li>
            ))}
          </ul>
          <div className="mt-5 pt-4 border-t border-border text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Prazo: </span>
            <Editable id="s7-e1-prazo" as="span" initial="30 dias" />
          </div>
        </div>

        {/* Etapa 2 */}
        <div className="rounded-2xl border-2 border-primary bg-[linear-gradient(180deg,#F2FBF5,#FFFFFF)] p-7 flex flex-col shadow-[0_20px_50px_-20px_rgba(31,157,85,0.4)]">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
            <Wallet className="h-4 w-4" /> Etapa 2
          </div>
          <Editable
            id="s7-e2-title"
            as="h3"
            className="mt-2 text-2xl font-bold tracking-tight"
            initial="Implementação"
          />
          <div className="mt-3 flex items-baseline gap-2">
            <Editable
              id="s7-e2-price"
              as="span"
              className="text-5xl font-bold tracking-tight text-primary"
              initial="R$ 3.000"
            />
          </div>
          <ul className="mt-5 space-y-2 flex-1">
            {e2.map((it, j) => (
              <li key={j} className="flex gap-2 text-[15px] leading-snug">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <Editable
                  id={`s7-e2-${j}`}
                  as="span"
                  multiline
                  className="text-foreground/85"
                  initial={it}
                />
              </li>
            ))}
          </ul>
          <div className="mt-5 pt-4 border-t border-primary/30">
            <div className="text-sm font-semibold text-foreground">
              Forma de pagamento
            </div>
            <ul className="mt-2 space-y-1 text-sm text-foreground/85">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <Editable
                  id="s7-pay-1"
                  as="span"
                  initial="R$ 1.500 no início da implementação"
                />
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <Editable
                  id="s7-pay-2"
                  as="span"
                  initial="R$ 1.500 na entrega do projeto"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Slide>
  );
}

function Slide8() {
  const items = [
    "Pelo menos 3 processos críticos automatizados",
    "Ganho mensurável de produtividade",
    "Redução operacional em pelo menos uma área da empresa",
  ];
  return (
    <Slide index={8} total={TOTAL} bg="dark">
      <div className="max-w-5xl">
        <Kicker dark>Garantia</Kicker>
        <Editable
          id="s8-title"
          as="h2"
          className="mt-4 text-4xl md:text-6xl font-bold tracking-tight leading-tight"
          initial="Garantia 90D Produtividade"
        />
        <Editable
          id="s8-sub"
          as="p"
          multiline
          className="mt-5 text-xl text-white/85 max-w-3xl"
          initial="Nosso compromisso é com resultado operacional real."
        />
      </div>

      <div className="mt-8 flex-1 grid md:grid-cols-[1.1fr_1fr] gap-8 items-center">
        <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-7">
          <div className="text-sm font-semibold text-primary-glow uppercase tracking-widest">
            Se ao final dos 90 dias sua operação não tiver:
          </div>
          <ul className="mt-5 space-y-3">
            {items.map((it, j) => (
              <li key={j} className="flex gap-3 text-lg leading-snug">
                <Check className="h-6 w-6 text-primary-glow shrink-0 mt-0.5" />
                <Editable
                  id={`s8-i-${j}`}
                  as="span"
                  multiline
                  className="text-white/90"
                  initial={it}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-[linear-gradient(135deg,#1F9D55,#4FCB82)] p-8 text-white shadow-[0_25px_60px_-20px_rgba(79,203,130,0.5)]">
          <ShieldCheck className="h-10 w-10" />
          <Editable
            id="s8-promise"
            as="p"
            multiline
            className="mt-4 text-2xl font-semibold leading-snug"
            initial="Nós continuamos trabalhando por mais 30 dias sem custo adicional de honorários do projeto."
          />
        </div>
      </div>
    </Slide>
  );
}

/* --------------------------------- Shell --------------------------------- */

const SLIDES = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8];

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
        .filter((k) => k.startsWith("fym-proposta:"))
        .forEach((k) => localStorage.removeItem(k));
    } catch {
      // ignore
    }
    location.reload();
  };

  const Current = SLIDES[i];

  return (
    <div className="min-h-screen bg-[#0B1410] text-foreground">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 px-4 md:px-8 py-3 bg-white border-b border-border print:hidden">
        <div className="flex items-center gap-2">
          <img src={fymLogo} alt="" className="h-6 w-auto" />
          <span className="text-sm font-semibold">Proposta · FYM Group</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => go(i - 1)}
            className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-border hover:bg-accent"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-xs tabular-nums text-muted-foreground min-w-[56px] text-center">
            {i + 1} / {SLIDES.length}
          </span>
          <button
            onClick={() => go(i + 1)}
            className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-border hover:bg-accent"
            aria-label="Próximo"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="w-px h-6 bg-border mx-1" />
          <button
            onClick={present}
            className="h-9 px-3 inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
          >
            <Maximize2 className="h-4 w-4" /> Apresentar
          </button>
          <button
            onClick={resetAll}
            className="h-9 px-3 inline-flex items-center gap-2 rounded-md border border-border text-sm hover:bg-accent"
          >
            <RotateCcw className="h-4 w-4" /> Restaurar
          </button>
        </div>
      </div>

      {/* Stage */}
      <div
        ref={containerRef}
        className="w-full bg-[#0B1410] flex items-center justify-center p-4 md:p-8"
        style={{ minHeight: "calc(100vh - 57px)" }}
      >
        <div
          className="w-full max-w-[1280px] aspect-[16/9] rounded-2xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] bg-white"
          style={{ maxHeight: "calc(100vh - 120px)" }}
        >
          <Current />
        </div>
      </div>
    </div>
  );
}
