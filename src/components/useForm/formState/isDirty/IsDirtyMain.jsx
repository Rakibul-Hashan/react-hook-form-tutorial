import HobbiesForm from "./IsDirty_dynamic";
import FileUploadForm from "./IsDirty_file";
import LoginForm from "./IsDirty_multiple";
import AddressForm from "./IsDirty_nested";
import EmailForm from "./IsDirty_single";

const IsDirtyMain = () => {
  return (
    <div>
      <h1>isDirty</h1>
      <EmailForm />
      <LoginForm />
      <h2>Nested Input</h2>
      <AddressForm />
      <h2>Dynamic Input</h2>
      <HobbiesForm />
      <h2>File Upload Input</h2>
      <FileUploadForm />
    </div>
  );
};

export default IsDirtyMain;
