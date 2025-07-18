// import React, { useEffect } from "react";
// import { db } from "./firebase";
// import { collection, addDoc } from "firebase/firestore";

// const uploadDoctorsToFirebase = async () => {
//   const doctors = [
//     {
//       name: "Dr. Sarah Johnson",
//       specialty: "Cardiology",
//       experience: "15 years of experience",
//       rating: 4.9,
//       reviews: 127,
//       description: "Specialized in preventive cardiology...",
//       location: "Downtown Medical Center",
//       hours: "Mon-Fri 9AM-5PM",
//       image: "/api/placeholder/300/200"
//     },
//     {
//       name: "Dr. Michael Chen",
//       specialty: "Dermatology",
//       experience: "12 years of experience",
//       rating: 4.8,
//       reviews: 95,
//       description: "Expert in medical and cosmetic dermatology...",
//       location: "Skin Care Clinic",
//       hours: "Tue-Sat 8AM-4PM",
//       image: "/api/placeholder/300/200"
//     },
//     {
//       name: "Dr. Emily Davis",
//       specialty: "Pediatrics",
//       experience: "10 years of experience",
//       rating: 4.9,
//       reviews: 203,
//       description: "Dedicated to providing comprehensive healthcare...",
//       location: "Children's Health Center",
//       hours: "Mon-Fri 8AM-6PM",
//       image: "/api/placeholder/300/200"
//     },
//     {
//       name: "Dr. James Wilson",
//       specialty: "Orthopedics",
//       experience: "18 years of experience",
//       rating: 4.7,
//       reviews: 156,
//       description: "Specializes in sports injuries, joint replacement...",
//       location: "Sports Medicine Center",
//       hours: "Mon-Fri 7AM-4PM",
//       image: "/api/placeholder/300/200"
//     },
//     {
//       name: "Dr. Lisa Anderson",
//       specialty: "Neurology",
//       experience: "14 years of experience",
//       rating: 4.8,
//       reviews: 89,
//       description: "Expert in treating neurological disorders...",
//       location: "Neurology Institute",
//       hours: "Mon-Thu 9AM-5PM",
//       image: "/api/placeholder/300/200"
//     },
//     {
//       name: "Dr. Robert Kim",
//       specialty: "Internal Medicine",
//       experience: "20 years of experience",
//       rating: 4.9,
//       reviews: 241,
//       description: "Provides comprehensive primary care...",
//       location: "Primary Care Clinic",
//       hours: "Mon-Fri 8AM-6PM",
//       image: "/api/placeholder/300/200"
//     }
//   ];

//   try {
//     const colRef = collection(db, "doctors");
//     for (let doctor of doctors) {
//       await addDoc(colRef, doctor);
//     }
//     console.log("✅ Doctors added to Firebase!");
//   } catch (err) {
//     console.error("❌ Error adding doctors:", err);
//   }
// };

// const DoctorsUploader = () => {
//   useEffect(() => {
//     uploadDoctorsToFirebase();
//   }, []);

//   return <div>Uploading doctors to Firebase...</div>;
// };

// export default DoctorsUploader;
