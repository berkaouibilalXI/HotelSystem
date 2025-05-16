import { db } from "./config";
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  setDoc
} from "firebase/firestore";

// Room functions
export const getRooms = async () => {
  try {
    const roomsCollection = collection(db, "rooms");
    const roomsSnapshot = await getDocs(roomsCollection);
    return roomsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting rooms:", error);
    throw error;
  }
};

export const getRoom = async (id) => {
  try {
    const roomDoc = doc(db, "rooms", id);
    const roomSnapshot = await getDoc(roomDoc);
    
    if (roomSnapshot.exists()) {
      return {
        id: roomSnapshot.id,
        ...roomSnapshot.data()
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting room:", error);
    throw error;
  }
};

export const addRoom = async (roomData) => {
  try {
    // Ensure the data is properly formatted
    const formattedData = {
      ...roomData,
      price: Number(roomData.price),
      capacity: Number(roomData.capacity),
      size: Number(roomData.size),
      available: Boolean(roomData.available),
      createdAt: serverTimestamp()
    };
    
    const roomsCollection = collection(db, "rooms");
    const docRef = await addDoc(roomsCollection, formattedData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding room:", error);
    throw error;
  }
};

export const updateRoom = async (id, roomData) => {
  try {
    // Ensure the data is properly formatted
    const formattedData = {
      ...roomData,
      price: Number(roomData.price),
      capacity: Number(roomData.capacity),
      size: Number(roomData.size),
      available: Boolean(roomData.available),
      updatedAt: serverTimestamp()
    };
    
    const roomDoc = doc(db, "rooms", id);
    await updateDoc(roomDoc, formattedData);
    return true;
  } catch (error) {
    console.error("Error updating room:", error);
    throw error;
  }
};

export const deleteRoom = async (id) => {
  try {
    const roomDoc = doc(db, "rooms", id);
    await deleteDoc(roomDoc);
    return true;
  } catch (error) {
    console.error("Error deleting room:", error);
    throw error;
  }
};

// Booking functions
export const getBookings = async () => {
  try {
    const bookingsCollection = collection(db, "bookings");
    const q = query(bookingsCollection, orderBy("createdAt", "desc"));
    const bookingsSnapshot = await getDocs(q);
    return bookingsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting bookings:", error);
    throw error;
  }
};

export const getBooking = async (id) => {
  try {
    const bookingDoc = doc(db, "bookings", id);
    const bookingSnapshot = await getDoc(bookingDoc);
    if (bookingSnapshot.exists()) {
      return {
        id: bookingSnapshot.id,
        ...bookingSnapshot.data()
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting booking:", error);
    throw error;
  }
};

export const addBooking = async (bookingData) => {
  try {
    const bookingsCollection = collection(db, "bookings");
    const docRef = await addDoc(bookingsCollection, {
      ...bookingData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding booking:", error);
    throw error;
  }
};

export const updateBookingStatus = async (id, status) => {
  try {
    const bookingDoc = doc(db, "bookings", id);
    await updateDoc(bookingDoc, {
      status,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error updating booking status:", error);
    throw error;
  }
};

export const deleteBooking = async (id) => {
  try {
    const bookingDoc = doc(db, "bookings", id);
    await deleteDoc(bookingDoc);
    return true;
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};

// Review functions
export const getReviews = async () => {
  try {
    const reviewsCollection = collection(db, "reviews");
    const q = query(reviewsCollection, orderBy("createdAt", "desc"));
    const reviewsSnapshot = await getDocs(q);
    return reviewsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting reviews:", error);
    throw error;
  }
};

export const getApprovedReviews = async () => {
  try {
    const reviewsCollection = collection(db, "reviews");
    const q = query(
      reviewsCollection, 
      where("approved", "==", true),
      orderBy("createdAt", "desc")
    );
    const reviewsSnapshot = await getDocs(q);
    return reviewsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting approved reviews:", error);
    throw error;
  }
};

export const updateReviewStatus = async (id, approved) => {
  try {
    const reviewDoc = doc(db, "reviews", id);
    await updateDoc(reviewDoc, {
      approved,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error updating review status:", error);
    throw error;
  }
};

export const deleteReview = async (id) => {
  try {
    const reviewDoc = doc(db, "reviews", id);
    await deleteDoc(reviewDoc);
    return true;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};

// Message functions
export const getMessages = async () => {
  try {
    const messagesCollection = collection(db, "messages");
    const q = query(messagesCollection, orderBy("createdAt", "desc"));
    const messagesSnapshot = await getDocs(q);
    return messagesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting messages:", error);
    throw error;
  }
};

export const getContactMessages = async () => {
  try {
    const messagesCollection = collection(db, "messages");
    const q = query(messagesCollection, orderBy("createdAt", "desc"));
    const messagesSnapshot = await getDocs(q);
    return messagesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting contact messages:", error);
    throw error;
  }
};

export const markMessageAsRead = async (id, isRead = true) => {
  try {
    const messageDoc = doc(db, "messages", id);
    await updateDoc(messageDoc, {
      read: isRead,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error marking message as read:", error);
    throw error;
  }
};

export const deleteMessage = async (id) => {
  try {
    const messageDoc = doc(db, "messages", id);
    await deleteDoc(messageDoc);
    return true;
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
};

export const addContactMessage = async (messageData) => {
  try {
    const messagesCollection = collection(db, "messages");
    const docRef = await addDoc(messagesCollection, {
      ...messageData,
      read: false,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding contact message:", error);
    throw error;
  }
};

// User role management functions
export const setUserRole = async (userId, role) => {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, { role }, { merge: true });
    return true;
  } catch (error) {
    console.error("Error setting user role:", error);
    throw error;
  }
};

export const getUserRole = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data().role;
    }
    return null;
  } catch (error) {
    console.error("Error getting user role:", error);
    throw error;
  }
};

// Site settings functions
export const getSiteSettings = async () => {
  try {
    const settingsDoc = doc(db, "settings", "site");
    const settingsSnapshot = await getDoc(settingsDoc);
    
    if (settingsSnapshot.exists()) {
      return settingsSnapshot.data();
    } else {
      // Return default settings if not found
      return {
        siteTitle: "B-Hotel",
        siteDescription: "Luxury hotel booking platform",
        contactEmail: "info@b-hotel.com",
        contactPhone: "+1 (555) 123-4567",
        address: "123 Hotel Street, City, Country",
        socialLinks: {
          facebook: "https://facebook.com/bhotel",
          twitter: "https://twitter.com/bhotel",
          instagram: "https://instagram.com/bhotel",
        },
        footerText: "© 2023 B-Hotel. All rights reserved.",
      };
    }
  } catch (error) {
    console.error("Error getting site settings:", error);
    throw error;
  }
};

export const updateSiteSettings = async (settingsData) => {
  try {
    const settingsDoc = doc(db, "settings", "site");
    await setDoc(settingsDoc, {
      ...settingsData,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error("Error updating site settings:", error);
    throw error;
  }
};
