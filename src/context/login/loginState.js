import { action, makeObservable, observable } from 'mobx';
import credential from './_secret';

class Login {
  isLoggedIn = false

  username = ''

  constructor() {
    makeObservable(this, {
      username: observable,
      isLoggedIn: observable,
      attemptLogin: action,
      logout: action,
    });
  }

  attemptLogin(username, password) {
    if (username === credential.username && password === credential.password) {
      this.username = username;
      this.isLoggedIn = true;
      return true;
    }

    return false;
  }

  logout() {
    this.username = '';
    this.isLoggedIn = false;
  }
}

export default Login;
