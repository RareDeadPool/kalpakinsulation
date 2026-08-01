export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA-DWmgGptgGIi6NiMj_bM0cjtRI2xL0Us",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "kalpak-insulation.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "kalpak-insulation",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "kalpak-insulation.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "614268412240",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:614268412240:web:5e6d9f81d4504ff3e20c55",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-MYT2RED4QS"
};