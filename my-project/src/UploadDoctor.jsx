// import React, { useEffect } from 'react';
// import { db } from './firebase';
// import { collection, addDoc } from 'firebase/firestore';

// const UploadDoctor = () => {
//   useEffect(() => {
//     const uploadDoctor = async () => {
//       const doctor = [
//        {
//         name: "Dr. Sarah Johnson",
//         specialty: "Cardiology",
//         experience: "15 years of experience",
//         location: "Apollo Hospital, Delhi",
//         phone: "+91 9876543210",
//         email: "dr.sarah@example.com",
//         image: "https://yourdomain.com/images/dr_sarah.jpg",
//         hours: "9:30 AM to 4:30 PM",
//         rating: 4.9,
//         reviews: 127,
//         description: "Dr. Sarah specializes in interventional procedures...",
//         about: "Board-certified cardiologist with over 15 years of experience...",
//         education: [
//           "MD - Harvard Medical School (2008)",
//           "Residency - Johns Hopkins Hospital (2012)",
//           "Fellowship - Mayo Clinic (2014)"
//         ],
//         certifications: [
//           "Board Certified in Cardiovascular Disease",
//           "Advanced Cardiac Life Support (ACLS)"
//         ],
//         expertise: [
//           "Preventive Cardiology",
//           "Heart Disease Management",
//           "Echocardiography"
//         ],
//         languages: ["English", "Hindi"],
//         awards: [
//           "Top Doctor Award 2023 - City Medical Association",
//           "Excellence in Patient Care 2022"
//         ],
//         insurance: [
//           "Aetna",
//           "Cigna",
//           "UnitedHealthcare",
//           "Medicare"
//         ]
    
//       },
//     ];

//       try {
//         await addDoc(collection(db, "doctorsdetail"), doctor);
//         console.log("Doctor uploaded successfully");
//       } catch (error) {
//         console.error("Error uploading doctor:", error);
//       }
//     };

//     uploadDoctor(); // call it on mount
//   }, []);

//   return <div className="p-4 text-green-600 font-semibold">Uploading doctor...</div>;
// };

// export default UploadDoctor;
