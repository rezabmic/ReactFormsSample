import { RnaTranslator } from "./rna-translator.service";

test("translates mRna to protein string", () => {
  const rnaTranslator = new RnaTranslator();
  const mRna = "AUGGCCAUGGCGCCCAGAACUGAGAUCAAUAGUACCCGUAUUAACGGGUGA";
  expect(rnaTranslator.translateToProteinString(mRna)).toBe("MAMAPRTEINSTRING");
});

test("translates empty mRna to null", () => {
  const rnaTranslator = new RnaTranslator();
  expect(rnaTranslator.translateToProteinString("")).toBe(null);
});
