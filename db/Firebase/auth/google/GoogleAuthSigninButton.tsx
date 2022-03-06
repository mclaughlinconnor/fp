import React, {useState} from "react";
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {GoogleAuth} from './google';
import {Brightness} from '../../../../styles/Styles';

type Props = {
  brightness?: Brightness
}

export function GoogleAuthSigninButton({brightness}: Props) {
  const googleAuthSvc = new GoogleAuth();

  const [loginInProgress, setLoginInProgress] = useState<boolean>(false);

  const login = async () => {
    setLoginInProgress(true);
    await googleAuthSvc.login();
  }

  return (
    <GoogleSigninButton
      style={{width: 192, height: 48}}
      size={GoogleSigninButton.Size.Wide}
      color={brightness === 'light' ? GoogleSigninButton.Color.Light : GoogleSigninButton.Color.Dark}
      onPress={login}
      disabled={loginInProgress}
    />
  );
}
