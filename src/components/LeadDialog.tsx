import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

interface LeadDialogProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

const sizes = [
  "Apenas eu",
  "2 a 5 colaboradores",
  "6 a 10 colaboradores",
  "11 a 20 colaboradores",
  "21 a 50 colaboradores",
  "Mais de 50 colaboradores",
];

export function LeadDialog({ open, onOpenChange }: LeadDialogProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ nome: "", telefone: "", email: "", tamanho: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.telefone.trim() || !form.email.trim() || !form.tamanho) {
      toast.error("Preencha todos os campos");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      toast.error("E-mail inválido");
      return;
    }
    setSubmitted(true);
  };

  const reset = (o: boolean) => {
    if (!o) {
      setTimeout(() => {
        setSubmitted(false);
        setForm({ nome: "", telefone: "", email: "", tamanho: "" });
      }, 200);
    }
    onOpenChange(o);
  };

  return (
    <Dialog open={open} onOpenChange={reset}>
      <DialogContent className="sm:max-w-md">
        {submitted ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
            <h3 className="mt-4 text-xl font-semibold text-foreground">Recebemos sua solicitação!</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Em breve entraremos em contato para agendar sua consultoria gratuita de 30 minutos.
            </p>
            <Button className="mt-6 w-full" variant="hero" onClick={() => reset(false)}>Fechar</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Quero minha consultoria gratuita</DialogTitle>
              <DialogDescription>
                Diagnóstico estratégico da sua operação em 30 minutos.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" maxLength={100} value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" inputMode="tel" maxLength={20} value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Tamanho da agência</Label>
                <Select value={form.tamanho} onValueChange={(v) => setForm({ ...form, tamanho: v })}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    {sizes.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" variant="hero" className="w-full">Enviar solicitação</Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
