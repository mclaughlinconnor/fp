import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Component} from 'react';
import {webClientId} from '../../../../constants/API';

export class GoogleAuth extends Component<{}, {}> {
  public user: FirebaseAuthTypes.User | null = null;

  constructor() {
    super({});
    this.configure();
  }

  public configure() {
    GoogleSignin.configure({
      webClientId: webClientId
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

    const {idToken} = await GoogleSignin.signIn()
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
