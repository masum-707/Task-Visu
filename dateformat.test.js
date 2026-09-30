import { formatDate } from "./js/utils.js";

it("Format date", () => {
  expect(formatDate("2026-10-25 14:30:00 +06:00")).toBe("2026-10-25");
});
it("it should not be formatted date", () => {
  expect(formatDate(null)).toBe("");
});
it("it should not be formatted date", () => {
  expect(formatDate("time")).toBe("");
});
it("Format date", () => {
  expect(formatDate("ABS")).toBe("");
});
it("Format date", () => {
  expect(formatDate("67612")).toBe("");
});
