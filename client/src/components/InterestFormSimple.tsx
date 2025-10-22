import { trpc } from "../lib/trpc";
import { useState } from "react";
import { toast } from "sonner";

export default function InterestFormSimple() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    produtos: [] as string[],
  });

  const createLead = trpc.leads.create.useMutation({
    onSuccess: () => {
      toast.success("Interesse enviado com sucesso!");
      
      // Criar mensagem para WhatsApp
      const message = `Olá! Tenho interesse em consórcio.

*Nome:* ${formData.nome}
*Email:* ${formData.email}
*WhatsApp:* ${formData.whatsapp}
*Produtos de Interesse:* ${formData.produtos.join(", ")}`;

      const whatsappUrl = `https://api.whatsapp.com/send/?phone=5562983136222&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
      
      // Redirecionar para WhatsApp
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
      }, 500);

      // Limpar formulário
      setFormData({
        nome: "",
        email: "",
        whatsapp: "",
        produtos: [],
      });
    },
    onError: (error) => {
      console.error("Erro ao enviar formulário:", error);
      toast.error("Erro ao enviar. Redirecionando para WhatsApp...");
      
      // Mesmo com erro, redirecionar para WhatsApp
      const message = `Olá! Tenho interesse em consórcio.

*Nome:* ${formData.nome}
*Email:* ${formData.email}
*WhatsApp:* ${formData.whatsapp}
*Produtos de Interesse:* ${formData.produtos.join(", ")}`;

      const whatsappUrl = `https://api.whatsapp.com/send/?phone=5562983136222&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
      
      window.open(whatsappUrl, "_blank");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
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
        <label htmlFor="nome" className="block text-sm font-medium text-white">
          Nome Completo
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          placeholder="Seu nome"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          required
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="whatsapp" className="block text-sm font-medium text-white">
          WhatsApp
        </label>
        <input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          placeholder="(62) 98313-6222"
          value={formData.whatsapp}
          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
          required
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-white">
          Produto de Interesse (Múltipla Escolha)
        </label>
        {produtos.map((produto) => (
          <div key={produto} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={produto}
              name="produtos"
              checked={formData.produtos.includes(produto)}
              onChange={(e) => handleCheckboxChange(produto, e.target.checked)}
              className="w-4 h-4 rounded border-white/20 bg-white/10 text-purple-600 focus:ring-2 focus:ring-purple-500"
            />
            <label htmlFor={produto} className="cursor-pointer text-white">
              {produto}
            </label>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full glass-button px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={createLead.isPending}
      >
        {createLead.isPending ? "Enviando..." : "Enviar Interesse"}
      </button>
    </form>
  );
}

