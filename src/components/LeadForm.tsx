import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { X, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LeadFormProps {
  onClose: () => void;
}

const LeadForm = ({ onClose }: LeadFormProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    gender: '',
    dateOfBirth: '',
    smoking: '',
    bornState: '',
    address: '',
    ssn: '',
    beneficiaryName: '',
    coverage: '',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    height: '',
    weight: ''
  });

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming'
  ];

  const coverageOptions = [
    '$5,000', '$10,000', '$15,000', '$20,000', '$25,000', '$30,000', '$35,000',
    '$40,000', '$45,000', '$50,000'
  ];

  const handleInputChange = (field: string, value: string) => {
    console.log(`Field ${field} changed to:`, value);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateStep = (step: number) => {
    console.log(`Validating step ${step} with data:`, formData);
    switch (step) {
      case 1:
        const step1Valid = formData.fullName && formData.phoneNumber && formData.gender &&
          formData.dateOfBirth && formData.smoking && formData.bornState;
        console.log('Step 1 validation:', step1Valid);
        return step1Valid;
      case 2:
        const step2Valid = formData.address && formData.height && formData.weight && formData.ssn;
        console.log('Step 2 validation:', step2Valid);
        return step2Valid;
      case 3:
        const step3Valid = formData.coverage && formData.beneficiaryName;
        console.log('Step 3 validation:', step3Valid);
        return step3Valid;
      case 4:
        const step4Valid = formData.bankName && formData.accountNumber && formData.routingNumber;
        console.log('Step 3 validation:', step4Valid);
        return step4Valid;
      default:
        return false;
    }
  };

  const handleNext = () => {
    console.log(`Attempting to move from step ${currentStep} to step ${currentStep + 1}`);

    if (!validateStep(currentStep)) {
      toast({
        title: "Please fill in all required fields",
        description: "All fields marked with * are required to continue.",
        variant: "destructive"
      });
      return;
    }

    if (currentStep < 3) { // Changed from 4 to 3
      const nextStep = currentStep + 1;
      console.log(`Moving to step ${nextStep}`);
      setCurrentStep(nextStep);
    } else if (currentStep === 3) {
      // When on step 3 and clicking next, move to step 4
      setCurrentStep(4);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log('Form submission attempted at step:', currentStep);

  //   // Only submit if we're on step 4 and user clicked submit
  //   if (currentStep !== 4) {
  //     console.log('Not on step 4, preventing submission');
  //     return;
  //   }

  //   // Validate all required steps
  //   for (let step = 1; step < 5; step++) {
  //     if (!validateStep(step)) {
  //       toast({
  //         title: "Please complete all required fields",
  //         description: "Please go back and fill in all required information.",
  //         variant: "destructive"
  //       });
  //       return;
  //     }
  //   }

  //   console.log('Form submitted:', formData);
  //   toast({
  //     title: "Application Submitted!",
  //     description: "Thank you for your interest. A representative will contact you within 24 hours.",
  //   });
  //   onClose();
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep !== 4) return;

    for (let step = 1; step < 5; step++) {
      if (!validateStep(step)) {
        toast({
          title: "Please complete all required fields",
          description: "Please go back and fill in all required information.",
          variant: "destructive"
        });
        return;
      }
    }

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbw3d51ejnVuEJgQNpaCZZzbTbUO08WLnwnbBk8uwSqH79PwmQKOzoUZ6SP5ioCIbo5Evw/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        mode: "no-cors"
      });

      console.log('resposne', response)
      if (response.ok) {
        toast({
          title: "Application Submitted!",
          description: "Thank you for your interest. A representative will contact you within 24 hours.",
        });
        onClose();
      } else {
        toast({
          title: "Submission Failed",
          description: "There was a problem saving your application. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission Error",
        description: "Could not connect to server.",
        variant: "destructive"
      });
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Personal Information</h3>
        <p className="text-gray-600">Let's start with your basic details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number *</Label>
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="(555) 123-4567"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Gender *</Label>
          <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Do you smoke? *</Label>
          <RadioGroup value={formData.smoking} onValueChange={(value) => handleInputChange('smoking', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="smoke-yes" />
              <Label htmlFor="smoke-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="smoke-no" />
              <Label htmlFor="smoke-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>State of Birth *</Label>
          <Select value={formData.bornState} onValueChange={(value) => handleInputChange('bornState', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state} value={state.toLowerCase()}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Address & Health Information</h3>
        <p className="text-gray-600">We need some additional details</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="address">Current Address *</Label>
          <Textarea
            id="address"
            placeholder="Enter your complete address"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="height">Height *</Label>
            <Input
              id="height"
              type="text"
              placeholder="e.g., 5'8 or 68 inches"
              value={formData.height}
              onChange={(e) => handleInputChange('height', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Weight (lbs) *</Label>
            <Input
              id="weight"
              type="number"
              placeholder="Enter weight in pounds"
              value={formData.weight}
              onChange={(e) => handleInputChange('weight', e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ssn">Social Security Number *</Label>
          <Input
            id="ssn"
            type="text"
            placeholder="XXX-XX-XXXX"
            value={formData.ssn}
            onChange={(e) => handleInputChange('ssn', e.target.value)}
            required
          />
          <p className="text-sm text-gray-500">Your SSN is encrypted and secure</p>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Coverage & Beneficiary</h3>
        <p className="text-gray-600">Choose your coverage amount and beneficiary</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Desired Coverage Amount *</Label>
          <Select value={formData.coverage} onValueChange={(value) => handleInputChange('coverage', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select coverage amount" />
            </SelectTrigger>
            <SelectContent>
              {coverageOptions.map((amount) => (
                <SelectItem key={amount} value={amount}>
                  {amount}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="beneficiaryName">Primary Beneficiary Name *</Label>
          <Input
            id="beneficiaryName"
            type="text"
            placeholder="Enter beneficiary's full name"
            value={formData.beneficiaryName}
            onChange={(e) => handleInputChange('beneficiaryName', e.target.value)}
            required
          />
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            <Shield className="h-4 w-4 inline mr-2" />
            Next step: Banking information for premium payments (optional)
          </p>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Banking Information</h3>
        <p className="text-gray-600">For premium payments (optional)</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="bankName">Bank Name</Label>
          <Input
            id="bankName"
            type="text"
            placeholder="Enter your bank name"
            value={formData.bankName}
            onChange={(e) => handleInputChange('bankName', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              type="text"
              placeholder="Enter account number"
              value={formData.accountNumber}
              onChange={(e) => handleInputChange('accountNumber', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="routingNumber">Routing Number</Label>
            <Input
              id="routingNumber"
              type="text"
              placeholder="Enter routing number"
              value={formData.routingNumber}
              onChange={(e) => handleInputChange('routingNumber', e.target.value)}
            />
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            <Shield className="h-4 w-4 inline mr-2" />
            Your banking information is encrypted and secure. This is only used for automatic premium payments if you choose to enroll.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
          <CardTitle className="text-center">Get Your Free Quote</CardTitle>
          <CardDescription className="text-center">
            Step {currentStep} of 4 - Complete your application
          </CardDescription>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}

            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Previous
              </Button>

              {currentStep != 4 ? (
                <Button type="button" onClick={handleNext}>
                  Next Step
                </Button>
              ) : (
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Submit Application
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadForm;
