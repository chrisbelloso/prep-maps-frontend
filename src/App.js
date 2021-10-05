import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomeView from "./views/HomeView";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomeView} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
