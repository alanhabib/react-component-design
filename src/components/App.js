import Header from "./Header";
import { createContext, useState } from "react";
import Speakers from "./Speakers";
import Layout from "./Layout";

export const ThemeContext = createContext();
function App() {
  return (
    <Layout startingTheme="light">
      <Header />
      <Speakers />
    </Layout>
  );
}

export default App;
