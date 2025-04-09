import { format } from "date-fns";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
  Timestamp
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { ADD_SCORE, DELETE_SCORE, FETCH_SCORES } from "./actionTypes";

const scoresCollection = "scores";
const collectionRef = collection(db, scoresCollection);

export const addScore = (score) => async (dispatch) => {
  try {

    const docRef = await addDoc(collectionRef, {...score, created_at: Timestamp.now()});
    dispatch({
      type: ADD_SCORE,
      payload: {
        id: docRef.id,
        ...score,
        created_at: format(new Date(), "MMM d, y p"),
      },
    });
  } catch (error) {
    console.error("Error adding score: ", error);
  }
};

export const fetchScores = () => async (dispatch) => {
  try {
    const subscription = onSnapshot(collectionRef, (snapshot) => {
      const scores = snapshot.docs.map((doc) => {
        const data = doc.data();
        const datetime = data.created_at.toDate();
        const formatted = format(datetime, "MMM d, y p");

        return {
          id: doc.id,
          ...data,
          created_at: formatted,
        };
      });

      dispatch({
        type: FETCH_SCORES,
        payload: scores,
      });
    });

    return subscription;
  } catch (error) {
    console.error("Error fetching scores: ", error);
  }
};

export const editScore = (updatedScore) => async (dispatch) => {
  try {
    const docRef = doc(collectionRef, updatedScore.id);
    const { id, ...updatedData } = updatedScore;
    await updateDoc(docRef, updatedData);

    dispatch({
      type: EDIT_SCORE,
      payload: updatedScore,
    });
  } catch (error) {
    console.error("Error updating score: ", error);
  }
};

export const deleteScore = (scoreId) => async (dispatch) => {
  try {
    const docRef = doc(collectionRef, scoreId);
    await deleteDoc(docRef);

    dispatch({
      type: DELETE_SCORE,
      payload: {
        id: scoreId,
      },
    });
  } catch (error) {
    console.error("Error deleting the score: ", error);
  }
};
