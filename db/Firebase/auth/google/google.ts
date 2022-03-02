import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Component} from 'react';

export class GoogleAuth extends Component<{}, {}> {
  public user: FirebaseAuthTypes.User | null = null;

  constructor() {
    super({});
    this.configure();
  }

  public configure() {
    GoogleSignin.configure({
      webClientId: '993118838626-99h2kgfq0o5tdl957bu0566gofepc2pb.apps.googleusercontent.com',
    });
  }

  public currentUser() {
    return auth().currentUser;
  }

  public async login() {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    } catch (err) {
      console.error('play services are not available');
    }

    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    await auth().signInWithCredential(googleCredential);
  }

  public async logout() {
    try {
      await auth().signOut()
    } catch (error) {
      console.error(error);
    }
  }
}