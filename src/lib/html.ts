// Tagged template for page markup. Line breaks and the indentation that follows
// them are removed from the literal parts, so templates can be laid out like
// the future PHP theme files while rendering the same compact HTML.
// Interpolated values are inserted as-is: escape untrusted CMS text before use.
export const html = (strings: TemplateStringsArray, ...values: unknown[]): string =>
  strings.reduce((out, s, i) => out + s.replace(/\n\s*/g, "") + (i < values.length ? String(values[i]) : ""), "");
