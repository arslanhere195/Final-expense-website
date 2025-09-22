
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Shield, Heart, Clock, Users } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const benefits = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Financial Protection",
      description: "Secure your family's future with comprehensive coverage options"
    },
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Peace of Mind",
      description: "Rest easy knowing your loved ones are protected financially"
    },
    {
      icon: <Clock className="h-8 w-8 text-green-600" />,
      title: "Quick Process",
      description: "Get approved in minutes with our streamlined application"
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Family Coverage",
      description: "Protect multiple family members under one policy"
    }
  ];

  const features = [
    "No medical exam required",
    "Coverage up to $50,000",
    "Affordable monthly premiums",
    "Immediate coverage available",
    "24/7 customer support",
    "Easy online application"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Fenural</span>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Licensed & Trusted
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Protect Your Family's
              <span className="text-blue-600 block">Financial Future</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Get instant coverage with Fenural's final expense insurance. 
              No medical exam required, affordable premiums, and guaranteed acceptance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4"
                onClick={() => setShowForm(true)}
              >
                Get Free Quote Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-4"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50k+</div>
              <div className="text-gray-600">Families Protected</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">$50K</div>
              <div className="text-gray-600">Maximum Coverage</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Fenural?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make final expense insurance simple, affordable, and accessible for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features List */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8">What's Included</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Protect Your Family?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get your free quote in just 2 minutes. No obligations, no hidden fees.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4"
            onClick={() => setShowForm(true)}
          >
            Start Your Application
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6" />
                <span className="text-xl font-bold">Fenural</span>
              </div>
              <p className="text-gray-400 mb-4">
                Providing affordable final expense insurance to protect families across America.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Coverage Options</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>1-800-FENURAL</li>
                <li>support@fenural.com</li>
                <li>Available 24/7</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Fenural. All rights reserved. Licensed in all 50 states.</p>
          </div>
        </div>
      </footer>

      {/* Lead Form Modal */}
      {showForm && (
        <LeadForm onClose={() => setShowForm(false)} />
      )}
    </div>
  );
};

export default Index;
