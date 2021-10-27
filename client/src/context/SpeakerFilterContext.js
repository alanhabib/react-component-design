import { createContext, useState } from "react";

const EVENT_YEARS = [
  "2008",
  "2009",
  "2010",
  "2011",
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
];

const SpeakerFilterContext = createContext();

function SpeakerFilterProvider({ children }) {
  const [showSessions, setShowSessions] = useState(false);
  const [eventYear, setEventYear] = useState("2019");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SpeakerFilterContext.Provider
      value={{
        showSessions,
        setShowSessions,
        eventYear,
        setEventYear,
        searchQuery,
        setSearchQuery,
        EVENT_YEARS,
      }}
    >
      {children}
    </SpeakerFilterContext.Provider>
  );
}

export { SpeakerFilterContext, SpeakerFilterProvider };
