import { signOut } from "firebase/auth"
import { auth } from "../../firebase.config"

export const googleSignOut = async () => {
    try {
        await signOut(auth).then(() => {
            alert("Signed out successfully")
        }).catch((err) => {
            console.error(err);
            alert(err.message);
        })
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}