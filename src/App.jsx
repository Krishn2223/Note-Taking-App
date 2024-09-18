// App.jsx
import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Note from "./components/note/Note";
import "./App.css";
import { Provider } from "react-redux";
import store from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Sidebar />
        <Note />
      </div>
    </Provider>
  );
}

export default App;
