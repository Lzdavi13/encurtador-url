import { z } from 'zod'

export const schemaCreateLink = z.object({
  code: z.string().min(3, 'code deve conter pelo menos 3 caracteres'),
  url: z.string().url('url invalida')
})