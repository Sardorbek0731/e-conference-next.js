import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

const articlesCollection = collection(db, "articles");

export const addArticle = async (article) => {
  try {
    const docRef = await addDoc(articlesCollection, article);
    return docRef.id;
  } catch (error) {
    return error;
  }
};

export const getArticles = async () => {
  try {
    const querySnapshot = await getDocs(articlesCollection);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    return error;
  }
};

export const getArticleById = async (articleId) => {
  try {
    const articleRef = doc(db, "articles", articleId);
    const articleSnap = await getDoc(articleRef);

    if (articleSnap.exists()) {
      return { id: articleSnap.id, ...articleSnap.data() };
    }
  } catch (error) {
    return error;
  }
};

export const updateArticle = async (id, updatedData) => {
  try {
    const articleRef = doc(db, "articles", id);
    await updateDoc(articleRef, updatedData);
  } catch (error) {
    return error;
  }
};

export const deleteArticle = async (id) => {
  try {
    const articleRef = doc(db, "articles", id);
    await deleteDoc(articleRef);
  } catch (error) {
    return error;
  }
};
