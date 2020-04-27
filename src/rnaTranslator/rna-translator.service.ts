import codonTableData from "./codon-table.json";

export class RnaTranslator {
  private readonly codonTable: { [codon: string]: string };

  constructor() {
    this.codonTable = codonTableData;
  }

  /**
   * Using a codon table, translate a mRna string into a protein string.
   * If mRna string is null or empty or if it contains an invalid codon, return null.
   */
  translateToProteinString(mRna: string): string | null {
    if (!mRna) {
      return null;
    }

    const codons = this.splitMrnaToCodons(mRna);
    if (!this.areCodonsValid(codons)) {
      return null;
    }

    return codons
      .map((codon: string) => this.codonTable[codon])
      .reduce((acc: string, next: string) => acc.concat(next), "");
  }

  private areCodonsValid(codons: string[]): boolean {
    const invalidCodon = codons.find((codon) => !this.isValidCodon(codon));
    return !invalidCodon;
  }

  private isValidCodon(codon: string): boolean {
    return !!codon && codon.length === 3 && !!this.codonTable[codon];
  }

  private splitMrnaToCodons(mRna: string): string[] {
    let index = 0;
    const codons: string[] = [];
    while (index + 3 < mRna.length) {
      codons.push(mRna.substring(index, index + 3));
      index += 3;
    }
    return codons;
  }
}
