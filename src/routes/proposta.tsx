import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  RotateCcw,
  Download,
  Sparkles,
  Target,
  Search,
  Settings,
  TrendingUp,
  Gift,
  ShieldCheck,
  Clock,
  Users,
  Zap,
  Check,
  Trophy,
  BarChart3,
  AlertTriangle,
} from "lucide-react";
import fymLogo from "@/assets/fym-logo.png";

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
    } catch {}
  }, [id]);
  const save = useCallback(
    (next: string) => {
      setVal(next);
      try {
        localStorage.setItem("fym-proposta:" + id, next);
      } catch {}
    },
    [id],
  );
  return [val, save] as const;
}

function Editable({
  id,
  initial,
  className = "",
  as: As = "span",
  multiline = false,
}: {
  id: string;
  initial: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  multiline?: boolean;
}) {
  const [val, save] = useEditable(id, initial);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (ref.current && ref.current.innerText !== val) {
      ref.current.innerText = val;
    }
  }, [val]);

  return (
    <As
      ref={ref as never}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      onBlur={(e: React.FocusEvent<HTMLElement>) => save(e.currentTarget.innerText)}
      onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
        if (!multiline && e.key === "Enter") {
          e.preventDefault();
          (e.currentTarget as HTMLElement).blur();
        }
      }}
      className={
        "outline-none rounded-md focus:ring-2 focus:ring-primary/40 focus:bg-primary/5 hover:bg-primary/5 transition-colors px-1 -mx-1 " +
        className
      }
    />
  );
}

/* ------------------------------ Layout ------------------------------ */

function Slide({
  n,
  total,
  tag,
  children,
  variant = "light",
}: {
  n: number;
  total: number;
  tag?: string;
  children: React.ReactNode;
  variant?: "light" | "tint" | "dark";
}) {
  const bg =
    variant === "dark"
      ? "bg-[image:var(--gradient-primary)] text-primary-foreground"
      : variant === "tint"
        ? "bg-secondary text-foreground"
        : "bg-background text-foreground";

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-soft)] ${bg}`}
      style={{ aspectRatio: "16 / 9" }}
    >
      <div className="absolute inset-0 flex flex-col p-8 md:p-14">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src={fymLogo} alt="FYM Group" className="h-8 w-8 rounded-md object-cover" />
            <span
              className={`text-sm font-semibold tracking-tight ${
                variant === "dark" ? "text-primary-foreground" : "text-foreground"
              }`}
            >
              FYM Group
            </span>
          </div>
          {tag && (
            <span
              className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${
                variant === "dark" ? "text-primary-foreground/80" : "text-primary"
              }`}
            >
              {tag}
            </span>
          )}
        </div>
        <div className="mt-6 flex-1 min-h-0">{children}</div>
        <div
          className={`mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] ${
            variant === "dark" ? "text-primary-foreground/70" : "text-muted-foreground"
          }`}
        >
          <span>Proposta Comercial · Programa 90D Ops IA</span>
          <span>
            {String(n).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}

/* --------------------------- Slide builders --------------------------- */

const TOTAL = 15;

function S1() {
  return (
    <Slide n={1} total={TOTAL} variant="dark">
      <div className="flex h-full flex-col justify-center">
        <Editable
          id="s1-eyebrow"
          initial="Proposta Comercial"
          className="text-xs font-semibold uppercase tracking-[0.25em] opacity-90"
        />
        <Editable
          as="h1"
          id="s1-title"
          initial="Programa 90D Ops IA"
          className="mt-4 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]"
        />
        <Editable
          as="p"
          id="s1-sub"
          initial="Aumente de 20% a 40% a produtividade da sua operação em até 90 dias com automação e IA — sem contratar mais gente."
          multiline
          className="mt-6 max-w-3xl text-lg md:text-2xl opacity-95 leading-snug"
        />
        <div className="mt-10 flex flex-wrap gap-6 text-sm opacity-90">
          <Editable id="s1-meta1" initial="Preparado para: [Cliente]" />
          <span className="opacity-50">·</span>
          <Editable id="s1-meta2" initial="Por: FYM Group" />
          <span className="opacity-50">·</span>
          <Editable id="s1-meta3" initial="Validade: 7 dias" />
        </div>
      </div>
    </Slide>
  );
}

function S2() {
  return (
    <Slide n={2} total={TOTAL} tag="O resultado dos sonhos">
      <div className="grid h-full gap-8 md:grid-cols-5">
        <div className="md:col-span-3 flex flex-col justify-center">
          <Editable
            as="h2"
            id="s2-title"
            initial="Mais produtividade. Mais margem. Mesma equipe."
            className="text-3xl md:text-5xl font-bold tracking-tight leading-tight"
          />
          <Editable
            as="p"
            id="s2-sub"
            initial="Em 90 dias, sua operação executa mais com menos esforço — liberando dezenas de horas por mês e recuperando margem com IA aplicada aos seus processos."
            multiline
            className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl"
          />
        </div>
        <div className="md:col-span-2 grid grid-cols-2 gap-3">
          {[
            { k: "s2-k1", v: "s2-v1", kInit: "+20–40%", vInit: "Produtividade da operação" },
            { k: "s2-k2", v: "s2-v2", kInit: "20–40h", vInit: "Liberadas por mês" },
            { k: "s2-k3", v: "s2-v3", kInit: "3–5", vInit: "Processos automatizados" },
            { k: "s2-k4", v: "s2-v4", kInit: "90 dias", vInit: "Para sentir o resultado" },
          ].map((c) => (
            <div
              key={c.k}
              className="rounded-xl border border-border bg-secondary/60 p-5 flex flex-col justify-between"
            >
              <Editable id={c.k} initial={c.kInit} className="text-3xl font-bold text-primary" />
              <Editable
                id={c.v}
                initial={c.vInit}
                className="mt-2 text-xs uppercase tracking-wider text-muted-foreground"
              />
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

function S3() {
  const items = [
    { Icon: AlertTriangle, id: "s3-i1", t: "Operação travada e dependente de pessoas" },
    { Icon: Clock, id: "s3-i2", t: "Muito trabalho manual e repetitivo" },
    { Icon: TrendingUp, id: "s3-i3", t: "Dificuldade de escalar sem aumentar custos" },
    { Icon: Users, id: "s3-i4", t: "Equipe sobrecarregada e margem comprimida" },
  ];
  return (
    <Slide n={3} total={TOTAL} tag="O Problema" variant="tint">
      <div className="flex h-full flex-col">
        <Editable
          as="h2"
          id="s3-title"
          initial="Onde sua operação está perdendo dinheiro hoje"
          className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl"
        />
        <div className="mt-8 grid flex-1 grid-cols-1 gap-3 md:grid-cols-2">
          {items.map(({ Icon, id, t }) => (
            <div
              key={id}
              className="flex items-center gap-4 rounded-xl border border-border bg-background p-5"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <Editable id={id} initial={t} className="text-base md:text-lg font-medium" />
            </div>
          ))}
        </div>
        <Editable
          as="p"
          id="s3-foot"
          initial="Você sabe que poderia faturar mais — mas a operação não acompanha."
          className="mt-6 text-lg font-medium"
        />
      </div>
    </Slide>
  );
}

function S4() {
  return (
    <Slide n={4} total={TOTAL} tag="A Solução">
      <div className="flex h-full flex-col justify-center max-w-4xl">
        <Editable
          as="h2"
          id="s4-title"
          initial="Programa 90D Ops IA"
          className="text-4xl md:text-6xl font-bold tracking-tight text-primary"
        />
        <Editable
          as="p"
          id="s4-sub"
          initial="Não é curso. Não é mentoria genérica. É implementação dentro da sua operação por 90 dias, com método validado em 3 fases e foco em horas economizadas + processos automatizados."
          multiline
          className="mt-5 text-lg md:text-2xl text-muted-foreground leading-snug"
        />
        <div className="mt-8 grid grid-cols-3 gap-3">
          {[
            { id: "s4-p1", t: "Diagnóstico" },
            { id: "s4-p2", t: "Implementação" },
            { id: "s4-p3", t: "Otimização" },
          ].map((p) => (
            <div
              key={p.id}
              className="rounded-xl border-2 border-primary/30 bg-secondary/50 p-5 text-center"
            >
              <Editable id={p.id} initial={p.t} className="text-lg font-semibold text-primary" />
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

function S5() {
  const phases = [
    { Icon: Search, id: "s5-p1", t: "Fase 1 · Diagnóstico", d: "Semanas 1–2: mapeamos onde o time queima horas e priorizamos automações por impacto." },
    { Icon: Settings, id: "s5-p2", t: "Fase 2 · Implementação", d: "Semanas 3–8: 3 a 5 automações de maior impacto em produção, integradas às ferramentas atuais." },
    { Icon: TrendingUp, id: "s5-p3", t: "Fase 3 · Otimização", d: "Semanas 9–12: ajustes finos, novos atalhos e painel medindo ganho real de produtividade." },
  ];
  return (
    <Slide n={5} total={TOTAL} tag="O Método">
      <div className="flex h-full flex-col">
        <Editable
          as="h2"
          id="s5-title"
          initial="Como aumentamos sua chance de sucesso"
          className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl"
        />
        <div className="mt-8 grid flex-1 gap-4 md:grid-cols-3">
          {phases.map(({ Icon, id, t, d }) => (
            <div
              key={id}
              className="rounded-2xl border border-border bg-background p-6 flex flex-col"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground">
                <Icon className="h-6 w-6" />
              </div>
              <Editable id={id} initial={t} className="mt-5 text-xl font-bold" />
              <Editable
                id={id + "d"}
                initial={d}
                multiline
                className="mt-3 text-sm text-muted-foreground leading-relaxed"
              />
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

function PhaseDetail({
  n,
  tag,
  title,
  subtitle,
  bullets,
  prefix,
  Icon,
}: {
  n: number;
  tag: string;
  title: string;
  subtitle: string;
  bullets: string[];
  prefix: string;
  Icon: typeof Search;
}) {
  return (
    <Slide n={n} total={TOTAL} tag={tag} variant="tint">
      <div className="grid h-full gap-10 md:grid-cols-5">
        <div className="md:col-span-2 flex flex-col justify-center">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] text-primary-foreground">
            <Icon className="h-7 w-7" />
          </div>
          <Editable
            as="h2"
            id={prefix + "-title"}
            initial={title}
            className="mt-5 text-3xl md:text-5xl font-bold tracking-tight leading-tight"
          />
          <Editable
            as="p"
            id={prefix + "-sub"}
            initial={subtitle}
            multiline
            className="mt-4 text-base md:text-lg text-muted-foreground"
          />
        </div>
        <div className="md:col-span-3 flex flex-col justify-center gap-3">
          {bullets.map((b, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border border-border bg-background p-4"
            >
              <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              <Editable id={prefix + "-b" + i} initial={b} multiline className="text-base" />
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

function S6() {
  return (
    <PhaseDetail
      n={6}
      tag="Fase 1 · Dias 1–30"
      Icon={Search}
      prefix="s6"
      title="Diagnóstico de Produtividade"
      subtitle="Mapeamos sua operação e descobrimos onde o time está queimando horas — antes de automatizar qualquer coisa."
      bullets={[
        "Mapeamento dos principais processos da operação",
        "Levantamento de tempo gasto por tarefa nas áreas críticas",
        "Painel inicial mostrando onde o time queima horas",
        "Roadmap de 5–10 automações priorizadas por impacto",
      ]}
    />
  );
}

function S7() {
  return (
    <PhaseDetail
      n={7}
      tag="Fase 2 · Dias 31–60"
      Icon={Settings}
      prefix="s7"
      title="Implementação das Automações"
      subtitle="3 a 5 automações de maior impacto entrando em produção, integradas às ferramentas que você já usa."
      bullets={[
        "Configuração de 3 a 5 automações em vendas, atendimento e operação",
        "Integração com CRM, WhatsApp, e-mail, planilhas e ferramentas atuais",
        "Testes, ajustes e validação junto com o time",
        "Vídeos tutoriais e documentação simples de cada fluxo",
      ]}
    />
  );
}

function S8() {
  return (
    <PhaseDetail
      n={8}
      tag="Fase 3 · Dias 61–90"
      Icon={TrendingUp}
      prefix="s8"
      title="Otimização e Suporte"
      subtitle="Acompanhamos o uso real, refinamos as automações e medimos o ganho de produtividade — antes vs. depois."
      bullets={[
        "Monitoramento das automações e correções finas",
        "Novas melhorias e atalhos conforme o uso real do time",
        "Reuniões de revisão com painel de produtividade (antes/depois)",
        "Suporte ativo durante todo o ciclo de 90 dias",
      ]}
    />
  );
}

function S9() {
  const cases = [
    {
      id: "c1",
      name: "Pedro Moro",
      niche: "Funis de Tráfego Pago · Top 01 HotmartPRO",
      d1: "9.098 seguidores · MBAs em Tráfego, Marketing e Vendas",
      d2: "Sócio @alcancecerto.br · +20 CLTs na equipe",
    },
    {
      id: "c2",
      name: "Felipe Torres",
      niche: "Implementação Comercial",
      d1: "15,9 mil seguidores",
      d2: "propulsaocloser.com.br",
    },
  ];
  return (
    <Slide n={9} total={TOTAL} tag="Cases">
      <div className="flex h-full flex-col">
        <Editable
          as="h2"
          id="s9-title"
          initial="Clientes que já estão automatizando sua agência"
          className="text-3xl md:text-5xl font-bold tracking-tight max-w-4xl text-primary"
        />
        <div className="mt-8 grid flex-1 gap-5 md:grid-cols-2">
          {cases.map((c) => (
            <div
              key={c.id}
              className="rounded-2xl border-t-4 border-primary bg-secondary/60 p-6 flex flex-col"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground">
                  <Trophy className="h-6 w-6" />
                </div>
                <Editable id={c.id + "-name"} initial={c.name} className="text-2xl font-bold" />
              </div>
              <Editable
                id={c.id + "-niche"}
                initial={c.niche}
                className="mt-4 text-sm font-semibold text-primary"
              />
              <Editable
                id={c.id + "-d1"}
                initial={c.d1}
                className="mt-3 text-sm text-muted-foreground"
              />
              <Editable
                id={c.id + "-d2"}
                initial={c.d2}
                className="mt-1.5 text-sm text-muted-foreground"
              />
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

function S10() {
  const rows = [
    { id: "r1", a: "R$ 0,24", b: "1305", c: "R$ 10,84", d: "R$ 1,00", e: "R$ 313,31" },
    { id: "r2", a: "R$ 0,24", b: "0", c: "R$ 0,00", d: "R$ 0,00", e: "R$ 0,00" },
    { id: "r3", a: "R$ 0,24", b: "0", c: "R$ 0,00", d: "R$ 0,00", e: "R$ 0,00" },
    { id: "r4", a: "R$ 0,24", b: "5220", c: "R$ 43,35", d: "R$ 0,00", e: "R$ 1.257,23" },
  ];
  return (
    <Slide n={10} total={TOTAL} tag="Planilha de ROI" variant="dark">
      <div className="grid h-full gap-8 md:grid-cols-5">
        <div className="md:col-span-2 flex flex-col justify-center">
          <Editable
            as="h2"
            id="s10-title"
            initial="O que um playbook entrega na prática"
            className="text-3xl md:text-5xl font-bold tracking-tight leading-tight"
          />
          <div className="mt-6 rounded-2xl bg-background/15 p-5 backdrop-blur-sm border border-background/20">
            <Editable id="s10-h" initial="R$ 1.257" className="text-4xl md:text-5xl font-bold" />
            <Editable
              id="s10-sub"
              initial="+margem/mês gerado ao cliente"
              className="mt-2 block text-sm opacity-90"
            />
          </div>
          <Editable
            id="s10-foot"
            initial="Cada tarefa mapeada gera medição automática de minutos economizados e lucro."
            multiline
            className="mt-5 text-sm opacity-90 max-w-sm"
          />
        </div>
        <div className="md:col-span-3 flex items-center">
          <div className="w-full overflow-hidden rounded-xl border border-background/20 bg-background/10 text-xs md:text-sm">
            <div className="grid grid-cols-5 bg-background/20 font-semibold uppercase tracking-wider text-[10px]">
              {["Custo/Min", "Min. Econ./Mês", "Custo Reduzido", "Custo IA", "Lucro Total/Mês"].map(
                (h, i) => (
                  <div key={i} className="px-3 py-3 border-r border-background/20 last:border-0">
                    {h}
                  </div>
                ),
              )}
            </div>
            {rows.map((r, idx) => (
              <div
                key={r.id}
                className={`grid grid-cols-5 ${
                  idx === 0 || idx === rows.length - 1 ? "bg-primary-foreground/10" : ""
                } border-t border-background/10`}
              >
                {(["a", "b", "c", "d", "e"] as const).map((k) => (
                  <Editable
                    key={k}
                    id={`${r.id}-${k}`}
                    initial={r[k]}
                    className="px-3 py-3 border-r border-background/20 last:border-0 block"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}

function S11() {
  const items = [
    {
      id: "b1",
      Icon: Zap,
      t: "Biblioteca de Automações Prontas",
      d: "Modelos testados de funil, follow-up, reativação e relatórios prontos para adaptar.",
      v: "R$ 2.500",
    },
    {
      id: "b2",
      Icon: Users,
      t: "Treinamento Interno Gravado",
      d: "Workshop gravado para seu time usar IA no dia a dia — vale para novos colaboradores.",
      v: "R$ 1.800",
    },
    {
      id: "b3",
      Icon: Target,
      t: "Sessão Estratégica 1:1",
      d: "Call com a diretoria para planejar produtividade e margem nos próximos 6 meses.",
      v: "R$ 1.500",
    },
  ];
  return (
    <Slide n={11} total={TOTAL} tag="Bônus inclusos">
      <div className="flex h-full flex-col">
        <Editable
          as="h2"
          id="s11-title"
          initial="Você ainda leva 3 bônus para acelerar resultado"
          className="text-3xl md:text-5xl font-bold tracking-tight max-w-4xl"
        />
        <div className="mt-8 grid flex-1 gap-4 md:grid-cols-3">
          {items.map(({ id, Icon, t, d, v }) => (
            <div
              key={id}
              className="rounded-2xl border border-border bg-secondary/50 p-6 flex flex-col"
            >
              <div className="flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <Editable
                  id={id + "-v"}
                  initial={v}
                  className="text-xs font-semibold text-primary"
                />
              </div>
              <Editable id={id + "-t"} initial={t} className="mt-4 text-lg font-bold" />
              <Editable
                id={id + "-d"}
                initial={d}
                multiline
                className="mt-2 text-sm text-muted-foreground leading-relaxed"
              />
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

function S12() {
  return (
    <Slide n={12} total={TOTAL} tag="Garantia" variant="tint">
      <div className="grid h-full gap-10 md:grid-cols-5 items-center">
        <div className="md:col-span-2 flex flex-col items-start">
          <div className="grid h-20 w-20 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-soft)]">
            <ShieldCheck className="h-10 w-10" />
          </div>
          <Editable
            as="h2"
            id="s12-title"
            initial="Garantia 90D Produtividade"
            className="mt-5 text-3xl md:text-5xl font-bold tracking-tight"
          />
        </div>
        <div className="md:col-span-3">
          <Editable
            as="p"
            id="s12-body"
            initial="Se ao final dos 90 dias você não tiver pelo menos 3 processos críticos automatizados e um ganho mensurável de produtividade em pelo menos uma área da sua operação, continuamos trabalhando com você por mais 30 dias — sem custo adicional de honorário de projeto."
            multiline
            className="text-lg md:text-2xl leading-snug"
          />
          <Editable
            as="p"
            id="s12-foot"
            initial="O risco é nosso. O resultado é seu."
            className="mt-6 text-base font-semibold text-primary"
          />
        </div>
      </div>
    </Slide>
  );
}

function S13() {
  return (
    <Slide n={13} total={TOTAL} tag="Vagas limitadas">
      <div className="flex h-full flex-col justify-center max-w-4xl">
        <Editable
          as="h2"
          id="s13-title"
          initial="Apenas 3 novos clientes por mês"
          className="text-4xl md:text-6xl font-bold tracking-tight text-primary"
        />
        <Editable
          as="p"
          id="s13-sub"
          initial="Por ser um trabalho feito à mão, dentro da sua operação, só aceitamos 3 novos projetos por mês. Depois, você entra na lista de espera para o próximo ciclo de 90 dias."
          multiline
          className="mt-5 text-lg md:text-2xl text-muted-foreground leading-snug"
        />
        <div className="mt-8 grid grid-cols-3 gap-4">
          {["Vaga 1", "Vaga 2", "Vaga 3"].map((v, i) => (
            <div
              key={v}
              className={`rounded-xl border-2 p-5 text-center ${
                i < 2
                  ? "border-border bg-muted/40 text-muted-foreground line-through"
                  : "border-primary bg-secondary text-primary"
              }`}
            >
              <Editable id={"s13-v" + i} initial={i < 2 ? "Preenchida" : "Disponível"} className="font-semibold" />
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

function S14() {
  const lines = [
    { id: "anc-1", l: "Contratar 1 analista de operações sênior", v: "R$ 8.000–12.000/mês" },
    { id: "anc-2", l: "Consultoria pontual de processos (sem implementação)", v: "R$ 15.000+" },
    { id: "anc-3", l: "Manter a operação manual e perder margem todo mês", v: "Incalculável" },
  ];
  return (
    <Slide n={14} total={TOTAL} tag="Ancoragem" variant="tint">
      <div className="flex h-full flex-col">
        <Editable
          as="h2"
          id="s14-title"
          initial="Quanto custa NÃO resolver isso?"
          className="text-3xl md:text-5xl font-bold tracking-tight max-w-4xl"
        />
        <Editable
          as="p"
          id="s14-sub"
          initial="As alternativas comuns custam mais, demoram mais e raramente entregam implementação real:"
          className="mt-4 text-base md:text-lg text-muted-foreground max-w-3xl"
        />
        <div className="mt-8 flex-1 flex flex-col gap-3 justify-center">
          {lines.map((l) => (
            <div
              key={l.id}
              className="flex items-center justify-between gap-6 rounded-xl border border-border bg-background p-5"
            >
              <Editable id={l.id + "-l"} initial={l.l} className="text-base md:text-lg" />
              <Editable
                id={l.id + "-v"}
                initial={l.v}
                className="text-base md:text-xl font-bold text-primary whitespace-nowrap"
              />
            </div>
          ))}
        </div>
        <Editable
          as="p"
          id="s14-foot"
          initial="Cada mês sem automatizar é margem perdida que não volta."
          className="mt-6 text-lg font-semibold"
        />
      </div>
    </Slide>
  );
}

function S15() {
  return (
    <Slide n={15} total={TOTAL} tag="Investimento" variant="dark">
      <div className="grid h-full gap-10 md:grid-cols-5">
        <div className="md:col-span-3 flex flex-col justify-center">
          <Editable
            as="h2"
            id="s15-title"
            initial="Programa 90D Ops IA"
            className="text-3xl md:text-5xl font-bold tracking-tight leading-tight"
          />
          <Editable
            as="p"
            id="s15-sub"
            initial="Diagnóstico + Implementação + Otimização + Bônus + Garantia"
            className="mt-3 text-base md:text-lg opacity-90"
          />
          <div className="mt-8 space-y-2.5">
            {[
              { id: "s15-i1", t: "Diagnóstico completo + roadmap de automação" },
              { id: "s15-i2", t: "3 a 5 automações implementadas em produção" },
              { id: "s15-i3", t: "Painel de produtividade antes/depois" },
              { id: "s15-i4", t: "Biblioteca, treinamento e sessão estratégica" },
              { id: "s15-i5", t: "Suporte ativo durante todo o ciclo de 90 dias" },
            ].map((i) => (
              <div key={i.id} className="flex items-start gap-3">
                <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-background/25">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <Editable id={i.id} initial={i.t} className="text-base" />
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-2 flex items-center">
          <div className="w-full rounded-2xl bg-background p-8 text-foreground shadow-2xl">
            <Editable
              id="s15-from"
              initial="De R$ 24.000"
              className="text-base text-muted-foreground line-through"
            />
            <div className="mt-1 flex items-baseline gap-2">
              <Editable id="s15-cur" initial="R$" className="text-2xl font-semibold text-primary" />
              <Editable
                id="s15-price"
                initial="12.000"
                className="text-5xl md:text-6xl font-bold tracking-tight text-primary"
              />
            </div>
            <Editable
              id="s15-cond"
              initial="ou 3x de R$ 4.000 no cartão"
              className="mt-2 block text-sm text-muted-foreground"
            />
            <div className="mt-6 h-px bg-border" />
            <Editable
              id="s15-cta"
              initial="Próximo passo"
              className="mt-5 block text-xs font-semibold uppercase tracking-wider text-primary"
            />
            <Editable
              id="s15-cta-sub"
              initial="Conversa de 20 minutos para validar o ajuste e iniciar a Vaga 3."
              multiline
              className="mt-2 block text-sm text-foreground"
            />
            <div className="mt-5 rounded-xl bg-[image:var(--gradient-primary)] px-5 py-3 text-center text-sm font-semibold text-primary-foreground">
              <Editable id="s15-btn" initial="Reservar minha vaga" />
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}

const SLIDES = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15];

/* ----------------------------- Container ----------------------------- */

function Proposta() {
  const [idx, setIdx] = useState(0);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const go = useCallback((d: number) => {
    setIdx((i) => Math.min(SLIDES.length - 1, Math.max(0, i + d)));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const fullscreen = () => {
    const el = stageRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  };

  const reset = () => {
    if (!confirm("Restaurar textos originais? Suas edições serão apagadas.")) return;
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("fym-proposta:"))
        .forEach((k) => localStorage.removeItem(k));
    } catch {}
    location.reload();
  };

  const Current = SLIDES[idx];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <img src={fymLogo} alt="FYM Group" className="h-8 w-8 rounded-md object-cover" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">FYM Group</span>
              <span className="text-[11px] text-muted-foreground">Proposta Comercial · editável</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={reset}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-secondary"
              title="Restaurar textos originais"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Restaurar
            </button>
            <button
              onClick={() => window.print()}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-secondary"
              title="Imprimir / Exportar PDF"
            >
              <Download className="h-3.5 w-3.5" /> PDF
            </button>
            <button
              onClick={fullscreen}
              className="inline-flex items-center gap-1.5 rounded-md bg-[image:var(--gradient-primary)] px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-[var(--shadow-soft)]"
            >
              <Maximize2 className="h-3.5 w-3.5" /> Apresentar
            </button>
          </div>
        </div>
      </header>

      {/* Stage */}
      <main className="mx-auto max-w-6xl px-4 py-6">
        <div ref={stageRef} className="relative bg-muted/30">
          <Current />

          {/* Nav arrows */}
          <button
            onClick={() => go(-1)}
            disabled={idx === 0}
            aria-label="Slide anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-background/90 shadow-lg border border-border hover:bg-background disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => go(1)}
            disabled={idx === SLIDES.length - 1}
            aria-label="Próximo slide"
            className="absolute right-2 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-background/90 shadow-lg border border-border hover:bg-background disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Thumb bar */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Ir para slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === idx ? "w-8 bg-primary" : "w-2 bg-border hover:bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Clique em qualquer texto para editar · ← → para navegar · Tudo é salvo automaticamente
        </p>
      </main>
    </div>
  );
}
