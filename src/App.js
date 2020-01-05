import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from './layouts/Dashboard'
import Schedule from './layouts/Schedule'

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
    },
  },
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/dashboard" component={Dashboard} exact />
            <Route path="/schedules" component={Schedule} />
            <Route path="/shop" component={'Shop'} />
          </Switch>
        </Layout>
      </div>
    </ThemeProvider>
  );
}

export default App;
