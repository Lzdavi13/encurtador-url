import { z } from 'zod'

export const schemaCreateLink = z.object({
  code: z.string({
    required_error: "code é obrigatório",
    invalid_type_error: "code deve ser uma string",
  }).min(3, { message: 'code deve conter pelo menos 3 caracteres' }),
  url: z.string({
    required_error: "url é obrigatório",
    invalid_type_error: "url dever ser uma string",
  }).url({ message: 'url inválida' })
})