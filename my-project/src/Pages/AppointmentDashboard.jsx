import { Calendar, Clock, Phone, Mail, MapPin, MoreHorizontal, Plus, Check, X } from 'lucide-react';
import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const AppointmentsDashboard = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [showDropdown, setShowDropdown] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch appointments from Firebase
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'appointments'));
        const appointmentsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppointments(appointmentsData);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const getStatusCounts = () => {
    const counts = appointments.reduce((acc, appointment) => {
      acc[appointment.status] = (acc[appointment.status] || 0) + 1;
      return acc;
    }, {});
    
    return {
      total: appointments.length,
      confirmed: counts.Confirmed || 0,
      pending: counts.Pending || 0,
      completed: counts.Completed || 0,
      cancelled: counts.Cancelled || 0
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAppointments = activeTab === 'All' 
    ? appointments 
    : appointments.filter(apt => apt.status === activeTab);

  const statusCounts = getStatusCounts();

  const handleDropdownToggle = (appointmentId) => {
    setShowDropdown(showDropdown === appointmentId ? null : appointmentId);
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      // Update in Firebase
      const appointmentRef = doc(db, 'appointments', appointmentId);
      await updateDoc(appointmentRef, {
        status: newStatus
      });

      // Update local state
      setAppointments(prevAppointments => 
        prevAppointments.map(appointment => 
          appointment.id === appointmentId 
            ? { ...appointment, status: newStatus }
            : appointment
        )
      );
      setShowDropdown(null);
    } catch (error) {
      console.error('Error updating appointment status:', error);
      alert('Failed to update appointment status. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Appointments</h1>
              <p className="text-gray-600 mt-1">Manage and track all patient appointments</p>
            </div>
            <button className="bg-blue-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-800 transition-colors">
              <Plus className="w-4 h-4" />
              New Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">{statusCounts.total}</div>
            <div className="text-gray-600">Total</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-3xl font-bold text-green-600 mb-2">{statusCounts.confirmed}</div>
            <div className="text-gray-600">Confirmed</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-3xl font-bold text-yellow-600 mb-2">{statusCounts.pending}</div>
            <div className="text-gray-600">Pending</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">{statusCounts.completed}</div>
            <div className="text-gray-600">Completed</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b">
            {['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <div key={appointment.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-xl font-semibold text-blue-900">
                      {appointment.patientName || `${appointment.firstName} ${appointment.lastName}`}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>
                  
                  <div className="text-gray-600 mb-4">
                    {appointment.doctorName || appointment.doctor} • {appointment.specialty}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{appointment.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{appointment.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 mt-2">
                    <MapPin className="w-4 h-4" />
                    <span>{appointment.location || 'Clinic'}</span>
                  </div>

                  {appointment.reason && (
                    <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm font-medium text-gray-700 mb-1">Reason for Visit:</div>
                      <div className="text-gray-600">{appointment.reason}</div>
                    </div>
                  )}
                </div>

                {/* Action Menu */}
                <div className="relative">
                  <button
                    onClick={() => handleDropdownToggle(appointment.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <MoreHorizontal className="w-5 h-5 text-gray-500" />
                  </button>
                  
                  {showDropdown === appointment.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                      <div className="py-2">
                        <button
                          onClick={() => handleStatusChange(appointment.id, 'Confirmed')}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                        >
                          <Check className="w-4 h-4 text-green-600" />
                          Mark as Confirmed
                        </button>
                        <button
                          onClick={() => handleStatusChange(appointment.id, 'Completed')}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                        >
                          <Check className="w-4 h-4 text-blue-600" />
                          Mark as Completed
                        </button>
                        <button
                          onClick={() => handleStatusChange(appointment.id, 'Cancelled')}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600"
                        >
                          <X className="w-4 h-4" />
                          Cancel Appointment
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAppointments.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No appointments found for "{activeTab}"</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsDashboard;