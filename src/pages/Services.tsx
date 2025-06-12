
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Wrench, 
  Car, 
  Cog, 
  Battery, 
  Wind, 
  Fuel, 
  Gauge, 
  Shield,
  CheckCircle,
  Phone
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Wrench className="h-8 w-8 text-automotive-orange" />,
      title: "General Repairs",
      description: "Complete automotive repair services for all makes and models",
      features: ["Engine diagnostics", "Brake repair", "Suspension work", "Electrical systems"]
    },
    {
      icon: <Cog className="h-8 w-8 text-automotive-orange" />,
      title: "Engine Services",
      description: "Expert engine repair and maintenance services",
      features: ["Engine rebuilds", "Timing belt replacement", "Oil changes", "Tune-ups"]
    },
    {
      icon: <Battery className="h-8 w-8 text-automotive-orange" />,
      title: "Electrical Systems",
      description: "Professional electrical system diagnosis and repair",
      features: ["Battery replacement", "Alternator repair", "Starter motor", "Wiring issues"]
    },
    {
      icon: <Wind className="h-8 w-8 text-automotive-orange" />,
      title: "AC & Heating",
      description: "Climate control system repair and maintenance",
      features: ["AC repair", "Heating system", "Coolant service", "Thermostat replacement"]
    },
    {
      icon: <Fuel className="h-8 w-8 text-automotive-orange" />,
      title: "Fuel System",
      description: "Fuel system cleaning and repair services",
      features: ["Fuel pump replacement", "Injector cleaning", "Fuel filter", "System diagnostics"]
    },
    {
      icon: <Gauge className="h-8 w-8 text-automotive-orange" />,
      title: "Diagnostics",
      description: "Advanced computer diagnostics and troubleshooting",
      features: ["OBD scanning", "Performance testing", "Error code reading", "System analysis"]
    }
  ];

  const sparePartCategories = [
    "Engine Parts",
    "Brake Components",
    "Suspension Parts",
    "Electrical Components",
    "Filters & Fluids",
    "Body Parts",
    "Interior Accessories",
    "Performance Parts"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-automotive-blue to-automotive-darkBlue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6 font-serif animate-fade-in">
            Our Services
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Comprehensive automotive repair services and genuine spare parts for all your vehicle needs
          </p>
        </div>
      </section>

      {/* Repair Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-automotive-blue mb-4 font-serif">
              Repair Services
            </h2>
            <p className="text-xl text-automotive-gray max-w-2xl mx-auto">
              Professional automotive repair services with expert technicians and quality parts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-automotive-blue text-xl">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-automotive-gray mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-automotive-gray">
                        <CheckCircle className="h-4 w-4 text-automotive-orange mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Spare Parts Section */}
      <section className="py-20 bg-automotive-lightGray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-automotive-blue mb-4 font-serif">
              Spare Parts
            </h2>
            <p className="text-xl text-automotive-gray max-w-2xl mx-auto">
              Genuine and aftermarket spare parts for all vehicle makes and models
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h3 className="text-2xl font-bold text-automotive-blue mb-4">
                Quality Parts You Can Trust
              </h3>
              <div className="space-y-4 text-automotive-gray">
                <p>
                  We stock a comprehensive range of automotive spare parts from trusted manufacturers, 
                  ensuring your vehicle gets the quality components it deserves.
                </p>
                <p>
                  From routine maintenance parts to specialized components, we have everything 
                  you need to keep your vehicle running smoothly.
                </p>
              </div>
              <div className="mt-6 flex items-center space-x-4">
                <Shield className="h-8 w-8 text-automotive-orange" />
                <span className="text-automotive-blue font-semibold">All parts come with warranty</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {sparePartCategories.map((category, index) => (
                <div 
                  key={index} 
                  className="bg-white p-4 rounded-lg shadow text-center hover:shadow-md transition-shadow"
                >
                  <Car className="h-6 w-6 text-automotive-orange mx-auto mb-2" />
                  <span className="text-automotive-blue font-medium text-sm">{category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-automotive-blue mb-4 font-serif">
              Our Service Process
            </h2>
            <p className="text-xl text-automotive-gray">
              Simple, transparent, and reliable service from start to finish
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Diagnosis", description: "Thorough inspection and computer diagnostics" },
              { step: "2", title: "Quote", description: "Transparent pricing with detailed explanation" },
              { step: "3", title: "Repair", description: "Expert repair using quality parts and tools" },
              { step: "4", title: "Quality Check", description: "Final inspection and road test verification" }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-automotive-orange text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold text-automotive-blue mb-2">
                  {process.title}
                </h3>
                <p className="text-automotive-gray">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-automotive-blue text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4 font-serif">
            Need Service or Parts?
          </h2>
          <p className="text-xl mb-8">
            Contact us today for professional automotive service and genuine spare parts
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-automotive-orange hover:bg-automotive-orange/90 text-white px-8 py-3 text-lg">
              <Phone className="mr-2 h-5 w-5" />
              Get Your Quote Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
