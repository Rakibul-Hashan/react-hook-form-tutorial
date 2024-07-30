import CriteriaMode from "./components/useForm/criteriaMode/CriteriaMode";
import CriteriaModeFirstError from "./components/useForm/criteriaMode/CriteriaModeFirstError";

const App = () => {
  return (
    <div>
      {/* <h1>Criteria Mode (ALL) </h1>
      <CriteriaMode /> */}
      <h1>Criteria Mode (First Error) </h1>
      <CriteriaModeFirstError />
    </div>
  );
};

export default App;
