import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  writeBatch,
  doc,
  getDoc,
  setDoc,
  getDocs,
  query,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-YYfey22bBbKW2XH0-3xBK_s_S8H51cU",
  authDomain: "apeekystore.firebaseapp.com",
  projectId: "apeekystore",
  storageBucket: "apeekystore.appspot.com",
  messagingSenderId: "931576996551",
  appId: "1:931576996551:web:46d241ebae546d879f14e2",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

console.log(auth);

export const SignInWithGooglePopup = () => {
  return signInWithPopup(auth, provider);
};

export const customOnAUthStateChange = (callback) =>
  onAuthStateChanged(auth, callback);

export const customSignOut = () => {
  return signOut(auth);
};

export const customAddDocumentFromCollection = async (
  collectionKey,
  objectToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

// export const createUserDocumentFromAuth = async (
//   userAuth,
//   additionalInformation = {}
// ) => {
//   const userDocRef = doc(db, "users", userAuth.uid);

//   const userSnapshot = await getDoc(userDocRef);

//   // If user doesnt exist
//   if (!userSnapshot.exists()) {
//     const { displayName, email } = userAuth;
//     const createdAt = new Date();

//     try {
//       await setDoc(userDocRef, {
//         displayName,
//         email,
//         createdAt,
//         ...additionalInformation,
//       });

//       console.log("done");
//     } catch (error) {
//       console.log("error creating the user", error.message);
//     }
//   } else {
//     const { displayName, email, uid, isAnonymous } = userAuth;
//     const createdAt = new Date();

//     try {
//       await setDoc(userDocRef, {
//         displayName,
//         email,
//         createdAt,
//         uid,
//         isAnonymous,
//         ...additionalInformation,
//       });
//     } catch (error) {
//       console.log("error creating the user", error.message);
//     }
//   }

//   return userDocRef;
// };

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  try {
    const userDocRef = doc(db, "users", userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });

      console.log("User document created successfully");
      // } else {
      //   const { displayName, email, uid, isAnonymous } = userAuth;
      //   const createdAt = new Date();

      //   await setDoc(userDocRef, {
      //     displayName,
      //     email,
      //     createdAt,
      //     uid,
      //     isAnonymous,
      //     ...additionalInformation,
      //   });
    }

    return userDocRef;
  } catch (error) {
    console.error("Error creating the user", error.message);
    throw error;
  }
};

export const customGetCategoryAndDocumentFromCollection = async () => {
  const collectionRef = collection(db, "store");
  const q = query(collectionRef);

  const querySnapShot = await getDocs(q);

  // console.log(querySnapShot.docs.map((docSnapshot) => docSnapshot.data()));

  return querySnapShot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  if (!email || !password) return;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    // Handle error here
    if (error.code === "auth/email-already-in-use") {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
      } catch (signInError) {
        console.error("Error signing in with existing email and password:", signInError);
        return null;
      }
    } else {
      console.error("Error creating user:", error);
      return null;
    }
  }

  // return await createUserWithEmailAndPassword(auth, email, password);
};
