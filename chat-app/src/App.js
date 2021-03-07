import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import HomeRoutes from "./route/HomeRoutes";
import ApolloProvider from "./ApolloProvider";

function App() {
  return (
    <ApolloProvider>
      <Router>
        <div className="app">
          <Switch>
            <Route path="/signin" exact component={Signin} />
            <Route path="/register" exact component={Register} />
            <Route path="/">
              <HomeRoutes />
            </Route>
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
