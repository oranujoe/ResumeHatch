
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
    name: "Starter plan",
    credits: 25,
    price: "₦3,500",
    description: "Perfect for job seekers applying to a few positions",
    features: ["1 Week plan", "Generate 5 tailored résumés", "Generate 3 cover letters", "Basic résumé templates", "Email support"],
    buttonText: "Continue",
    popular: false
  }, 
  {
    name: "Pro plan",
    credits: 100,
    price: "₦15,000",
    description: "Best value for serious job seekers in active search mode",
    features: ["1 month plan", "Generate 25 tailored résumés", "Generate 15 cover letters", "All premium templates", "Application tracking dashboard", "Priority email support", "Interview preparation tips"],
    buttonText: "Continue",
    popular: true
  }, 
  {
    name: "Pro Plus Plan",
    credits: "Flexible",
    price: "₦30,000",
    description: "Load any amount and pay only for what you use",
    features: ["1 month plan", "Flexible credit system", "No expiration on credits", "All premium features", "API access for teams", "Dedicated account manager", "Bulk processing available"],
    buttonText: "Continue",
    popular: false
  }
];
