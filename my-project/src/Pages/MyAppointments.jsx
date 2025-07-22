import React, { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, Phone, Video, Plus, Bell, Heart, CheckCircle, XCircle, AlertCircle, Clock as ClockIcon } from 'lucide-react';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // adjust if needed
import Header from '../components/Header';
import { Link } from "react-router-dom";

const MyAppointments = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [appointments, setAppointments] = useState({ 
    upcoming: [], 
    past: [],
    all: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const snapshot = await getDocs(collection(db, "appointments"));
        const now = new Date();

        const upcoming = [];
        const past = [];
        const all = [];

        snapshot.docs.forEach(doc => {
          const data = doc.data();
          const appointmentData = { id: doc.id, ...data };
          
          all.push(appointmentData);
          
          // Only show non-cancelled appointments in upcoming/past
          if (data.status !== 'Cancelled') {
            const appDate = new Date(`${data.date} ${data.time}`);
            if (appDate >= now && data.status !== 'Completed') {
              upcoming.push(appointmentData);
            } else if (appDate < now || data.status === 'Completed') {
              past.push(appointmentData);
            }
          }
        });

        // Sort appointments
        upcoming.sort((a, b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`));
        past.sort((a, b) => new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`));

        setAppointments({ upcoming, past, all });
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'Pending': return <ClockIcon className="w-4 h-4" />;
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      case 'Cancelled': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusCounts = () => {
    const counts = appointments.all.reduce((acc, appointment) => {
      acc[appointment.status] = (acc[appointment.status] || 0) + 1;
      return acc;
    }, {});
    
    return {
      upcoming: appointments.upcoming.length,
      completed: counts.Completed || 0,
      pending: counts.Pending || 0,
      cancelled: counts.Cancelled || 0
    };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const getNextAppointment = () => {
    return appointments.upcoming.find(apt => apt.status === 'Confirmed') || appointments.upcoming[0];
  };

  const nextAppointment = getNextAppointment();
  const statusCounts = getStatusCounts();

  const AppointmentCard = ({ appointment, isNext = false }) => (
    <div className={`bg-white rounded-2xl shadow-sm border p-6 transition-all duration-200 hover:shadow-md ${
      isNext ? 'border-blue-200 bg-gradient-to-br from-blue-50 to-white' : 'border-gray-100'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="text-4xl">{appointment.avatar || '👨‍⚕️'}</div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">
              {appointment.doctorName || appointment.doctor}
            </h3>
            <p className="text-blue-600 font-medium">{appointment.specialty}</p>
            {appointment.reason && (
              <p className="text-gray-500 text-sm mt-1">{appointment.reason}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          {isNext && (
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Next
            </div>
          )}
          <div className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center gap-1 ${getStatusColor(appointment.status)}`}>
            {getStatusIcon(appointment.status)}
            {appointment.status}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center text-gray-700">
            <Calendar className="w-4 h-4 mr-3 text-blue-600" />
            <span className="font-medium">{formatDate(appointment.date)}</span>
          </div>
          
          <div className="flex items-center text-gray-700">
            <Clock className="w-4 h-4 mr-3 text-blue-600" />
            <span className="font-medium">{appointment.time}</span>
          </div>

          <div className="flex items-center text-gray-700 md:col-span-2">
            {appointment.type === 'Video Call' ? (
              <Video className="w-4 h-4 mr-3 text-blue-600" />
            ) : (
              <MapPin className="w-4 h-4 mr-3 text-blue-600" />
            )}
            <div>
              <div className="font-medium">{appointment.location}</div>
              {appointment.address && appointment.address !== 'Online' && (
                <div className="text-sm text-gray-500">{appointment.address}</div>
              )}
            </div>
          </div>

          {appointment.phone && (
            <div className="flex items-center text-gray-700 md:col-span-2">
              <Phone className="w-4 h-4 mr-3 text-blue-600" />
              <span>{appointment.phone}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex space-x-3">
        {activeTab === 'upcoming' && appointment.status !== 'Cancelled' && (
          <>
            <Link 
  to={`/appointments/${appointment.id}`}
  className={`flex-1 px-4 py-3 rounded-xl text-center transition-colors font-medium ${
    appointment.status === 'Confirmed' 
      ? 'bg-blue-600 text-white hover:bg-blue-700' 
      : 'bg-gray-100 text-gray-600 cursor-not-allowed pointer-events-none'
  }`}
>
  {appointment.type === 'Video Call' ? 'Join Video Call' : 'View Details'}
</Link>
            {/* <button className="px-4 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
              Reschedule
            </button> */}
          </>
        )}
        {/* {activeTab === 'past' && (
          <button className="flex-1 bg-blue-100 text-blue-700 px-4 py-3 rounded-xl hover:bg-blue-200 transition-colors font-medium">
            View Summary
          </button>
        )} */}
        {appointment.status === 'Cancelled' && (
          <div className="flex-1 text-center py-3 text-red-600 font-medium">
            This appointment was cancelled
          </div>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header/>
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray- mt-25">My Appointments</h1>
              <p className="text-gray-600 mt-1">Keep track of your healthcare visits</p>
            </div>
            <Link to='/appointment' className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Book Appointment</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Next Appointment Highlight */}
        {nextAppointment && (
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Bell className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Your Next Appointment</h2>
            </div>
            <AppointmentCard appointment={nextAppointment} isNext={true} />
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 text-center border border-gray-100">
            <div className="text-2xl mb-2">📅</div>
            <div className="text-2xl font-bold text-blue-600">{statusCounts.upcoming}</div>
            <div className="text-gray-600 text-sm">Upcoming</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 text-center border border-gray-100">
            <div className="text-2xl mb-2">✅</div>
            <div className="text-2xl font-bold text-green-600">{statusCounts.completed}</div>
            <div className="text-gray-600 text-sm">Completed</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 text-center border border-gray-100">
            <div className="text-2xl mb-2">⏳</div>
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</div>
            <div className="text-gray-600 text-sm">Pending</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 text-center border border-gray-100">
            <div className="text-2xl mb-2">❌</div>
            <div className="text-2xl font-bold text-red-500">{statusCounts.cancelled}</div>
            <div className="text-gray-600 text-sm">Cancelled</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-2xl mb-6 max-w-md">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
              activeTab === 'upcoming'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
              activeTab === 'past'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Past Visits
          </button>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {appointments[activeTab].map(appointment => (
            <AppointmentCard 
              key={appointment.id} 
              appointment={appointment} 
              isNext={false}
            />
          ))}
        </div>

        {appointments[activeTab].length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No {activeTab} appointments
            </h3>
            <p className="text-gray-600 mb-6">
              {activeTab === 'upcoming' 
                ? "You're all caught up! Book your next appointment when you're ready."
                : "Your appointment history will appear here after your visits."
              }
            </p>
            {activeTab === 'upcoming' && (
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium inline-flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Book Your Next Appointment</span>
              </button>
            )}
          </div>
        )}

        {/* Health Tip */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-start space-x-3">
            <Heart className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Health Tip</h4>
              <p className="text-gray-700">
                Regular checkups help catch health issues early. Don't forget to schedule your annual wellness visit!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;