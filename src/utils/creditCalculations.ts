
export const calculatePrice = (credits: number) => {
  return (credits * 200).toLocaleString();
};

export const getDocumentCounts = (credits: number) => {
  return {
    resumes: Math.floor(credits * 0.2), // 20% of credits for resumes
    coverLetters: Math.floor(credits * 0.33), // 33% of credits for cover letters
    applications: credits // 100% of credits could be used for applications
  };
};

export const creditPackages = [
  {
    name: "Starter",
    credits: 25,
    price: "₦15,000",
    description: "Perfect for job seekers applying to a few positions",
    features: ["Generate 5 tailored résumés", "Generate 3 cover letters", "Basic résumé templates", "Email support"],
    buttonText: "Join the Waitlist",
    popular: false
  }, 
  {
    name: "Pro Value",
    credits: 100,
    price: "₦45,000",
    description: "Best value for serious job seekers in active search mode",
    features: ["Generate 25 tailored résumés", "Generate 15 cover letters", "All premium templates", "Application tracking dashboard", "Priority email support", "Interview preparation tips"],
    buttonText: "Join the Waitlist",
    popular: true
  }, 
  {
    name: "Custom",
    credits: "Flexible",
    price: "You decide",
    description: "Load any amount and pay only for what you use",
    features: ["Flexible credit system", "No expiration on credits", "All premium features", "API access for teams", "Dedicated account manager", "Bulk processing available"],
    buttonText: "Contact Sales",
    popular: false
  }
];
