import React from "react";
import { createContext } from "react/cjs/react.development";

const SpeakerContext = createContext();

function SpeakerProvider({
  children,
  speaker,
  updateRecord,
  insertRecord,
  deleteRecord,
}) {
  return (
    <SpeakerContext.Provider
      value={{ speaker, updateRecord, insertRecord, deleteRecord }}
    >
      {children}
    </SpeakerContext.Provider>
  );
}

export { SpeakerProvider, SpeakerContext };
