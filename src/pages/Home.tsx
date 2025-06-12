
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Wrench, Car, Shield, Clock, Star, Phone } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Wrench className="h-8 w-8 text-automotive-orange" />,
      title: "Expert Repairs",
      description: "Professional automotive repair services with years of experience"
    },
    {
      icon: <Car className="h-8 w-8 text-automotive-orange" />,
      title: "Quality Parts",
      description: "Genuine and aftermarket spare parts for all vehicle makes"
    },
    {
      icon: <Shield className="h-8 w-8 text-automotive-orange" />,
      title: "Guaranteed Work",
      description: "All repairs come with our comprehensive warranty"
    },
    {
      icon: <Clock className="h-8 w-8 text-automotive-orange" />,
      title: "Fast Service",
      description: "Quick turnaround times without compromising quality"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "Excellent service! They fixed my car quickly and at a fair price.",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      text: "Professional team with great attention to detail. Highly recommended!",
      rating: 5
    },
    {
      name: "Emily Chen",
      text: "Been coming here for years. Always reliable and trustworthy.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80')`
          }}
        ></div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-automotive-darkBlue/70"></div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif">
            Fix it Auto & Spares
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Your trusted partner for professional automotive repair and genuine spare parts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services">
              <Button size="lg" className="bg-automotive-orange hover:bg-automotive-orange/90 text-white px-8 py-3 text-lg">
                Our Services
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-automotive-blue px-8 py-3 text-lg">
                Get Quote
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-automotive-blue mb-4 font-serif">
              Why Choose Fix it Auto & Spares?
            </h2>
            <p className="text-xl text-automotive-gray max-w-2xl mx-auto">
              We combine expertise, quality parts, and exceptional service to keep your vehicle running smoothly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-automotive-blue mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-automotive-gray">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-automotive-lightGray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-automotive-blue mb-4 font-serif">
              What Our Customers Say
            </h2>
            <p className="text-xl text-automotive-gray">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-automotive-gray mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <p className="font-semibold text-automotive-blue">
                    - {testimonial.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-automotive-blue text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4 font-serif">
            Ready to Get Your Car Fixed?
          </h2>
          <p className="text-xl mb-8">
            Contact us today for professional automotive repair and genuine spare parts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-automotive-orange hover:bg-automotive-orange/90 text-white px-8 py-3 text-lg">
                <Phone className="mr-2 h-5 w-5" />
                Contact Us Now
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-automotive-blue px-8 py-3 text-lg">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
