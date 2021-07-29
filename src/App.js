import logo from "./logo.svg";
import "./App.css";

import { Container } from 'reactstrap';
import {Link } from "react-router-dom";

import MiniMax from "./Components/MiniMax";
import TwoPlayer from "./Components/TwoPlayer";

const App = () => {
  return (
    <Container className="p-5">
      <div className="App">
        <h1 className="text-center">Tic Tac Toe</h1>
          <Link to="/twoplayer">
            <button type="button" className="btn btn-outline-info m-2 p-2">
              2 Player
            </button>
          </Link>
          <Link to="/computer">
            <button type="button" className="btn btn-outline-info m-2 p-2">
              With Computer
            </button>
          </Link>
      </div>
    </Container>
  );
}

export default App;