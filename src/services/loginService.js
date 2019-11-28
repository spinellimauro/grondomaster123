import firebase from "firebase";
import { store } from "../redux/store";

export async function login(user, pass) {
  const credential = firebase.auth.EmailAuthProvider.credential(user, pass);
  const response = await firebase
    .auth()
    .signInAndRetrieveDataWithCredential(credential);

  return response;
}

export async function getUser(userId) {
  let user;
  await firebase
    .database()
    .ref(`users/${userId}`)
    .once("value", snapshot => {
      if (snapshot.exists()) {
        user = snapshot.val();
        user.uid = snapshot.key;
      }
    });
  return user;
}

export function userSignOut() {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      const unsuscribeAuth = store.getState().globalReducer.auth_listener;
      unsuscribeAuth();
      return true;
    })
    .catch(error => {
      console.log(error);
      return false;
    });
}
