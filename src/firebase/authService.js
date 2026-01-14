import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from './config';

/**
 * Connexion admin avec email/password
 */
export async function signInAdmin(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Erreur de connexion:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Déconnexion
 */
export async function signOut() {
  try {
    await firebaseSignOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Erreur de déconnexion:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Observer l'état de l'authentification
 */
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

/**
 * Récupère l'utilisateur actuellement connecté
 */
export function getCurrentUser() {
  return auth.currentUser;
}
