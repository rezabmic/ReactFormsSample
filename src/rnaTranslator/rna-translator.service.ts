import codonTableData from "./codon-table.json";

export class RnaTranslator {
  private readonly codonTable: { [codon: string]: string };
  private readonly stopProteinMapping = "Stop";

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

  /**
   * Codons are valid if:
   * 1. All scodons are valid codons.
   * 2. The last codon is a stop codon.
   * 3. There is no other stop codon than the one in the last index.
   */
  private areCodonsValid(codons: string[]): boolean {
    if (this.codonTable[codons[codons.length - 1]] !== this.stopProteinMapping) {
      return false;
    }
    const invalidCodon = codons.find(
      (codon, index) => !this.isValidCodon(codon, index === codons.length -1)
    );
    return !invalidCodon;
  }

  private isValidCodon(codon: string, isLastIndex: boolean): boolean {
    if (!isLastIndex && this.codonTable[codon] === this.stopProteinMapping) {
      return false;
    }
    return !!codon && codon.length === 3 && !!this.codonTable[codon];
  }

  private splitMrnaToCodons(mRna: string): string[] {
    let index = 0;
    const codons: string[] = [];
    while (index + 3 < mRna.length) {
      codons.push(mRna.substring(index, index + 3).toLocaleUpperCase());
      index += 3;
    }
    return codons;
  }
}
