import z from "zod"

export const schemaParams = z.object({
  code: z
    .string({
      required_error: "code é obrigatório",
    })
    .min(3, { message: "code deve conter pelo menos 3 caracteres" }),
})
