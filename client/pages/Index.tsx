import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PhoneCall, CarFront, BadgeDollarSign } from "lucide-react"; // Lucide Icons
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MapPin,
  Phone,
  Mail,
  Star,
  Home,
  Trees,
  Car,
  Dumbbell,
  Waves,
  Shield,
  Users,
  Building,
  ChevronRight,
  CheckCircle,
  Calendar,
  IndianRupee,
  Ruler,
  Bath,
  BedDouble,
  Menu,
  X,
  MessageCircle,
  Image,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect  } from "react";

export default function Index() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const images = [
    "/images/carousel/img1.jpg",
    "/images/carousel/img2.jpg",
    "/images/carousel/img3.jpg",
    "/images/carousel/img4.jpg",
    "/images/carousel/img5.jpg",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);


  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [enquireModalOpen, setEnquireModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [enquireFormData, setEnquireFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setEnquireModalOpen(true);
    }, 10000); // 10 seconds = 10000 ms

    return () => clearTimeout(timer); // Clean up on unmount
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [showPopup, setShowPopup] = useState(false);

  
  const [isLoading, setIsLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showalertPopup, setShowalertPopup] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // This prevents the React form submission
    
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzam5LVsp4nLGCM0ZNk_-C_8u7VKFpqyNgMOCp93F-k97QJnsi8h7xE0-Nfbm-IPvnANw/exec'
    const form = e.target as HTMLFormElement

    setEnquireModalOpen(false);
    setIsLoading(true);

    // // Show confirmation instantly (optimistic UI)
    // alert("Thank you! Form is submitted");
    
    // Direct fetch call - no need for another event listener
    fetch(scriptURL, { 
      method: 'POST', 
      body: new FormData(form)
    })
    .then(response => {
      console.log("Response", response)
      setIsLoading(false)
      
      setPopupMessage("data submit successfully")
      setShowalertPopup(true)
      // Optionally reset the form
      form.reset();
    })
    .catch(error => { 
      setIsLoading(false);
      setPopupMessage("Error! Something went wrong.");
      setShowalertPopup(true);
      console.log('Error!', error.message)})
  };

  const handleEnquireInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnquireFormData({
      ...enquireFormData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleEnquireSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Enquire form submitted:", enquireFormData);

  //   // Send data to backend/Google Sheets
  //   try {
  //     const response = await fetch("/api/enquiry", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(enquireFormData),
  //     });

  //     if (response.ok) {
  //       alert(
  //         "Thank You! Your enquiry has been successfully submitted. Thank you for showing interest in us. One of our executives will get in touch with you.\n\nGet in touch with us at 9211633459\n\nWe'll use your information to contact you about our services and products.",
  //       );
  //       setEnquireFormData({ name: "", phone: "", email: "", message: "" });
  //       setEnquireModalOpen(false);
  //     } else {
  //       alert("There was an error submitting your enquiry. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting enquiry:", error);
  //     alert("There was an error submitting your enquiry. Please try again.");
  //   }
  // };

  const handleWhatsAppClick = () => {
    const phoneNumber = "919211633459"; // WhatsApp number
    const message =
      "Hi, I'm interested in Godrej Majesty project. Please share more details.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-white">

       {/* {isLoading && (
        <div className="loader">Loading...</div> 
      )} */}
      {/* {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white text-lg font-medium">Submitting your enquiry...</p>
          </div>
        </div>
      )} */}

      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 border-[6px] border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white text-xl font-semibold">Submitting your enquiry...</p>
          </div>
        </div>
      )}


      {/* {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>{popupMessage}</p>
            <Button onClick={() => setShowPopup(false)}>Close</Button>
          </div>
        </div>
      )} */}

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">

            <div className="flex items-center space-x-2">
              {/* First Logo */}
              <div className="w-15 h-11 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src="/images/carousel/godrej.png"
                  alt="Godrej Logo"
                  className="object-contain w-full h-full"
                />
              </div>

              {/* Second Logo */}
              <div className="w-15 h-12 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src="/images/carousel/logo.jpeg"
                  alt="Godrej Logo"
                  className="object-contain w-full h-full"
                />
              </div>

              {/* Optional text */}
              {/* <span className="text-xl font-bold text-gray-900">Godrej Majesty</span> */}
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                className="text-gray-700 hover:text-luxury-600 transition-colors"
              >
                Home
              </a>
              <a
                href="#amenities"
                className="text-gray-700 hover:text-luxury-600 transition-colors"
              >
                Amenities
              </a>
              <a
                href="#pricing"
                className="text-gray-700 hover:text-luxury-600 transition-colors"
              >
                Pricing
              </a>
              <a
                href="#location"
                className="text-gray-700 hover:text-luxury-600 transition-colors"
              >
                Location
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-luxury-600 transition-colors"
              >
                Contact
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <Dialog
                open={enquireModalOpen}
                onOpenChange={setEnquireModalOpen}
              >
                <DialogTrigger asChild>
                  <Button className="hidden lg:flex bg-emerald-500 hover:bg-emerald-600 text-white">
                    Enquire Now
                  </Button>
                </DialogTrigger>
              </Dialog>

              <Button
                className="hidden sm:flex bg-luxury-500 hover:bg-luxury-600 text-white"
                onClick={() => window.open("tel:+919211633459")}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-lg">
              <nav className="flex flex-col space-y-4 p-4">
                <a
                  href="#home"
                  className="text-gray-700 hover:text-luxury-600 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </a>
                <a
                  href="#amenities"
                  className="text-gray-700 hover:text-luxury-600 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Amenities
                </a>
                <a
                  href="#pricing"
                  className="text-gray-700 hover:text-luxury-600 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </a>
                <a
                  href="#location"
                  className="text-gray-700 hover:text-luxury-600 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Location
                </a>
                <a
                  href="#contact"
                  className="text-gray-700 hover:text-luxury-600 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>

                <Dialog
                  open={enquireModalOpen}
                  onOpenChange={setEnquireModalOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      className="bg-emerald-500 hover:bg-emerald-600 text-white mt-4"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Enquire Now
                    </Button>
                  </DialogTrigger>
                </Dialog>

                <Button
                  className="bg-luxury-500 hover:bg-luxury-600 text-white mt-2"
                  onClick={() => {
                    window.open("tel:+919211633459");
                    setMobileMenuOpen(false);
                  }}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://cdn.builder.io/api/v1/image/assets%2F7c5f6e05ab574b11a385ab0e313c151e%2F88f66aff39fe447b87611427efbf6392?format=webp&width=2000')",
          }}
        ></div> */}

        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40 z-10"></div>
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url('${image}')`,
            }}
          />
        ))}

        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <Badge className="mb-6 bg-luxury-500/20 text-luxury-200 border-luxury-500/30 text-sm px-4 py-2">
            Premium Living Experience
          </Badge>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Godrej Majesty
            <span className="block text-2xl lg:text-2xl text-luxury-400 mt-2">
              Sector 12, Greater Noida (W), <br></br>Phase 2
            </span>
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Experience luxury living with world-class amenities, prime location,
            and architectural excellence in the heart of Noida.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Dialog open={enquireModalOpen} onOpenChange={setEnquireModalOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-luxury-500 hover:bg-luxury-600 text-white px-8 py-4 text-lg"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Enquire Now
                </Button>
              </DialogTrigger>
            </Dialog>
            <Dialog open={enquireModalOpen} onOpenChange={setEnquireModalOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-luxury-500 hover:bg-luxury-600 text-white px-8 py-4 text-lg"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Site Visit
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-emerald-400" />
              <span>RERA Approved</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-emerald-400" />
              <span>Ready to Move</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-emerald-400" />
              <span>Premium Location</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-luxury-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IndianRupee className="w-8 h-8 text-luxury-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Starting ₹2.5 Cr
                </h3>
                <p className="text-gray-600">
                  Competitive pricing with flexible payment plans
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Ruler className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  1450-3200 Sq.Ft
                </h3>
                <p className="text-gray-600">
                  Spacious 3 & 4 BHK apartments
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Prime Location
                </h3>
                <p className="text-gray-600">
                  Connected to Metro, malls & business districts
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-luxury-100 text-luxury-700 border-luxury-200">
              World-Class Amenities
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Luxury Living Redefined
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience an array of premium amenities designed to enhance your
              lifestyle and create unforgettable moments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Waves,
                title: "Swimming Pool",
                desc: "Olympic-size pool with kids area",
              },
              {
                icon: Dumbbell,
                title: "Fitness Center",
                desc: "State-of-the-art gym equipment",
              },
              {
                icon: Trees,
                title: "Landscaped Gardens",
                desc: "Beautifully designed green spaces",
              },
              {
                icon: Car,
                title: "Parking",
                desc: "Covered parking for residents",
              },
              {
                icon: Shield,
                title: "24/7 Security",
                desc: "CCTV surveillance & guards",
              },
              {
                icon: Users,
                title: "Community Hall",
                desc: "Event space for gatherings",
              },
              {
                icon: Building,
                title: "Business Center",
                desc: "Co-working & meeting rooms",
              },
              {
                icon: Home,
                title: "Children's Play Area",
                desc: "Safe outdoor play zone",
              },
            ].map((amenity, index) => (
              <Card
                key={index}
                className="p-6 border-0 shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <CardContent className="p-0 text-center">
                  <div className="w-12 h-12 bg-luxury-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <amenity.icon className="w-6 h-6 text-luxury-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {amenity.title}
                  </h3>
                  <p className="text-sm text-gray-600">{amenity.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
              Project Gallery
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Visual Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the stunning architecture, interiors, and amenities that
              make Godrej Majesty a masterpiece of modern living.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Walkthrough Video Section */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="aspect-[4/3] overflow-hidden">
                <video
                  controls
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  poster="/images/carousel/logo.jpeg"
                >
                  <source src="/images/carousel/sample.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg mb-2">
                    Walkthrough Video
                  </h3>
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-white/20 text-white border-white/30 hover:bg-white hover:text-gray-900 px-4 py-2 rounded text-sm flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Play Fullscreen
                  </button>
                </div>
              </div>
            </div>

            {/* Modal */}
            {showModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
                <div className="relative w-full max-w-5xl">
                  <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-4 text-white hover:text-red-500 z-50"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <video
                    autoPlay
                    controls
                    className="w-full h-[80vh] object-contain rounded"
                    poster="/images/carousel/logo.jpeg"
                  >
                    <source src="/images/carousel/sample.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}
            {[
              {
                src: "https://cdn.builder.io/api/v1/image/assets%2F7c5f6e05ab574b11a385ab0e313c151e%2F88f66aff39fe447b87611427efbf6392?format=webp&width=600",
                alt: "Godrej Majesty Building Exterior",
                title: "Godrej Majesty - Premium Architecture",
              },
              {
                src: "https://cdn.builder.io/api/v1/image/assets%2F7c5f6e05ab574b11a385ab0e313c151e%2F73058b812be44fdf8ada48b0289ae383?format=webp&width=600",
                alt: "Landscaped Gardens with Water Features",
                title: "Landscaped Gardens & Water Features",
              },
              {
                src: "https://cdn.builder.io/api/v1/image/assets%2F7c5f6e05ab574b11a385ab0e313c151e%2F2de6887852f34a7a93c72064dcc525d6?format=webp&width=600",
                alt: "Community Fountains",
                title: "Community Fountains & Plaza",
              },
              {
                src: "https://cdn.builder.io/api/v1/image/assets%2F7c5f6e05ab574b11a385ab0e313c151e%2F310b8db6df6c4b5db81bd183d4928868?format=webp&width=600",
                alt: "Modern Kitchen",
                title: "Premium Modular Kitchen",
              },
              {
                src: "https://cdn.builder.io/api/v1/image/assets%2F7c5f6e05ab574b11a385ab0e313c151e%2F930418b94b4d44b682f3bc2c5dbc0522?format=webp&width=600",
                alt: "Master Bedroom",
                title: "Elegant Master Bedroom",
              },
              {
                src: "https://cdn.builder.io/api/v1/image/assets%2F7c5f6e05ab574b11a385ab0e313c151e%2Fe52da6b8dae848a6af3d1ac8eb67eb4e?format=webp&width=600",
                alt: "Dining & Living Area",
                title: "Open Plan Dining & Living",
              },
              {
                src: "https://cdn.builder.io/api/v1/image/assets%2F7c5f6e05ab574b11a385ab0e313c151e%2F479f47a1f7ce4a50908b5a44f053f0d9?format=webp&width=600",
                alt: "Bedroom with Balcony",
                title: "Bedroom with Private Balcony",
              },
              {
                src: "https://cdn.builder.io/api/v1/image/assets%2F7c5f6e05ab574b11a385ab0e313c151e%2F12eb8c22487b45f9a68a922ec9593e64?format=webp&width=600",
                alt: "Living Room Interior",
                title: "Spacious Living Room",
              },
              {
                src: "https://cdn.builder.io/api/v1/image/assets%2F7c5f6e05ab574b11a385ab0e313c151e%2Feafdc3a6226449e09c4bf2c22682f590?format=webp&width=600",
                alt: "Location Connectivity",
                title: "Prime Location Connectivity",
              },
            ].map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg mb-2">
                      {image.title}
                    </h3>
                    <Dialog
                      open={enquireModalOpen}
                      onOpenChange={setEnquireModalOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/20 text-white border-white/30 hover:bg-white hover:text-gray-900"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Larger
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Dialog open={enquireModalOpen} onOpenChange={setEnquireModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-luxury-500 hover:bg-luxury-600 text-white px-8 py-3">
                  <Image className="w-5 h-5 mr-2" />
                  View Complete Gallery
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Floor Plans Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 border-emerald-200">
              Floor Plans
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Choose Your Perfect Home
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Thoughtfully designed apartments with optimal space utilization
              and premium finishes.
            </p>
          </div>

          {/* Tower T5 Pricing Table */}
          <div className="mb-12 bg-white p-8 rounded-xl shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Tower T5 - Pre Launch Pricing
              </h3>
              <p className="text-luxury-600 font-semibold">
                Pre Launch Prices Valid Till 26th July
              </p>
              <p className="text-sm text-gray-600 mt-2">
                *GST, Lease Rent (600), AMC IFMS & Other Charges Additional
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-luxury-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Typology
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                      Min (In Cr)
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                      Max (In Cr)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium">
                      3 BHK
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-luxury-600 font-bold">
                      ₹2.90
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-luxury-600 font-bold">
                      ₹3.20
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">
                      4 BHK + S
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-luxury-600 font-bold">
                      ₹3.96
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-luxury-600 font-bold">
                      ₹4.48
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                type: "3 BHK",
                area: "1325-1450 Sq.Ft",
                priceRange: "₹2.90 - ₹3.20 Cr",
                bedrooms: 3,
                bathrooms: 3,
                features: [
                  "Master Bedroom with Attached Bath",
                  "Spacious Living & Dining",
                  "Premium Modular Kitchen",
                  "Private Balcony",
                  "Study/Utility Room",
                ],
                popular: true,
              },
              {
                type: "4 BHK + Study",
                area: "1840-2150 Sq.Ft",
                priceRange: "₹3.96 - ₹4.48 Cr",
                bedrooms: 4,
                bathrooms: 4,
                features: [
                  "Master Suite with Walk-in Closet",
                  "Separate Study Room",
                  "Premium Kitchen with Utility",
                  "Large Balconies",
                  "Servant Room",
                ],
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`p-8 border-0 shadow-lg hover:shadow-xl transition-all relative ${plan.popular ? "ring-2 ring-luxury-400" : ""}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-luxury-500 text-white">
                    Most Popular
                  </Badge>
                )}
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.type}
                    </h3>
                    <p className="text-gray-600 mb-4">{plan.area}</p>
                    <div className="text-3xl font-bold text-luxury-600">
                      {plan.priceRange}
                    </div>
                  </div>

                  <div className="flex justify-center space-x-6 mb-6">
                    <div className="flex items-center">
                      <BedDouble className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="text-gray-700">{plan.bedrooms} Bed</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="text-gray-700">
                        {plan.bathrooms} Bath
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Dialog
                    open={enquireModalOpen}
                    onOpenChange={setEnquireModalOpen}
                  >
                    <DialogTrigger asChild>
                      <Button className="w-full bg-luxury-500 hover:bg-luxury-600 text-white">
                        View Floor Plan
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location Advantages */}
      <section id="location" className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
                Strategic Location
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Connected to Everything That Matters
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Located in the heart of Noida Sector 12, enjoy seamless
                connectivity to Delhi, Gurgaon, and major business hubs.
              </p>

              <div className="space-y-4">
                {[
                  {
                    place: "Noida City Centre Metro",
                    distance: "2 km",
                    time: "5 min",
                  },
                  {
                    place: "DLF Mall of India",
                    distance: "3 km",
                    time: "8 min",
                  },
                  {
                    place: "Indira Gandhi Int'l Airport",
                    distance: "45 km",
                    time: "1 hr",
                  },
                  {
                    place: "Connaught Place",
                    distance: "25 km",
                    time: "45 min",
                  },
                  {
                    place: "Sector 18 Market",
                    distance: "5 km",
                    time: "15 min",
                  },
                  {
                    place: "Fortis Hospital",
                    distance: "4 km",
                    time: "10 min",
                  },
                ].map((location, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-luxury-600 mr-3" />
                      <span className="font-medium text-gray-900">
                        {location.place}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {location.distance}
                      </div>
                      <div className="text-xs text-gray-600">
                        {location.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.038985699234!2d77.36168747615488!3d28.469109775729195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce626851f7009%3A0x621185133cdf6b9!2sSector%2012%2C%20Greater%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1703234567890!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl"
                ></iframe>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-luxury-600">15+</div>
                  <div className="text-sm text-gray-600">
                    Metro Stations Nearby
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <Badge className="mb-4 bg-luxury-500/20 text-luxury-300 border-luxury-500/30">
                Get In Touch
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Ready to Make This Your Home?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Schedule a site visit or speak with our sales team to learn more
                about Godrej Majesty.
              </p>

              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-luxury-500 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Sales Hotline</div>
                    <div className="text-gray-300">+91 9211633459, +91 7291053549</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-luxury-500 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Email Us</div>
                    <div className="text-gray-300">sales@godrejmajesty.com</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-luxury-500 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Sales Office</div>
                    <div className="text-gray-300">
                      Sector 12, Greater Noida (W), UP 203207
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-8 bg-white text-gray-900 border-0">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-6">Schedule Your Visit</h3>
                <form 
                  method="post" 
                  name="contact-form" 
                  onSubmit={handleSubmit}  // Add this
                  className="space-y-4"
                  // Remove the action attribute to prevent native form submission
                >
                  <div>
                    <Input
                      name="Name"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="Email"
                      type="email"
                      placeholder="Email Address"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="Phone"
                      type="tel"
                      placeholder="Phone Number"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="Message"
                      placeholder="Message (Optional)"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-luxury-500 hover:bg-luxury-600 text-white"
                  >
                    Schedule Site Visit
                  </Button>
                </form>
              </CardContent>
            </Card>

            {showalertPopup && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white px-8 py-6 rounded-xl shadow-2xl text-center max-w-md w-full animate-fade-in">
                  <h2 className="text-2xl font-bold mb-2" style={{ color: '#3BC489' }}>
                    Thank You!
                  </h2>
                  <p className="text-gray-700 mb-4">
                    One of our executives will connect with you shortly.<br />
                    📞 Need immediate assistance?<br />
                    Feel free to call us at{" "}
                    <a href="tel:+919211633459" className="text-blue-600 underline hover:text-blue-800">
                      9211633459
                    </a>{" "}
                    or{" "}
                    <a href="tel:+917291053549" className="text-blue-600 underline hover:text-blue-800">
                      7291053549
                    </a>
                  </p>
                  <button
                    onClick={() => setShowalertPopup(false)}
                    className="px-6 py-2 text-white rounded-lg transition duration-200 hover:brightness-110"
                    style={{ backgroundColor: '#E69119' }}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* {isLoading && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm w-full flex flex-col items-center">
                  <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-800 font-medium text-lg">Submitting your enquiry...</p>
                </div>
              </div>
            )} */}

            
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-luxury-500 to-luxury-600 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Godrej Majesty</span>
              </div>
              <p className="text-gray-400">
                Creating premium living experiences in the heart of Noida.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#amenities"
                    className="hover:text-white transition-colors"
                  >
                    Amenities
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-white transition-colors"
                  >
                    Floor Plans
                  </a>
                </li>
                <li>
                  <a
                    href="#location"
                    className="hover:text-white transition-colors"
                  >
                    Location
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    RERA Details
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Disclaimer
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <div>+91 9211633459, +91 7291053549</div>
                <div> sales@godrejmajesty.com</div>
                <div>Sector 12, Greater Noida (W), UP 203207</div>
              </div>
            </div>
          </div>

          {/* 👉 Disclaimer Section */}
          <div className="mt-10 text-sm text-gray-400 space-y-4 leading-relaxed">
            <p>
              <strong>Disclaimer:</strong> The information provided on this website is intended exclusively for informational purposes and should not be construed as an offer of services. This site is managed by a RERA authorized affiliate partner / real estate agent (for multiple real estate developers) namely The House of Properties. The pricing information presented on this website is subject to alteration without advance notification, and the assurance of property availability cannot be guaranteed. The images showcased on this website are for representational purposes only and may not accurately reflect the actual properties. We may share your data with Uttar Pradesh Real Estate Regulatory Authority (RERA) registered Developers for further processing as necessary. Additionally, we may send updates and information to the mobile number or email address registered with us. All rights reserved. The content, design, and information on this website are protected by copyright and other intellectual property rights. Any unauthorized use or reproduction of the content may violate applicable laws. For accurate and up-to-date information regarding services, pricing, availability, and any other details, it is recommended to contact us directly through the provided contact information on this website. Thank you for visiting our website.
            </p>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; All rights reserved 2025.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      <Dialog open={enquireModalOpen} onOpenChange={setEnquireModalOpen}>
        <DialogContent className="w-full max-w-3xl max-h-[90vh] overflow-y-auto p-4 md:p-6 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-gray-900">
              Enquire About Godrej Majesty
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full">
            {/* Left Side: Commitments */}
            <div className="bg-white p-6 md:p-8 md:w-1/2 border-b md:border-b-0 md:border-r">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-[#003B8F]">Our Commitments</h2>
              <div className="space-y-5 text-[#E69119]">
                <div className="flex items-center space-x-3">
                  <PhoneCall className="w-5 h-5 md:w-6 md:h-6" />
                  <p className="font-medium text-black text-sm md:text-base">Quick Callback Guaranteed</p>
                </div>
                <div className="flex items-center space-x-3">
                  <CarFront className="w-5 h-5 md:w-6 md:h-6" />
                  <p className="font-medium text-black text-sm md:text-base">Complimentary Site Visit</p>
                </div>
                <div className="flex items-center space-x-3">
                  <IndianRupee className="w-5 h-5 md:w-6 md:h-6" />
                  <p className="font-medium text-black text-sm md:text-base">Best Price Assured</p>
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="p-6 md:p-8 md:w-1/2">
              <h2 className="text-xl md:text-2xl font-semibold text-center text-[#003B8F]">
                Get Pricing Details Instantly
              </h2>
              <p className="text-center text-sm mt-2 text-gray-700">
                Fill the form below and unlock exclusive{" "}
                <span className="text-red-600 font-semibold">limited-time offers!</span>
              </p>

              <form method="post" name="contact-form" onSubmit={handleSubmit} className="space-y-4 mt-5">
                <Input name="Name" placeholder="Your Full Name *" required className="w-full" />
                <Input name="Phone" type="tel" placeholder="Phone Number *" required className="w-full" />
                <Input name="Email" type="email" placeholder="Email Address" className="w-full" />
                <Input name="Message" placeholder="Message (Optional)" className="w-full" />

                <div className="flex items-start space-x-2 text-sm text-gray-600">
                  <input type="checkbox" required className="mt-1 accent-[#E69119]" />
                  <label>
                    I agree to the use of my information as outlined in the privacy policy.
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#E69119] hover:bg-[#d67e11] text-white py-3 text-lg rounded-md"
                >
                  Submit Enquiry
                </Button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
