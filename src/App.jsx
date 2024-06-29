import "./App.css";
import Clock from "./components/Clock";
import Timer from "./components/Timer";

const App = () => {
  return (
    <div className="container">
      <Clock />
      <Timer />
    </div>
  );
};

export default App;
