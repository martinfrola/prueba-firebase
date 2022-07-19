export const userMiddleware = (store: any) => (next: any) => (action: any) => {
  if (action.type == "user/setUser") {
    const { displayName, emailVerified, mail, accessToken, uid, photoURL } =
      action.payload.user;

    const realUser = {
      displayName,
      emailVerified,
      mail,
      accessToken,
      uid,
      photoURL,
    };

    next(realUser);
  } else {
    next(action);
  }
};
