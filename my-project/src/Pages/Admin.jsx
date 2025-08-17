import { useState, useEffect } from "react";
import { Bell, Download, Settings, Users, Calendar, Stethoscope, DollarSign, UserPlus, CalendarPlus, FileText, Cog, Eye, Edit, Trash2, Phone, Mail, MapPin, Star, Search, Filter, Clock, CheckCircle, XCircle, AlertCircle, User } from "lucide-react";
import { db, storage } from "../firebase";
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc, query, orderBy } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usersCount, setusersCount] = useState([]);
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [doctorData, setDoctorData] = useState({
    name: "",
    specialty: "",
    rating: "",
    reviews: "",
    experience: "",
    time: "",
    location: "",
    phone: "",
    email: "",
    about: "",
    education: "",
    certifications: "",
    expertise: "",
    languages: "",
    awards: "",
    insurance: ""
  });

    const [updating, setUpdating] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [dateFilter, setDateFilter] = useState("All");
    const [deleting, setDeleting] = useState({});

  const tabs = ["Overview", "Doctors", "Appointments", "Users"];

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch appointments with ordering
      const appointmentsQuery = query(
        collection(db, "appointments"),
        orderBy("date", "desc")
      );
      const appointmentsSnap = await getDocs(appointmentsQuery);
      const appointmentsData = appointmentsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Ensure date is in proper format
        date: doc.data().date?.toDate ? doc.data().date.toDate().toISOString().split('T')[0] : doc.data().date
      }));
      setAppointments(appointmentsData);

        // Fetch doctors
        const doctorsSnap = await getDocs(collection(db, "doctors"));
        const doctorsData = doctorsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDoctors(doctorsData);
        setDoctorsCount(doctorsSnap.size);

        // Fetch patients
        const usersSnap = await getDocs(collection(db, "users"));
        setusersCount(usersSnap.size);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setDoctorData({
      name: "",
      specialty: "",
      rating: "",
      reviews: "",
      experience: "",
      time: "",
      location: "",
      phone: "",
      email: "",
      about: "",
      education: "",
      certifications: "",
      expertise: "",
      languages: "",
      awards: "",
      insurance: ""
    });
    setImageFile(null);
    setEditingDoctor(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);

      let imageUrl = editingDoctor?.image || "";
      if (imageFile) {
        const imageRef = ref(storage, `doctors/${Date.now()}_${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      const doctorPayload = {
        ...doctorData,
        image: imageUrl,
        rating: parseFloat(doctorData.rating) || 0,
        reviews: parseInt(doctorData.reviews) || 0
      };

      if (editingDoctor) {
        // Update existing doctor
        await updateDoc(doc(db, "doctors", editingDoctor.id), doctorPayload);
        setDoctors(doctors.map(doc => 
          doc.id === editingDoctor.id ? { ...doc, ...doctorPayload } : doc
        ));
        alert("Doctor updated successfully!");
      } else {
        // Add new doctor
        const docRef = await addDoc(collection(db, "doctors"), doctorPayload);
        setDoctors([...doctors, { id: docRef.id, ...doctorPayload }]);
        setDoctorsCount(doctorsCount + 1);
        alert("Doctor added successfully!");
      }

      setShowDoctorForm(false);
      resetForm();
    } catch (error) {
      console.error("Error saving doctor:", error);
      alert("Error saving doctor. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleEditDoctor = (doctor) => {
    setEditingDoctor(doctor);
    setDoctorData({
      name: doctor.name || "",
      specialty: doctor.specialty || "",
      rating: doctor.rating?.toString() || "",
      reviews: doctor.reviews?.toString() || "",
      experience: doctor.experience || "",
      time: doctor.time || "",
      location: doctor.location || "",
      phone: doctor.phone || "",
      email: doctor.email || "",
      about: doctor.about || "",
      education: Array.isArray(doctor.education) ? doctor.education.join(", ") : doctor.education || "",
      certifications: Array.isArray(doctor.certifications) ? doctor.certifications.join(", ") : doctor.certifications || "",
      expertise: Array.isArray(doctor.expertise) ? doctor.expertise.join(", ") : doctor.expertise || "",
      languages: Array.isArray(doctor.languages) ? doctor.languages.join(", ") : doctor.languages || "",
      awards: Array.isArray(doctor.awards) ? doctor.awards.join(", ") : doctor.awards || "",
      insurance: Array.isArray(doctor.insurance) ? doctor.insurance.join(", ") : doctor.insurance || ""
    });
    setShowDoctorForm(true);
  };

  const handleDeleteDoctor = async (doctorId) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await deleteDoc(doc(db, "doctors", doctorId));
        setDoctors(doctors.filter(doc => doc.id !== doctorId));
        setDoctorsCount(doctorsCount - 1);
        alert("Doctor deleted successfully!");
      } catch (error) {
        console.error("Error deleting doctor:", error);
        alert("Error deleting doctor. Please try again.");
      }
    }
  };


  // 4. ADD NEW APPOINTMENT FUNCTIONS - Add these after your existing doctor functions
const updateAppointmentStatus = async (appointmentId, newStatus) => {
  try {
    setUpdating(prev => ({ ...prev, [appointmentId]: true }));
    
    // Update in Firebase
    await updateDoc(doc(db, "appointments", appointmentId), {
      status: newStatus,
      updatedAt: new Date()
    });

    // Update local state
    setAppointments(appointments.map(appointment => 
      appointment.id === appointmentId 
        ? { ...appointment, status: newStatus, updatedAt: new Date() }
        : appointment
    ));

    console.log("Appointment status updated successfully");
  } catch (error) {
    console.error("Error updating appointment status:", error);
    alert("Error updating appointment status. Please try again.");
  } finally {
    setUpdating(prev => ({ ...prev, [appointmentId]: false }));
  }
};

const deleteAppointment = async (appointmentId) => {
  if (window.confirm("Are you sure you want to delete this appointment? This action cannot be undone.")) {
    try {
      setDeleting(prev => ({ ...prev, [appointmentId]: true }));
      
      // Delete from Firebase
      await deleteDoc(doc(db, "appointments", appointmentId));
      
      // Update local state
      setAppointments(appointments.filter(apt => apt.id !== appointmentId));
      
      alert("Appointment deleted successfully!");
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Error deleting appointment. Please try again.");
    } finally {
      setDeleting(prev => ({ ...prev, [appointmentId]: false }));
    }
  }
};
  // 5. UPDATE getStatusColor FUNCTION - Replace your existing getStatusColor function
const getStatusColor = (status) => {
  switch(status) {
    case "Confirmed": return "bg-green-100 text-green-800 border border-green-200";
    case "Pending": return "bg-yellow-100 text-yellow-800 border border-yellow-200";
    case "Completed": return "bg-blue-100 text-blue-800 border border-blue-200";
    case "Cancelled": return "bg-red-100 text-red-800 border border-red-200";
    default: return "bg-gray-100 text-gray-800 border border-gray-200";
  }
};

const getStatusIcon = (status) => {
  switch(status) {
    case "Confirmed": return <CheckCircle className="w-4 h-4" />;
    case "Pending": return <Clock className="w-4 h-4" />;
    case "Completed": return <CheckCircle className="w-4 h-4" />;
    case "Cancelled": return <XCircle className="w-4 h-4" />;
    default: return <AlertCircle className="w-4 h-4" />;
  }
};


// 7. ADD FILTER LOGIC - Add this after the getStatusIcon function
const filteredAppointments = appointments.filter(appointment => {
  const matchesSearch = appointment.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       appointment.doctor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       appointment.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       appointment.phone?.includes(searchTerm);
  
  const matchesStatus = statusFilter === "All" || appointment.status === statusFilter;
  
  const today = new Date().toISOString().split('T')[0];
  const appointmentDate = appointment.date;
  
  let matchesDate = true;
  if (dateFilter === "Today") {
    matchesDate = appointmentDate === today;
  } else if (dateFilter === "This Week") {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoStr = weekAgo.toISOString().split('T')[0];
    matchesDate = appointmentDate >= weekAgoStr && appointmentDate <= today;
  }
  
  return matchesSearch && matchesStatus && matchesDate;
});

// 8. ADD STATUS COUNTS FUNCTION - Add this after the filter logic
const getStatusCounts = () => {
  return {
    pending: appointments.filter(apt => apt.status === "Pending").length,
    confirmed: appointments.filter(apt => apt.status === "Confirmed").length,
    completed: appointments.filter(apt => apt.status === "Completed").length,
    cancelled: appointments.filter(apt => apt.status === "Cancelled").length
  };
};

const statusCounts = getStatusCounts();

  const renderOverviewTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Recent Appointments */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Appointments</h3>
              <button 
                onClick={() => setActiveTab("Appointments")}
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
              >
                  <Eye className="w-4 h-4" />
                  <span>View All</span>
               </button>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {loading ? (
              <p className="p-6 text-gray-500">Loading appointments...</p>
            ) : appointments.length === 0 ? (
              <p className="p-6 text-gray-500">No appointments found.</p>
            ) : (
             // 9. UPDATE renderOverviewTab - In your existing renderOverviewTab, update the appointments mapping:
// Replace the existing appointments.map section with:
appointments.slice(0, 4).map((appointment) => (
  <div key={appointment.id} className="p-6 hover:bg-gray-50">
    <div className="flex items-center justify-between">
      <div>
        <h4 className="font-medium text-gray-900">{appointment.name}</h4>
        <p className="text-sm text-gray-600">{appointment.doctor} • {appointment.time}</p>
        <p className="text-sm text-gray-500">{appointment.type}</p>
      </div>
      <div className="flex items-center space-x-2">
        {getStatusIcon(appointment.status)}
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
          {appointment.status}
           </span>
            </div>
           </div>
          </div>
        ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Actions</h3>
            <p className="text-sm text-gray-600 mb-6">Common administrative tasks</p>
            
            <button
              className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setShowDoctorForm(true)}
            >
              <UserPlus className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Add New Doctor</span>
            </button>
              
            <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
              <CalendarPlus className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Schedule Appointment</span>
            </button>
            
            <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
              <FileText className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Generate Reports</span>
            </button>
            
            <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
              <Cog className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">System Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDoctorsTab = () => (
    <div className="space-y-6">
      {/* Doctors Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Doctors Management</h2>
          <p className="text-gray-600">Manage your healthcare professionals</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowDoctorForm(true);
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Doctor</span>
        </button>
      </div>

      {/* Doctors Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-500">Loading doctors...</div>
        </div>
      ) : doctors.length === 0 ? (
        <div className="text-center py-12">
          <Stethoscope className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
          <p className="text-gray-500 mb-4">Get started by adding your first doctor</p>
          <button
            onClick={() => setShowDoctorForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add New Doctor
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Doctor Image */}
              <div className="h-48 bg-gray-200 relative">
                {doctor.image ? (
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Stethoscope className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                {/* Action Buttons */}
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={() => handleEditDoctor(doctor)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  >
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteDoctor(doctor.id)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-6">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                  <p className="text-sm text-blue-600 font-medium">{doctor.specialty}</p>
                </div>

                {/* Rating */}
                {doctor.rating && (
                  <div className="flex items-center mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">
                      {doctor.rating} ({doctor.reviews || 0} reviews)
                    </span>
                  </div>
                )}

                {/* Experience */}
                {doctor.experience && (
                  <p className="text-sm text-gray-600 mb-3">
                    Experience: {doctor.experience}
                  </p>
                )}

                {/* Contact Info */}
                <div className="space-y-2">
                  {doctor.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      {doctor.phone}
                    </div>
                  )}
                  {doctor.email && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      {doctor.email}
                    </div>
                  )}
                  {doctor.location && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {doctor.location}
                    </div>
                  )}
                </div>

                {/* Available Time */}
                {doctor.time && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600">Available: {doctor.time}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );


  const renderAppointmentsTab = () => (
  <div className="space-y-6">
    {/* Appointments Header */}
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Appointments Management</h2>
        <p className="text-gray-600">View and manage all appointments</p>
      </div>
      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <CalendarPlus className="w-4 h-4" />
        <span>New Appointment</span>
      </button>
    </div>

    {/* Filters and Search */}
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search appointments, patients, or doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Date Filter */}
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">All Dates</option>
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
          </select>
        </div>
      </div>
    </div>

    {/* Summary Stats */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center">
          <Clock className="w-8 h-8 text-yellow-500 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-xl font-bold text-gray-900">{statusCounts.pending}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center">
          <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Confirmed</p>
            <p className="text-xl font-bold text-gray-900">{statusCounts.confirmed}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center">
          <CheckCircle className="w-8 h-8 text-blue-500 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-xl font-bold text-gray-900">{statusCounts.completed}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center">
          <XCircle className="w-8 h-8 text-red-500 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Cancelled</p>
            <p className="text-xl font-bold text-gray-900">{statusCounts.cancelled}</p>
          </div>
        </div>
      </div>
    </div>

    {/* Appointments List */}
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
          <div className="col-span-3">Patient</div>
          <div className="col-span-3">Doctor</div>
          <div className="col-span-2">Date & Time</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-3">Actions</div>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading appointments...</div>
        ) : filteredAppointments.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <div key={appointment.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Patient Info */}
                <div className="col-span-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{appointment.patientName || 'N/A'}</h4>
                      <p className="text-sm text-gray-500">{appointment.phone || appointment.email || 'No contact'}</p>
                    </div>
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="col-span-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{appointment.doctor || 'N/A'}</h4>
                    <p className="text-sm text-gray-500">{appointment.doctorSpecialty || appointment.specialty || 'General'}</p>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="col-span-2">
                  <div>
                    <p className="font-medium text-gray-900">{appointment.date || 'N/A'}</p>
                    <p className="text-sm text-gray-500">{appointment.time || 'N/A'}</p>
                  </div>
                </div>

                {/* Type */}
                <div className="col-span-2">
                  <span className="text-sm text-gray-600">{appointment.type || 'Consultation'}</span>
                </div>


              


                {/* Status */}
                <div className="col-span-1">
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(appointment.status)}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                      {appointment.status || 'Pending'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="col-span-1">
                  <div className="flex items-center space-x-2">
                    <select
                      value={appointment.status || 'Pending'}
                      onChange={(e) => updateAppointmentStatus(appointment.id, e.target.value)}
                      disabled={updating[appointment.id]}
                      className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>

                    <button
      onClick={() => deleteAppointment(appointment.id)}
      disabled={deleting[appointment.id]}
      className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      title="Delete appointment"
    >
      {deleting[appointment.id] ? (
        <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
                  </div>
                </div>
              </div>

              {/* Notes (expandable) */}
              {appointment.notes && (
                <div className="mt-3 pl-13">
                  <p className="text-sm text-gray-600 italic">Notes: {appointment.notes}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  </div>
);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
              <span className="text-white font-bold">🔥</span>
            </div>
            <span className="font-semibold text-gray-800">MediCare</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-3 py-2 bg-gray-800 text-white rounded">
              <Settings className="w-4 h-4" />
              <span className="text-sm">Settings</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Dashboard Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your healthcare system</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? "..." : usersCount}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Appointments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? "..." : appointments.length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Doctors</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? "..." : doctorsCount}
                </p>
              </div>
              <Stethoscope className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-6 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "Overview" && renderOverviewTab()}
        {activeTab === "Doctors" && renderDoctorsTab()}
        {activeTab === "Appointments" && renderAppointmentsTab()}
        {activeTab === "Users" && <div className="text-center py-8 text-gray-500">Users tab content coming soon...</div>}

        {/* Doctor Form Modal */}
        {showDoctorForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl overflow-y-auto max-h-screen">
              <h2 className="text-xl font-semibold mb-4">
                {editingDoctor ? "Edit Doctor" : "Add New Doctor"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Doctor Name" 
                  value={doctorData.name} 
                  onChange={handleChange} 
                  className="w-full border p-2 rounded" 
                  required 
                />
                <input 
                  type="text" 
                  name="specialty" 
                  placeholder="Specialty" 
                  value={doctorData.specialty} 
                  onChange={handleChange} 
                  className="w-full border p-2 rounded" 
                />
                <input 
                  type="number" 
                  name="rating" 
                  placeholder="Rating (0-5)" 
                  min="0" 
                  max="5" 
                  step="0.1"
                  value={doctorData.rating} 
                  onChange={handleChange} 
                  className="w-full border p-2 rounded" 
                />
                <input 
                  type="number" 
                  name="reviews" 
                  placeholder="Reviews Count" 
                  value={doctorData.reviews} 
                  onChange={handleChange} 
                  className="w-full border p-2 rounded" 
                />
                <input 
                  type="text" 
                  name="experience" 
                  placeholder="Experience (e.g., 10+ years)" 
                  value={doctorData.experience} 
                  onChange={handleChange} 
                  className="w-full border p-2 rounded" 
                />
                <input 
                  type="text" 
                  name="time" 
                  placeholder="Available Time (e.g., Mon-Fri 9AM-5PM)" 
                  value={doctorData.time} 
                  onChange={handleChange} 
                  className="w-full border p-2 rounded" 
                />
                <input 
                  type="text" 
                  name="location" 
                  placeholder="Location/Address" 
                  value={doctorData.location} 
                  onChange={handleChange} 
                  className="w-full border p-2 rounded" 
                />
                <input 
                  type="text" 
                  name="phone" 
                  placeholder="Phone Number" 
                  value={doctorData.phone} 
                  onChange={handleChange} 
                  className="w-full border p-2 rounded" 
                />
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email Address" 
                  value={doctorData.email} 
                  onChange={handleChange} 
                  className="w-full border p-2 rounded" 
                />
                <textarea 
                  name="about" 
                  placeholder="About the doctor" 
                  value={doctorData.about} 
                  onChange={handleChange} 
                  className="w-full border p-2 rounded h-20" 
                />
                <input 
                  type="text" 
                  name="education" 
                  placeholder="Education (comma separated)" 
                  value={doctorData.education} 
                  onChange={handleChange} 
                  className="w-full border p-2 rounded" 
                />
                <input 
                  type="text" 
                  name="certifications" 
                  placeholder="Certifications (comma separated)" 
                  value={doctorData.certifications} 
                  onChange={handleChange} 
                  className="w-full border p-2 rounded" 
                />
                <input 
                  type="text" 
                  name="expertise" 
                  placeholder="Areas of Expertise (comma separated)" 
                  value={doctorData.expertise} 
                  onChange={handleChange} 
                  className="w-full border p-2 rounded" 
                />
                <input 
                  type="text" 
                  name="languages" 
                  placeholder="Languages Spoken (comma separated)" 
                  value={doctorData.languages} 
                  onChange={handleChange} 
                  className="w-full border p-2 rounded" 
                />
                <input 
                  type="text" 
                  name="awards" 
                  placeholder="Awards & Recognition (comma separated)" 
                  value={doctorData.awards} 
                  onChange={handleChange} 
                  className="w-full border p-2 rounded" 
                />
                <input 
                  type="text" 
                  name="insurance" 
                  placeholder="Insurance Accepted (comma separated)" 
                  value={doctorData.insurance} 
                  onChange={handleChange} 
                  className="w-full border p-2 rounded" 
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Doctor Photo
                  </label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="w-full border p-2 rounded" 
                  />
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button 
                    type="button" 
                    onClick={() => {
                      setShowDoctorForm(false);
                      resetForm();
                    }} 
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={uploading} 
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {uploading ? "Saving..." : (editingDoctor ? "Update Doctor" : "Add Doctor")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}