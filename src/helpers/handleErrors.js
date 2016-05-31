const regulars = {
  email: new RegExp('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$'),
  password:new RegExp('(?=.​*\d*​).{6,}'),
};
export const errors = {
  email:"e-mail isn't valid",
  password:"password isn't valid"
}
export function checkValidation (inputName, val) {
  return regulars[inputName].test(val);
}

export function showError(inputName) {

}
