import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";

export default function InterestForm() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    produtos: [] as string[],
  });

  const createLead = trpc.leads.create.useMutation({
    onSuccess: () => {
      const message = \`Olá! Tenho interesse em consórcio.

*Nome:* \${formData.nome}
*Email:* \${formData.email}
*WhatsApp:* \${formData.whatsapp}
*Produtos de Interesse:* \${formData.produtos.join(", ")}\`;

      const whatsappUrl = \`https://api.whatsapp.com/send/?phone=5562983136222&text=\${encodeURIComponent(message)}&type=phone_number&app_absent=0\`;
      
      toast.success("Interesse enviado com sucesso!");
      
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
      }, 500);

      setFormData({
        nome: "",
        email: "",
        whatsapp: "",
        produtos: [],
      });
    },
    onError: (error) => {
      toast.error("Erro ao enviar formulário. Tente novamente.");
      console.error(error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome || !formData.email || !formData.whatsapp) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    if (formData.produtos.length === 0) {
      toast.error("Selecione pelo menos um produto de interesse");
      return;
    }

    createLead.mutate(formData);
  };

  const handleCheckboxChange = (produto: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      produtos: checked
        ? [...prev.produtos, produto]
        : prev.produtos.filter((p) => p !== produto),
    }));
  };

  const produtos = [
    "Compra de Veículo",
    "Compra Imóvel para Morar",
    "Compra Imóvel Investimento",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="nome">Nome Completo</Label>
        <Input
          id="nome"
          type="text"
          placeholder="Seu nome"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="whatsapp">WhatsApp</Label>
        <Input
          id="whatsapp"
          type="tel"
          placeholder="(62) 98313-6222"
          value={formData.whatsapp}
          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
          required
        />
      </div>

      <div className="space-y-3">
        <Label>Produto de Interesse (Múltipla Escolha)</Label>
        {produtos.map((produto) => (
          <div key={produto} className="flex items-center space-x-2">
            <Checkbox
              id={produto}
              checked={formData.produtos.includes(produto)}
              onCheckedChange={(checked) =>
                handleCheckboxChange(produto, checked as boolean)
              }
            />
            <Label htmlFor={produto} className="cursor-pointer font-normal">
              {produto}
            </Label>
          </div>
        ))}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={createLead.isPending}
      >
        {createLead.isPending ? "Enviando..." : "Enviar Interesse"}
      </Button>
    </form>
  );
}
