import DirtyFields from "./DirtyFields";
import IsDirty from "./IsDirty";
import IsSubmitSuccessful from "./IsSubmitSuccessful";
import IsSubmitting from "./IsSubmitting";
import TouchFields from "./TouchFields";
import IsValid from "./IsValid";
import Errors from "./Errors";

const FormState = () => {
  return (
    <div>
      <h1>formState</h1>

      <IsDirty />
      {/* <h3>DirtyFields</h3>
      <DirtyFields />
      <h3>TouchFields</h3>
      <TouchFields />
      <h3>IsSubmitSuccessful</h3>
      <IsSubmitSuccessful />
      <h3>isSubmitting</h3>
      <IsSubmitting />
      <h3>IsValid</h3>
      <IsValid />
      <h3>Errors</h3>
      <Errors /> */}
    </div>
  );
};

export default FormState;
