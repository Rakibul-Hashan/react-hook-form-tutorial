import Basic_controlled_form from './../../Basic_controlled_form';
import HandleSubmit__async from "./HandleSubmit__async";
import HandleSubmit__disabled from "./HandleSubmit__disabled";
import HandleSubmit__synch from "./HandleSubmit__synch";

const HandleSubmit = () => {
  return (
    <div>
      <h1>HandleSubmit</h1>
      {/* <Basic_controlled_form /> */}
      <HandleSubmit__async />
      {/* <HandleSubmit__synch /> */}
      <HandleSubmit__disabled />
    </div>
  );
};

export default HandleSubmit;
