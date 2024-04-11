import z from "zod"
import { schemaParams } from "../schemas/schemaParams"

export type GetCodeDto = z.infer<typeof schemaParams>
