import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  writeBatch,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from './config';
import { events as initialEvents } from '../data/events';

const EVENTS_COLLECTION = 'events';

/**
 * Récupère tous les événements depuis Firestore
 */
export async function getAllEvents() {
  try {
    const eventsQuery = query(
      collection(db, EVENTS_COLLECTION),
      orderBy('id', 'asc')
    );
    const querySnapshot = await getDocs(eventsQuery);

    if (querySnapshot.empty) {
      console.log('Aucun événement trouvé, utilisation des événements par défaut');
      return initialEvents;
    }

    const events = [];
    querySnapshot.forEach((doc) => {
      events.push(doc.data());
    });

    return events;
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    // En cas d'erreur, retourner les événements par défaut
    return initialEvents;
  }
}

/**
 * Sauvegarde ou met à jour un événement
 */
export async function saveEvent(event) {
  try {
    const eventRef = doc(db, EVENTS_COLLECTION, event.id.toString());
    await setDoc(eventRef, event);
    return { success: true };
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de l\'événement:', error);
    return { success: false, error };
  }
}

/**
 * Supprime un événement
 */
export async function deleteEvent(eventId) {
  try {
    const eventRef = doc(db, EVENTS_COLLECTION, eventId.toString());
    await deleteDoc(eventRef);
    return { success: true };
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'événement:', error);
    return { success: false, error };
  }
}

/**
 * Importe une liste complète d'événements (remplace tous les existants)
 */
export async function importEvents(events) {
  try {
    const batch = writeBatch(db);

    // Supprimer tous les événements existants
    const existingEvents = await getDocs(collection(db, EVENTS_COLLECTION));
    existingEvents.forEach((doc) => {
      batch.delete(doc.ref);
    });

    // Ajouter les nouveaux événements
    events.forEach((event) => {
      const eventRef = doc(db, EVENTS_COLLECTION, event.id.toString());
      batch.set(eventRef, event);
    });

    await batch.commit();
    return { success: true };
  } catch (error) {
    console.error('Erreur lors de l\'import des événements:', error);
    return { success: false, error };
  }
}

/**
 * Initialise la base de données avec les événements par défaut
 * À utiliser uniquement la première fois ou pour reset
 */
export async function initializeEventsDatabase() {
  try {
    const batch = writeBatch(db);

    initialEvents.forEach((event) => {
      const eventRef = doc(db, EVENTS_COLLECTION, event.id.toString());
      batch.set(eventRef, event);
    });

    await batch.commit();
    console.log('Base de données initialisée avec', initialEvents.length, 'événements');
    return { success: true, count: initialEvents.length };
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    return { success: false, error };
  }
}

/**
 * Exporte tous les événements au format JSON
 */
export async function exportEventsToJSON() {
  const events = await getAllEvents();
  return events;
}
