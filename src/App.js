import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from "./layouts/Dashboard";
import Schedule from "./layouts/Schedule";
import Templates from "./layouts/Templates";
import Context from "./util/Context";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Roboto",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    body1: {
      fontSize: "1em"
    }
  },
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true // No more ripple, on the whole application 💣!
    }
  }
});
function App() {
  
  const [state, setState] = React.useState({
    width: 60
  });

  return (
    <ThemeProvider theme={theme}>
      <Context.Provider value={{ state, setState }}>
        <div className="App">
          <Layout>
            <Switch>
              <Route path="/dashboard" exact component={Dashboard} exact />
              <Route path="/schedules" exact component={Schedule} />
              <Route path="/templates" exact component={Templates} />
            </Switch>
          </Layout>
        </div>
      </Context.Provider>
    </ThemeProvider>
  );
}

export default App;
