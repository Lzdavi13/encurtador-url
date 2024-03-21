import z from "zod";
import { schemaCreateLink } from "../../schemas/createLink";

export type CreateLinkDto = z.infer<typeof schemaCreateLink>