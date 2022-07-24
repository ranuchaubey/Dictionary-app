import axios from "axios";
import "./App.css";
import React, { useEffect, useState } from "react";
import { Container, withStyles, Switch } from "@material-ui/core";
import Header from "./components/Header";
import { grey } from "@material-ui/core/colors";
import Definitions from "./components/Definations/Definitions";
function App() {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [category, setCategory] = useState("en");
  const [lightMode, setLightMode] = useState(false);
  const DarkMode = withStyles({
    switchBase: {
      color: grey[50],
      "&$checked": {
        color: grey[900],
      },
      "&$checked + $track": {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);
  const dictionaryApi = async () => {
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      );

      setMeanings(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(meanings);
  useEffect(() => {
    dictionaryApi();
  }, [word, category]);

  return (
    <div
      className="App"
      style={{ height: "100vh", backgroundColor:lightMode?"white": "#282c34", color:lightMode?"black": "white" ,transition:"all 0.5s linear"}}
    >
      <Container
        maxWidth="md"
        styles={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{ position: "absolute", top: 0, right: 15, paddingTop: 10 }}
        >
          <span>{lightMode ? "Dark" : "Light"} Mode</span>
          <DarkMode
            checked={lightMode}
            onChange={() => setLightMode(!lightMode)}
          />
        </div>
        <Header
          setWord={setWord}
          category={category}
          setCategory={setCategory}
          word={word}
          lightMode={lightMode}
        />
        {meanings && (
          <Definitions word={word} meanings={meanings} category={category} lightMode={lightMode}/>
        )}
      </Container>
    </div>
  );
}

export default App;
