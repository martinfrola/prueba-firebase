import UserProfile from "../../pages/UserProfile";

export class Login {
  id: string;
  name: string;
  photoUrl: string;
  email: string;
  constructor(user: any) {
    this.id = user.id;
    this.name = user.name;
    this.photoUrl = user.photoUrl;
    this.email = user.email;
  }
}

export class LoginData {
  email: string;
  pass: string;
  constructor(userData: any) {
    this.email = userData.mail;
    this.pass = userData.pass;
  }
}
