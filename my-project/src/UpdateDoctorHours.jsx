// import { useEffect } from "react";
// import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
// import { db } from "./firebase"; // update path if needed

// const UpdateDoctorHours = () => {
//   useEffect(() => {
//     const updateDoctors = async () => {
//       try {
//         const snapshot = await getDocs(collection(db, "doctors"));

//         const timeSlots = [
//           "09:00 AM To 04:30 PM"
//         ];

//         for (const docSnap of snapshot.docs) {
//           const doctorRef = doc(db, "doctors", docSnap.id);
//           await updateDoc(doctorRef, { hours: timeSlots });
//           console.log(`✅ Updated: ${docSnap.data().name}`);
//         }

//         alert("✅ All 24 doctors updated with time slots!");
//       } catch (error) {
//         console.error("❌ Error updating doctors:", error);
//         alert("Something went wrong. Check console.");
//       }
//     };

//     updateDoctors();
//   }, []);

//   return (
//     <div className="p-10 text-center text-xl font-bold text-blue-800">
//       ⏳ Updating all doctor time slots... check Firebase after a few seconds!
//     </div>
//   );
// };

// export default UpdateDoctorHours;
