
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  Car,
  MessageCircle
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // You would typically send this data to your backend or email service
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-automotive-orange" />,
      title: "Phone",
      info: "(555) 123-4567",
      description: "Call us for immediate assistance"
    },
    {
      icon: <Mail className="h-6 w-6 text-automotive-orange" />,
      title: "Email",
      info: "info@fixitautospares.com",
      description: "Send us your questions anytime"
    },
    {
      icon: <MapPin className="h-6 w-6 text-automotive-orange" />,
      title: "Address",
      info: "123 Main Street, Anytown, ST 12345",
      description: "Visit our modern service center"
    },
    {
      icon: <Clock className="h-6 w-6 text-automotive-orange" />,
      title: "Hours",
      info: "Mon-Fri: 8AM-6PM, Sat: 8AM-4PM",
      description: "Sunday: Emergency service only"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-automotive-blue to-automotive-darkBlue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6 font-serif animate-fade-in">
            Contact Us
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Get in touch with our automotive experts for quality service and genuine spare parts
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((item, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-automotive-blue mb-2">
                    {item.title}
                  </h3>
                  <p className="text-automotive-blue font-medium mb-2">
                    {item.info}
                  </p>
                  <p className="text-automotive-gray text-sm">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20 bg-automotive-lightGray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-automotive-blue mb-2 font-serif">
                  Get a Quote
                </h2>
                <p className="text-automotive-gray">
                  Fill out the form below and we'll get back to you with a personalized quote
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-automotive-blue mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-automotive-blue mb-2">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-automotive-blue mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-automotive-blue mb-2">
                    Service Needed
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-automotive-orange focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    <option value="general-repair">General Repair</option>
                    <option value="engine-service">Engine Service</option>
                    <option value="brake-service">Brake Service</option>
                    <option value="electrical-service">Electrical Service</option>
                    <option value="ac-heating">AC & Heating</option>
                    <option value="diagnostics">Diagnostics</option>
                    <option value="spare-parts">Spare Parts</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-automotive-blue mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                    placeholder="Describe your vehicle issue or service needs..."
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-automotive-orange hover:bg-automotive-orange/90 text-white py-3 text-lg"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Location & Additional Info */}
            <div className="space-y-8">
              <Card className="p-8">
                <h3 className="text-2xl font-bold text-automotive-blue mb-4 font-serif">
                  Visit Our Shop
                </h3>
                <div className="space-y-4 text-automotive-gray">
                  <p className="flex items-start">
                    <MapPin className="h-5 w-5 text-automotive-orange mr-2 flex-shrink-0 mt-1" />
                    123 Main Street, Anytown, ST 12345
                  </p>
                  <p>
                    Our modern service center is equipped with the latest diagnostic tools and 
                    staffed by experienced technicians ready to handle all your automotive needs.
                  </p>
                </div>

                <div className="mt-6 p-4 bg-automotive-lightGray rounded-lg">
                  <h4 className="font-semibold text-automotive-blue mb-2">Business Hours</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-automotive-gray">
                    <div>Monday - Friday:</div>
                    <div>8:00 AM - 6:00 PM</div>
                    <div>Saturday:</div>
                    <div>8:00 AM - 4:00 PM</div>
                    <div>Sunday:</div>
                    <div>Emergency Only</div>
                  </div>
                </div>
              </Card>

              <Card className="p-8">
                <h3 className="text-2xl font-bold text-automotive-blue mb-4 font-serif">
                  Emergency Service
                </h3>
                <div className="space-y-4 text-automotive-gray">
                  <p className="flex items-center">
                    <Phone className="h-5 w-5 text-automotive-orange mr-2" />
                    24/7 Emergency: (555) 123-4567
                  </p>
                  <p>
                    We offer emergency automotive services for breakdowns and urgent repairs. 
                    Call our emergency line anytime for immediate assistance.
                  </p>
                </div>

                <div className="mt-6 flex items-center space-x-4">
                  <Car className="h-8 w-8 text-automotive-orange" />
                  <div>
                    <div className="font-semibold text-automotive-blue">Mobile Service Available</div>
                    <div className="text-sm text-automotive-gray">We can come to you for certain repairs</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-automotive-blue mb-4 font-serif">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Do you provide warranties on your work?",
                answer: "Yes, we provide comprehensive warranties on all our repair work and parts. The warranty period varies depending on the type of service performed."
              },
              {
                question: "Can you work on all vehicle makes and models?",
                answer: "Absolutely! Our experienced technicians are trained to work on all major vehicle makes and models, from domestic to imported vehicles."
              },
              {
                question: "Do you offer payment plans?",
                answer: "We accept various payment methods including cash, credit cards, and can work with you on payment arrangements for larger repairs."
              },
              {
                question: "How long do repairs typically take?",
                answer: "Repair times vary depending on the complexity of the work needed. We'll provide you with an estimated timeline when we give you your quote."
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <CardContent className="pt-0">
                  <div className="flex items-start space-x-4">
                    <MessageCircle className="h-6 w-6 text-automotive-orange flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-automotive-blue mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-automotive-gray">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
