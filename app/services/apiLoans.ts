import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { firestore } from "~/firebase/firebaseConfig";

export async function createLoan(
  bookId: FormDataEntryValue,
  userId: FormDataEntryValue,
  username: FormDataEntryValue,
  userEmail: FormDataEntryValue,
  bookTitle: FormDataEntryValue
) {
  try {
    const loanData = {
      bookId,
      userId,
      username,
      userEmail,
      bookTitle,
      loanDate: Timestamp.now(),
      status: "active",
    };

    const loanRef = await addDoc(collection(firestore, "loans"), loanData);

    return loanRef.id;
  } catch (error) {
    console.error("Error al registrar el préstamo:", error);
    throw error;
  }
}

export async function getLoans() {
  const querySnapshot = await getDocs(collection(firestore, "loans"));

  const loans = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return loans;
}

// export async function getLoansWithBookDetails() {
//   const querySnapshot = await getDocs(collection(firestore, "loans"));
//   const loans = [];

//   for (const docSnap of querySnapshot.docs) {
//     const loanData = docSnap.data();

//     let bookData = null;
//     if (loanData.bookRef && loanData.bookRef instanceof DocumentReference) {
//       const bookSnap = await getDoc(loanData.bookRef);
//       bookData = bookSnap.exists() ? bookSnap.data() : null;
//     } else {
//       console.warn(
//         `Documento ${docSnap.id} en loans no tiene un bookRef válido.`
//       );
//     }

//     loans.push({
//       id: docSnap.id,
//       ...loanData,
//       book: bookData,
//     });
//   }

//   return loans;
// }
