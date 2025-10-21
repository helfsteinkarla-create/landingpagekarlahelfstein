import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createLead, getAllLeads } from "./db";
import { addLeadToGoogleSheets } from "./googleSheets";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  leads: router({
    // Criar novo lead
    create: publicProcedure
      .input(
        z.object({
          nome: z.string().min(1, "Nome é obrigatório"),
          email: z.string().email("Email inválido"),
          whatsapp: z.string().min(1, "WhatsApp é obrigatório"),
          produtos: z.array(z.string()).min(1, "Selecione pelo menos um produto"),
        })
      )
      .mutation(async ({ input }) => {
        try {
          // Salvar no banco de dados
          const produtosJson = JSON.stringify(input.produtos);
          await createLead({
            nome: input.nome,
            email: input.email,
            whatsapp: input.whatsapp,
            produtos: produtosJson,
          });

          // Enviar para Google Sheets
          const sheetsSuccess = await addLeadToGoogleSheets(input);

          // Notificar proprietário
          await notifyOwner({
            title: "Novo Lead Capturado!",
            content: `
**Nome:** ${input.nome}
**Email:** ${input.email}
**WhatsApp:** ${input.whatsapp}
**Produtos de Interesse:** ${input.produtos.join(", ")}
            `.trim(),
          });

          return {
            success: true,
            savedToSheets: sheetsSuccess,
          };
        } catch (error) {
          console.error("[Leads] Erro ao criar lead:", error);
          throw new Error("Erro ao processar formulário");
        }
      }),

    // Listar todos os leads (opcional, para painel admin)
    list: publicProcedure.query(async () => {
      const allLeads = await getAllLeads();
      return allLeads.map((lead) => ({
        ...lead,
        produtos: JSON.parse(lead.produtos),
      }));
    }),
  }),
});

export type AppRouter = typeof appRouter;

