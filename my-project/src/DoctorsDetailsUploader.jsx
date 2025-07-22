import React, { useEffect } from "react";
import { db } from "./firebase"; // make sure firebase is correctly configured
import { collection, addDoc } from "firebase/firestore";

const doctorsDetail = [
  {
    name: "Dr. Siya",
    specialty: "Orthopedics",
    experience: "10 years of experience",
    rating: 4.7,
    reviews: 157,
    description: "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in preventive cardiology and heart disease management. She specializes in interventional procedures and has performed over 2,000 successful cardiac catheterizations.",
    about: "Dr. Sarah Johnson is a board-certified cardiologist...",
    location: "Downtown Medical Center",
    hours: "Mon-Fri 9AM-5PM",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@medicare.com",
    image: "/api/placeholder/300/200",
    education: [
      "MD - Harvard Medical School (2008)",
      "Residency - Johns Hopkins Hospital (2012)",
      "Fellowship - Mayo Clinic Cardiology (2014)"
    ],
    certifications: [
      "Board Certified in Cardiovascular Disease",
      "Board Certified in Interventional Cardiology", 
      "Advanced Cardiac Life Support (ACLS)",
      "Nuclear Cardiology Certification"
    ],
    expertise: [
      "Preventive Cardiology",
      "Interventional Cardiology", 
      "Heart Disease Management",
      "Cardiac Catheterization",
      "Echocardiography",
      "Stress Testing"
    ],
    languages: ["English", "Spanish", "French"],
    awards: [
      "Top Doctor Award 2023 - City Medical Association",
      "Excellence in Patient Care 2022",
      "Research Excellence Award 2021"
    ],
    insurance: [
      "Blue Cross Blue Shield",
      "Aetna",
      "Cigna", 
      "UnitedHealthcare",
      "Medicare",
      "Medicaid"
    ]
  },
  // Add other doctors here (you already wrote them — keep them in the array)
  // Dr. Michael Chen, Dr. Emily Davis, Dr. James Wilson, Dr. Lisa Anderson, Dr. Robert Kim
];

const UploadDoctors = () => {
  useEffect(() => {
    const uploadDoctorsDetailToFirebase = async () => {
      try {
        const colRef = collection(db, "doctorsdetail");
        for (let doctor of doctorsDetail) {
          await addDoc(colRef, doctor);
          console.log(`Uploaded: ${doctor.name}`);
        }
        console.log("All doctors uploaded successfully.");
      } catch (error) {
        console.error("Error uploading doctors:", error);
      }
    };

    uploadDoctorsDetailToFirebase();
  }, []);

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold text-green-700">Uploading Doctors...</h1>
      <p className="text-gray-600">Check console for status logs.</p>
    </div>
  );
};

export default UploadDoctors;
