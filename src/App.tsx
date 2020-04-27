import React, { useState } from "react";
import "./App.css";
import { RnaTranslator } from "./rnaTranslator/rna-translator.service";

function App() {
  const [state, setState] = useState({
    mRna: "",
    proteinString: "",
    isFormInvalid: false,
  });
  const rnaTranslator = new RnaTranslator();

  function handleSubmit(e: any) {
    e.preventDefault();
    const proteinString = getProteinString();
    setState({
      ...state,
      proteinString,
      isFormInvalid: !!state.mRna && !proteinString,
    });
  }

  function getProteinString(): string {
    return rnaTranslator.translateToProteinString(state.mRna) || "";
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Translating RNA into Protein</h1>
      </header>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            mRna
            <input
              type="text"
              value={state.mRna}
              onChange={(e) => setState({ ...state, mRna: e.target.value })}
              name="mRna"
            />
          </label>
          <input type="submit" value="Translate" />
        </form>
        <div>Result: {state.proteinString}</div>
        {state.isFormInvalid && <div className="error">"invalid mRna!"</div>}
      </div>
    </div>
  );
}

export default App;
