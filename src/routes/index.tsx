import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LeadDialog } from "@/components/LeadDialog";
import { Check, X, ArrowRight, Sparkles, TrendingUp, Users, Zap, Clock, AlertTriangle } from "lucide-react";
import fymLogo from "@/assets/fym-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Automação e IA para Agências | +20 a 40% de produtividade em 90 dias" },
      { name: "description", content: "Implementamos automações com IA na operação da sua agência para reduzir tarefas manuais, aumentar lucro e escalar sem contratar mais gente." },
      { property: "og:title", content: "Automação e IA para Agências" },
      { property: "og:description", content: "Aumente de 20% a 40% a produtividade da sua agência em até 90 dias." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [open, setOpen] = useState(false);
  const cta = (label: string, variant: "hero" | "outlineHero" = "hero", size: "default" | "lg" = "lg") => (
    <Button variant={variant} size={size} onClick={() => setOpen(true)} className="group">
      {label}
      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Button>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2.5">
            <img src={fymLogo} alt="FYM Group" className="h-10 w-10 rounded-lg object-cover" />
            <span className="text-base font-semibold tracking-tight">FYM Group</span>
          </div>
          <Button variant="hero" size="sm" onClick={() => setOpen(true)}>
            Consultoria gratuita
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[image:var(--gradient-hero)]">
        <div className="absolute inset-0 -z-10 opacity-40 [background:radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklab,var(--primary-glow)_30%,transparent)_0%,transparent_70%)]" />
        <div className="mx-auto max-w-5xl px-4 py-12 text-center md:py-16">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/60 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Para donos de agência que querem escalar
          </div>
          <h1 className="mx-auto max-w-4xl text-balance text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Aumente de <span className="text-primary">20% a 40%</span> a produtividade da sua agência em até{" "}
            <span className="text-primary">90 dias</span> com automação e IA
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
            Implemento automações com IA na operação da sua agência para reduzir tarefas manuais,
            aumentar produtividade, aumentar lucro e criar vantagem competitiva no mercado.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            {cta("Quero uma consultoria gratuita")}
            <p className="text-xs text-muted-foreground">
              <Clock className="mr-1 inline h-3 w-3" />
              Diagnóstico estratégico da sua operação em 30 minutos
            </p>
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="bg-background py-12 md:py-14">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">O Problema</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Se você tem uma agência, provavelmente está passando por isso:
            </h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {[
              { icon: AlertTriangle, t: "Operação travada e dependente de pessoas" },
              { icon: Clock, t: "Muito trabalho manual e repetitivo" },
              { icon: TrendingUp, t: "Dificuldade de escalar sem aumentar custos" },
              { icon: Users, t: "Equipe sobrecarregada" },
            ].map(({ icon: Icon, t }) => (
              <div key={t} className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-[var(--shadow-soft)]">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="pt-1.5 text-sm font-medium text-foreground md:text-base">{t}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-lg font-medium text-foreground md:text-xl">
            Você sabe que poderia estar faturando mais… mas a operação não acompanha.
          </p>
          <div className="mt-8 flex justify-center">{cta("Quero resolver isso agora")}</div>
        </div>
      </section>

      {/* AGITAÇÃO */}
      <section className="relative overflow-hidden bg-secondary py-12 md:py-14">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Enquanto isso…</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Outras agências estão usando automação e IA para:
            </h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              { icon: Zap, t: "Entregar mais com menos equipe" },
              { icon: TrendingUp, t: "Reduzir custos" },
              { icon: Sparkles, t: "Escalar com previsibilidade" },
            ].map(({ icon: Icon, t }) => (
              <div key={t} className="rounded-xl border border-border bg-background p-6 text-center shadow-sm">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="mt-4 font-semibold text-foreground">{t}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-lg font-medium text-foreground md:text-xl">
            E estão ficando mais competitivas que você todos os dias.
          </p>
          <div className="mt-8 flex justify-center">{cta("Quero ter essa vantagem competitiva")}</div>
        </div>
      </section>

      {/* PARA QUEM É / NÃO É */}
      <section className="bg-background py-12 md:py-14">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border-2 border-primary/30 bg-card p-8 shadow-[var(--shadow-soft)]">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">Para quem é</div>
              <h3 className="text-2xl font-bold tracking-tight">Feito sob medida pra você</h3>
              <ul className="mt-6 space-y-3">
                {["Donos de agências", "Quem quer escalar", "Quem já tem operação rodando"].map((i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {i}
                  </li>
                ))}
              </ul>
              <div className="mt-8">{cta("Quero ver se isso funciona pra mim", "hero", "default")}</div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Para quem não é</div>
              <h3 className="text-2xl font-bold tracking-tight text-foreground">Não é pra todo mundo</h3>
              <ul className="mt-6 space-y-3">
                {["Iniciantes", "Sem clientes", "Quem busca atalhos"].map((i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-muted text-muted-foreground">
                      <X className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {i}
                  </li>
                ))}
              </ul>
              <div className="mt-8">{cta("Quero uma consultoria gratuita", "outlineHero", "default")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* FECHAMENTO */}
      <section className="relative overflow-hidden bg-[image:var(--gradient-primary)] py-12 md:py-16 text-primary-foreground">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            Você pode continuar operando no manual…
          </h2>
          <p className="mt-4 text-xl opacity-95 md:text-2xl">
            Ou pode transformar sua agência em uma operação escalável.
          </p>
          <p className="mt-6 text-lg font-semibold">A decisão é sua.</p>
          <div className="mt-10 flex justify-center">
            <Button
              size="lg"
              onClick={() => setOpen(true)}
              className="group bg-background text-primary shadow-xl hover:bg-background/95 hover:scale-[1.03] transition-all"
            >
              Quero minha consultoria gratuita
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>


      <LeadDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
