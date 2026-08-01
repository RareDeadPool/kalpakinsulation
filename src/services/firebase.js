import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile
} from "firebase/auth";
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  deleteDoc,
  increment
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

import { auth, db } from "../config/firebase";

const storage = getStorage();

// Add this line to export db
export { db };

// Storage functions
export const uploadFile = async (file, folderName) => {
  const storageRef = ref(storage, `${folderName}/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

export const deleteFile = async (fileUrl) => {
  const fileRef = ref(storage, fileUrl);
  await deleteObject(fileRef);
};

// Authentication functions
export const registerUser = async (email, password, userData) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  
  // Update profile with display name
  await updateProfile(user, {
    displayName: userData.name
  });
  
  // Store additional user data in Firestore
  await setDoc(doc(db, "users", user.uid), {
    ...userData,
    email: user.email,
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  return user;
};

export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logoutUser = async () => {
  await signOut(auth);
};

export const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
};

// User Profile functions
export const getUserData = async (userId) => {
  const userDoc = await getDoc(doc(db, "users", userId));
  if (userDoc.exists()) {
    return userDoc.data();
  }
  return null;
};

export const updateUserData = async (userId, data) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    ...data,
    updatedAt: new Date().toISOString()
  });
};

// Products functions
export const addProduct = async (productData) => {
  const productsRef = collection(db, "products");
  const docRef = await addDoc(productsRef, {
    ...productData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  return docRef.id;
};

export const getProducts = async (limit = 10) => {
  const productsRef = collection(db, "products");
  const q = query(productsRef, orderBy("createdAt", "desc"), limit(limit));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Services functions
export const addServiceFirestore = async (serviceData) => {
  const servicesRef = collection(db, "services");
  const docRef = await addDoc(servicesRef, {
    ...serviceData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  return docRef.id;
};

export const getServicesFirestore = async () => {
  const servicesRef = collection(db, "services");
  const q = query(servicesRef, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const updateService = async (serviceId, data) => {
  const serviceDocRef = doc(db, "services", serviceId);
  await updateDoc(serviceDocRef, {
    ...data,
    updatedAt: new Date().toISOString()
  });
};

export const deleteService = async (serviceId) => {
  await deleteDoc(doc(db, "services", serviceId));
};

// Staff functions
export const addStaff = async (staffData) => {
  const staffRef = collection(db, "staff");
  const docRef = await addDoc(staffRef, {
    ...staffData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  return docRef.id;
};

export const getStaffFirestore = async () => {
  const staffRef = collection(db, "staff");
  const q = query(staffRef, orderBy("createdAt", "asc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const updateStaff = async (staffId, data) => {
  const staffDocRef = doc(db, "staff", staffId);
  await updateDoc(staffDocRef, {
    ...data,
    updatedAt: new Date().toISOString()
  });
};

export const deleteStaff = async (staffId) => {
  await deleteDoc(doc(db, "staff", staffId));
};

// Projects functions
export const addProject = async (projectData) => {
  const projectsRef = collection(db, "projects");
  const docRef = await addDoc(projectsRef, {
    ...projectData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  return docRef.id;
};

export const getProjectsFirestore = async () => {
  const projectsRef = collection(db, "projects");
  const q = query(projectsRef, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const updateProject = async (projectId, data) => {
  const projectRef = doc(db, "projects", projectId);
  await updateDoc(projectRef, {
    ...data,
    updatedAt: new Date().toISOString()
  });
};

export const deleteProject = async (projectId) => {
  await deleteDoc(doc(db, "projects", projectId));
};

// Visitor functions
export const trackVisitor = async () => {
  try {
    const visitorsRef = collection(db, "visitors");
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    
    // Check if there's already a document for today
    const q = query(visitorsRef, where("date", "==", today));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      // Create new document for today
      await addDoc(visitorsRef, {
        date: today,
        count: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    } else {
      // Update existing document
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, {
        count: increment(1),
        updatedAt: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error("Error tracking visitor:", error);
  }
};

export const getVisitorStats = async () => {
  try {
    const visitorsRef = collection(db, "visitors");
    const q = query(visitorsRef, orderBy("date", "desc"), limit(30)); // Get last 30 days
    const querySnapshot = await getDocs(q);
    
    const stats = {
      total: 0,
      today: 0,
      thisWeek: 0,
      thisMonth: 0,
      dailyStats: []
    };
    
    const today = new Date().toISOString().split('T')[0];
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);
    
    querySnapshot.docs.forEach(doc => {
      const data = doc.data();
      stats.total += data.count;
      stats.dailyStats.push({
        date: data.date,
        count: data.count
      });
      
      if (data.date === today) {
        stats.today = data.count;
      }
      
      const visitDate = new Date(data.date);
      if (visitDate >= weekAgo) {
        stats.thisWeek += data.count;
      }
      if (visitDate >= monthAgo) {
        stats.thisMonth += data.count;
      }
    });
    
    return stats;
  } catch (error) {
    console.error("Error getting visitor stats:", error);
    return null;
  }
};

// Internship Certificate functions
export const getCertificateByCode = async (code) => {
  try {
    if (!code) return null;
    const cleanCode = decodeURIComponent(code).trim();
    const certsRef = collection(db, "certificates");
    
    // 1. First query by certificateCode field (exact match)
    const q = query(certsRef, where("certificateCode", "==", cleanCode));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const certDoc = querySnapshot.docs[0];
      return { id: certDoc.id, ...certDoc.data() };
    }

    // 2. Try uppercase code matching
    const qUpper = query(certsRef, where("certificateCode", "==", cleanCode.toUpperCase()));
    const upperSnapshot = await getDocs(qUpper);
    if (!upperSnapshot.empty) {
      const certDoc = upperSnapshot.docs[0];
      return { id: certDoc.id, ...certDoc.data() };
    }

    // 3. Try lowercase code matching
    const qLower = query(certsRef, where("certificateCode", "==", cleanCode.toLowerCase()));
    const lowerSnapshot = await getDocs(qLower);
    if (!lowerSnapshot.empty) {
      const certDoc = lowerSnapshot.docs[0];
      return { id: certDoc.id, ...certDoc.data() };
    }

    // 4. Try checking if document ID matches code
    const docRef = doc(db, "certificates", cleanCode);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }

    // 5. Fallback scan: retrieve all certificates and match normalized code (alphanumeric uppercase)
    const allSnapshot = await getDocs(certsRef);
    const normalizedSearch = cleanCode.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    for (const docItem of allSnapshot.docs) {
      const data = docItem.data();
      const codeVal = (data.certificateCode || docItem.id || "").toString();
      const normalizedCode = codeVal.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
      if (normalizedCode === normalizedSearch) {
        return { id: docItem.id, ...data };
      }
    }

    return null;
  } catch (error) {
    console.error("Error fetching certificate by code:", error);
    throw error;
  }
};

export const getAllCertificates = async () => {
  try {
    const certsRef = collection(db, "certificates");
    const snapshot = await getDocs(certsRef);
    const certificates = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return certificates;
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return [];
  }
};

export const addCertificate = async (certData) => {
  try {
    const certsRef = collection(db, "certificates");
    const newCertDoc = {
      certificateCode: certData.certificateCode ? certData.certificateCode.trim().toUpperCase() : `KALPAK-INT-${Date.now().toString().slice(-6)}`,
      internName: certData.internName || '',
      domain: certData.domain || 'Thermal & Cold Insulation Engineering',
      startDate: certData.startDate || '',
      endDate: certData.endDate || '',
      duration: certData.duration || '3 Months',
      issueDate: certData.issueDate || new Date().toISOString().split('T')[0],
      status: certData.status || 'Valid',
      grade: certData.grade || 'A+',
      issuedBy: certData.issuedBy || 'Mr. Sudhir Sawant (Proprietor)',
      remarks: certData.remarks || 'Successfully completed internship with outstanding performance.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const docRef = await addDoc(certsRef, newCertDoc);
    return { id: docRef.id, ...newCertDoc };
  } catch (error) {
    console.error("Error adding certificate:", error);
    throw error;
  }
};

export const updateCertificate = async (id, certData) => {
  try {
    const certRef = doc(db, "certificates", id);
    const updatedFields = {
      ...certData,
      updatedAt: new Date().toISOString()
    };
    await updateDoc(certRef, updatedFields);
    return { id, ...updatedFields };
  } catch (error) {
    console.error("Error updating certificate:", error);
    throw error;
  }
};

export const deleteCertificate = async (id) => {
  try {
    await deleteDoc(doc(db, "certificates", id));
    return true;
  } catch (error) {
    console.error("Error deleting certificate:", error);
    throw error;
  }
};