import { Knex } from "../database/knex";
import { linkService } from "../factory/linkService.factory";
import { Link } from "../interfaces/ILink";

beforeAll(async () => {
  await Knex.migrate.latest();
});

afterAll(async () => {
  await Knex.destroy();
});

describe("Link service", () => {
  describe("Create link", () => {
    it("should be able create a new short link", async () => {
      const result: Link = await linkService.create({
        code: "teste",
        url: "https://teste-short-link.app/"
      })

      expect(result).toHaveProperty('id')
      expect(result.original_url).toBe("https://teste-short-link.app/")
    })

    it("shouldn't be able create a new short link with duplicated code", () => {
      expect(async () => await linkService.create({
        code: "teste",
        url: "https://teste-short-link.app/"
      })).rejects.toThrow('Duplicated code')
    })

    it("shouldn't be able create a new short link with very short code", () => {
      expect(async () => await linkService.create({
        code: "te",
        url: "https://teste-short-link.app/"
      })).rejects.toThrow("code deve conter pelo menos 3 caracteres")
    })

    it("it shouldn't be able to create a new short link with an invalid url", () => {
      expect(async () => await linkService.create({
        code: "teste",
        url: "http//teste.com.b"
      })).rejects.toThrow("url inválida")
    })
  })

  describe("Get link", () => {
    it("should be able to find link by code", async () => {
      const result = await linkService.getLink({ code: "teste" })

      expect(result).toHaveProperty('id')
      expect(result.original_url).toBe("https://teste-short-link.app/")
    })

    it("shouldn't be able to find link by code", async () => {
      expect(async () => await linkService.getLink({
        code: "teste3",
      })).rejects.toThrow("Link not found")
    })

    it("shouldn't be able to find link with very short code", async () => {
      expect(async () => await linkService.getLink({
        code: "te",
      })).rejects.toThrow("code deve conter pelo menos 3 caracteres")
    })
  })

  describe("Get all links", () => {
    it("should be able to return all links", async () => {
      const links = await linkService.getAllLinks()

      expect(links).toHaveLength(1)
    })
  })
})
