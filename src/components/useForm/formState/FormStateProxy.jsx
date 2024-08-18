// Original object
const formState = {
  isDirty: false,
  isValid: true,
  errors: {},
};

// Handler with get and set traps
const handler = {
  get(target, prop) {
    console.log(`Accessing ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    console.log(`Updating ${prop} to ${value}`);
    target[prop] = value;
    return true;
  },
};

// Creating a Proxy around formState
const proxiedFormState = new Proxy(formState, handler);

// Example usage
console.log(proxiedFormState.isDirty); // Logs: Accessing isDirty
proxiedFormState.isDirty = true; // Logs: Updating isDirty to true
console.log(proxiedFormState.isDirty); // Logs: Accessing isDirty, then true
