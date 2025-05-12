import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

// Room operations
export async function addRoom(room) {
  try {
    const docRef = await addDoc(collection(db, "rooms"), {
      ...room,
      createdAt: serverTimestamp(),
    });
    return { ...room, id: docRef.id };
  } catch (error) {
    console.error("Error adding room:", error);
    throw error;
  }
}

export async function updateRoom(id, room) {
  try {
    const roomRef = doc(db, "rooms", id);
    await updateDoc(roomRef, room);
    return { id, ...room };
  } catch (error) {
    console.error("Error updating room:", error);
    throw error;
  }
}

export async function deleteRoom(id) {
  try {
    await deleteDoc(doc(db, "rooms", id));
    return id;
  } catch (error) {
    console.error("Error deleting room:", error);
    throw error;
  }
}

export async function getRooms() {
  try {
    const querySnapshot = await getDocs(collection(db, "rooms"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting rooms:", error);
    throw error;
  }
}

export async function getRoom(id) {
  try {
    const docRef = doc(db, "rooms", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Room not found");
    }
  } catch (error) {
    console.error("Error getting room:", error);
    throw error;
  }
}

export async function getRoomsByType(type) {
  try {
    const roomsQuery = query(
      collection(db, "rooms"),
      where("type", "==", type),
    );

    const querySnapshot = await getDocs(roomsQuery);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting rooms by type:", error);
    throw error;
  }
}

// Booking operations
export async function addBooking(booking) {
  try {
    const docRef = await addDoc(collection(db, "bookings"), {
      ...booking,
      createdAt: serverTimestamp(),
    });
    return { ...booking, id: docRef.id };
  } catch (error) {
    console.error("Error adding booking:", error);
    throw error;
  }
}

export async function updateBooking(id, booking) {
  try {
    const bookingRef = doc(db, "bookings", id);
    await updateDoc(bookingRef, booking);
    return { id, ...booking };
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
}

export async function getBookings() {
  try {
    const querySnapshot = await getDocs(collection(db, "bookings"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting bookings:", error);
    throw error;
  }
}

export async function getBookingsByStatus(status) {
  try {
    const bookingsQuery = query(
      collection(db, "bookings"),
      where("status", "==", status),
    );

    const querySnapshot = await getDocs(bookingsQuery);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting bookings by status:", error);
    throw error;
  }
}

// Review operations
export async function addReview(review) {
  try {
    const docRef = await addDoc(collection(db, "reviews"), {
      ...review,
      approved: false,
      createdAt: serverTimestamp(),
    });
    return { ...review, id: docRef.id };
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
}

export async function updateReview(id, review) {
  try {
    const reviewRef = doc(db, "reviews", id);
    await updateDoc(reviewRef, review);
    return { id, ...review };
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
}

export async function deleteReview(id) {
  try {
    await deleteDoc(doc(db, "reviews", id));
    return id;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
}

export async function getApprovedReviews() {
  try {
    const reviewsQuery = query(
      collection(db, "reviews"),
      where("approved", "==", true),
    );

    const querySnapshot = await getDocs(reviewsQuery);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting approved reviews:", error);
    throw error;
  }
}

export async function getAllReviews() {
  try {
    const querySnapshot = await getDocs(collection(db, "reviews"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting all reviews:", error);
    throw error;
  }
}

// Contact message operations
export async function addContactMessage(message) {
  try {
    const docRef = await addDoc(collection(db, "contactMessages"), {
      ...message,
      read: false,
      createdAt: serverTimestamp(),
    });
    return { ...message, id: docRef.id };
  } catch (error) {
    console.error("Error adding contact message:", error);
    throw error;
  }
}

export async function markMessageAsRead(id) {
  try {
    const messageRef = doc(db, "contactMessages", id);
    await updateDoc(messageRef, { read: true });
    return id;
  } catch (error) {
    console.error("Error marking message as read:", error);
    throw error;
  }
}

export async function getContactMessages() {
  try {
    const querySnapshot = await getDocs(collection(db, "contactMessages"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting contact messages:", error);
    throw error;
  }
}
