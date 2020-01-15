import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
	apiKey: "AIzaSyCup3uul-xr9zNo2GHnnkBSTRbXD2I5U1o",
	authDomain: "e-commerce-db-16ef6.firebaseapp.com",
	databaseURL: "https://e-commerce-db-16ef6.firebaseio.com",
	projectId: "e-commerce-db-16ef6",
	storageBucket: "e-commerce-db-16ef6.appspot.com",
	messagingSenderId: "319828611917",
	appId: "1:319828611917:web:1ba1b90d91e75382f65d04",
	measurementId: "G-4BL1SY8MW0"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			});
		} catch (error) {
			console.log("error creating user", error.message);
		}
	}

	return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
