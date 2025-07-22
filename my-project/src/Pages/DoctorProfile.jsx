import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { 
  MapPin, 
  Clock, 
  Star, 
  Phone, 
  Mail, 
  ArrowLeft,
  Calendar,
  Award,
  GraduationCap,
  Heart,
  Shield,
  Languages,
  CreditCard
} from "lucide-react";

const DoctorProfile = () => {
  const { name } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "doctorsdetail"));
        const match = querySnapshot.docs.find(
          doc => doc.data().name.toLowerCase() === decodeURIComponent(name).toLowerCase()
        );
        
        if (match) {
          setDoctor({ id: match.id, ...match.data() });
        } else {
          // Fallback to basic doctors collection
          const basicSnapshot = await getDocs(collection(db, "doctors"));
          const basicMatch = basicSnapshot.docs.find(
            doc => doc.data().name.toLowerCase() === decodeURIComponent(name).toLowerCase()
          );
          if (basicMatch) {
            setDoctor({ id: basicMatch.id, ...basicMatch.data() });
          }
        }
      } catch (error) {
        console.error("Error fetching doctor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [name]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading doctor profile...</p>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Doctor Not Found</h2>
          <p className="text-gray-600 mb-4">The doctor profile you're looking for doesn't exist.</p>
          <Link to="/doctors" className="text-blue-600 hover:text-blue-800">
            ← Back to Doctors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Back Button */}
        <Link 
          to="/doctors" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Doctors
        </Link>

        {/* Doctor Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Doctor Image */}
            <div className="flex-shrink-0">
              <img
                src={doctor.image || "/api/placeholder/200/200"}
                alt={doctor.name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>

            {/* Doctor Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
                    {doctor.name}
                  </h1>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      {doctor.specialty}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                      <span className="font-semibold text-gray-900">
                        {doctor.rating || "4.9"}
                      </span>
                      <span className="text-gray-500 ml-2">
                        ({doctor.reviews || "127"} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 mb-6">
                <div className="flex items-center">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  <span>{doctor.experience}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{doctor.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{doctor.hours || doctor.availability}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{doctor.phone || "+91 (555) 123-4567"}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  to="/appointment" 
                  className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium text-center flex items-center justify-center"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Link>
                {/* <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </button> */}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <Section 
              title="About Dr. Sarah" 
              icon={<Heart className="w-5 h-5 text-blue-600" />}
            >
              <p className="text-gray-700 leading-relaxed">
                {doctor.description || doctor.about || `Dr. ${doctor.name.split(' ')[1]} is a board-certified ${doctor.specialty.toLowerCase()} specialist with over ${doctor.experience} in preventive cardiology and heart disease management. She specializes in interventional procedures and has performed over 2,000 successful cardiac catheterizations.`}
              </p>
            </Section>

            {/* Education & Training */}
            <Section 
              title="Education & Training" 
              icon={<GraduationCap className="w-5 h-5 text-blue-600" />}
            >
              <div className="space-y-3">
                {doctor.education && doctor.education.length > 0 ? (
                  doctor.education.map((edu, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{edu}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">MD - Harvard Medical School (2008)</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">Residency - Johns Hopkins Hospital (2012)</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">Fellowship - Mayo Clinic {doctor.specialty} (2014)</span>
                    </div>
                  </>
                )}
              </div>
            </Section>

            {/* Certifications */}
            <Section 
              title="Certifications" 
              icon={<Shield className="w-5 h-5 text-blue-600" />}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doctor.certifications && doctor.certifications.length > 0 ? (
                  doctor.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <Shield className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{cert}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <Shield className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Board Certified in Cardiovascular Disease</span>
                    </div>
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <Shield className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Board Certified in Interventional Cardiology</span>
                    </div>
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <Shield className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Advanced Cardiac Life Support (ACLS)</span>
                    </div>
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <Shield className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Nuclear Cardiology Certification</span>
                    </div>
                  </>
                )}
              </div>
            </Section>

            {/* Areas of Expertise */}
            <Section 
              title="Areas of Expertise" 
              icon={<Heart className="w-5 h-5 text-blue-600" />}
            >
              <div className="flex flex-wrap gap-2">
                {doctor.expertise && doctor.expertise.length > 0 ? (
                  doctor.expertise.map((area, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm">
                      {area}
                    </span>
                  ))
                ) : (
                  <>
                    <span className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm">
                      Preventive Cardiology
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm">
                      Interventional Cardiology
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm">
                      Heart Disease Management
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm">
                      Cardiac Catheterization
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm">
                      Echocardiography
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm">
                      Stress Testing
                    </span>
                  </>
                )}
              </div>
            </Section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Section 
              title="Contact Information" 
              icon={<Phone className="w-5 h-5 text-blue-600" />}
            >
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-3" />
                  <span>{doctor.phone || "+1 (555) 123-4567"}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-3" />
                  <span>{doctor.email || "sarah.johnson@medicare.com"}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-3" />
                  <span>{doctor.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-3" />
                  <span>{doctor.hours || doctor.availability}</span>
                </div>
              </div>
            </Section>

            {/* Languages */}
            <Section 
              title="Languages" 
              icon={<Languages className="w-5 h-5 text-blue-600" />}
            >
              <div className="flex flex-wrap gap-2">
                {doctor.languages && doctor.languages.length > 0 ? (
                  doctor.languages.map((lang, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">
                      {lang}
                    </span>
                  ))
                ) : (
                  <>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">English</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">Hindi</span>
                    
                  </>
                )}
              </div>
            </Section>

            {/* Awards & Recognition */}
            <Section 
              title="Awards & Recognition" 
              icon={<Award className="w-5 h-5 text-blue-600" />}
            >
              <div className="space-y-2">
                {doctor.awards && doctor.awards.length > 0 ? (
                  doctor.awards.map((award, index) => (
                    <p key={index} className="text-gray-700 text-sm">{award}</p>
                  ))
                ) : (
                  <>
                    <p className="text-gray-700 text-sm">Top Doctor Award 2023 - City Medical Association</p>
                    <p className="text-gray-700 text-sm">Excellence in Patient Care 2022</p>
                    <p className="text-gray-700 text-sm">Research Excellence Award 2021</p>
                  </>
                )}
              </div>
            </Section>

            {/* Insurance Accepted */}
            <Section 
              title="Insurance Accepted" 
              icon={<CreditCard className="w-5 h-5 text-blue-600" />}
            >
              <div className="space-y-2">
                {doctor.insurance && doctor.insurance.length > 0 ? (
                  doctor.insurance.map((ins, index) => (
                    <p key={index} className="text-gray-700 text-sm">• {ins}</p>
                  ))
                ) : (
                  <>
                    <p className="text-gray-700 text-sm">• Blue Cross Blue Shield</p>
                    <p className="text-gray-700 text-sm">• Aetna</p>
                    <p className="text-gray-700 text-sm">• Cigna</p>
                    <p className="text-gray-700 text-sm">• UnitedHealthcare</p>
                    <p className="text-gray-700 text-sm">• Medicare</p>
                    <p className="text-gray-700 text-sm">• Medicaid</p>
                  </>
                )}
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Section Component
const Section = ({ title, icon, children }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
      {icon}
      <span className="ml-2">{title}</span>
    </h2>
    {children}
  </div>
);

export default DoctorProfile;