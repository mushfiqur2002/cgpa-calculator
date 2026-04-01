import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase.config";

export const googleSignUp = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);

        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        const user = result.user;

        console.log(user, token);

        return user;
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};