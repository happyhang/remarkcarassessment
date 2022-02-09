import LoginState from './loginState';

const instance = new LoginState();
export {
  instance as LoginInstance,
  LoginState,
};
export { default as LoginContext } from './loginContext';
