
import { Card, CardContent } from '@/components/ui/card';
import { Users, Award, Wrench, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Award className="h-12 w-12 text-automotive-orange" />,
      title: "Excellence",
      description: "We strive for perfection in every repair and service we provide"
    },
    {
      icon: <Heart className="h-12 w-12 text-automotive-orange" />,
      title: "Integrity",
      description: "Honest pricing and transparent communication with all our customers"
    },
    {
      icon: <Users className="h-12 w-12 text-automotive-orange" />,
      title: "Community",
      description: "Supporting our local community with reliable automotive services"
    },
    {
      icon: <Wrench className="h-12 w-12 text-automotive-orange" />,
      title: "Expertise",
      description: "Years of experience and continuous training in automotive technology"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-automotive-blue to-automotive-darkBlue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6 font-serif animate-fade-in">
            About Fix it Auto & Spares
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Your neighborhood automotive experts, dedicated to keeping your vehicle running safely and efficiently
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-automotive-blue mb-6 font-serif">
                Our Story
              </h2>
              <div className="space-y-4 text-automotive-gray text-lg">
                <p>
                  Founded in 2015, Fix it Auto & Spares began as a small family-owned garage with a simple mission: 
                  to provide honest, reliable automotive repair services to our local community.
                </p>
                <p>
                  What started as a one-man operation has grown into a trusted automotive service center, 
                  but we've never lost sight of our core values of integrity, quality, and personalized customer service.
                </p>
                <p>
                  Today, we proudly serve hundreds of satisfied customers, from routine maintenance to complex repairs, 
                  always treating every vehicle as if it were our own.
                </p>
              </div>
            </div>
            <div className="bg-automotive-lightGray p-8 rounded-lg">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-automotive-orange mb-2">8+</div>
                  <div className="text-automotive-gray">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-automotive-orange mb-2">500+</div>
                  <div className="text-automotive-gray">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-automotive-orange mb-2">1000+</div>
                  <div className="text-automotive-gray">Repairs Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-automotive-orange mb-2">24/7</div>
                  <div className="text-automotive-gray">Emergency Service</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-automotive-lightGray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-automotive-blue mb-4 font-serif">
              Our Values
            </h2>
            <p className="text-xl text-automotive-gray max-w-2xl mx-auto">
              These core principles guide everything we do at Fix it Auto & Spares
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-automotive-blue mb-4">
                    {value.title}
                  </h3>
                  <p className="text-automotive-gray">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-automotive-blue mb-4 font-serif">
              Meet Our Team
            </h2>
            <p className="text-xl text-automotive-gray">
              Experienced professionals dedicated to automotive excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-24 h-24 bg-automotive-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-automotive-blue mb-2">
                  John Martinez
                </h3>
                <p className="text-automotive-orange font-medium mb-2">Head Mechanic</p>
                <p className="text-automotive-gray">
                  15+ years of experience in automotive repair and diagnostics
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-24 h-24 bg-automotive-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-automotive-blue mb-2">
                  Sarah Thompson
                </h3>
                <p className="text-automotive-orange font-medium mb-2">Service Advisor</p>
                <p className="text-automotive-gray">
                  Expert in customer service and automotive parts consultation
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-24 h-24 bg-automotive-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-automotive-blue mb-2">
                  Mike Johnson
                </h3>
                <p className="text-automotive-orange font-medium mb-2">Parts Specialist</p>
                <p className="text-automotive-gray">
                  Specialist in sourcing genuine and aftermarket automotive parts
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
