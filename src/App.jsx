import Context from "./components/useForm/context/Context";
import Context2 from "./components/useForm/context/Context2";
import Context5 from "./components/useForm/context/Context5";
import Context6 from "./components/useForm/context/Context6";
import Context7 from "./components/useForm/context/Context7";
import "./components/useForm/context/context.css";
const App = () => {
  return (
    <div
      style={{
        padding: "50px",
        display: "grid",
        gap: "20px",
        gridTemplateColumns: "repeat(3, 1fr)",
      }}
    >
      <Context />
      <Context2 />
      <Context5 />
      <Context6 />
      <Context7 />
    </div>
  );
};

export default App;
