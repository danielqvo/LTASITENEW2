import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import RecaptchaProvider from "@/components/RecaptchaProvider";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import CourseDetail from "@/pages/CourseDetail";
import CourseSelection from "@/pages/CourseSelection";
import CategoryDetail from "@/pages/CategoryDetail";
import AboutUs from "@/pages/AboutUs";
import HowItWorks from "@/pages/HowItWorks";
import FAQ from "@/pages/FAQ";
import Pricing from "@/pages/Pricing";
import IndividualPricing from "@/pages/IndividualPricing";
import EmployerInstructorTraining from "@/pages/EmployerInstructorTraining";
import InstructorPricing from "@/pages/InstructorPricing";
import InstructorPricingChart from "@/pages/InstructorPricingChart";
import OnsiteGroupPricing from "@/pages/OnsiteGroupPricing";
import OnsiteGroupPricingChart from "@/pages/OnsiteGroupPricingChart";
import Contact from "@/pages/Contact";
import TestWebhook from "@/pages/TestWebhook";
import WebSocketDebug from "@/pages/WebSocketDebug";
import TermsOfService from "@/pages/TermsOfService";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Blog from "@/pages/Blog";
import ScoutingAmericaLifeguardPro from "@/pages/ScoutingAmericaLifeguardPro";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={AboutUs} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/courses" component={CourseSelection} />
      <Route path="/faq" component={FAQ} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/individual-pricing" component={IndividualPricing} />
      <Route path="/employer-instructor-pricing" component={EmployerInstructorTraining} />
      <Route path="/instructor-pricing" component={InstructorPricing} />
      <Route path="/instructor-pricing-chart" component={InstructorPricingChart} />
      <Route path="/onsite-group-pricing" component={OnsiteGroupPricing} />
      <Route path="/onsite-group-pricing-chart" component={OnsiteGroupPricingChart} />
      <Route path="/contact-register" component={Contact} />
      <Route path="/test-webhook" component={TestWebhook} />
      <Route path="/websocket-debug" component={WebSocketDebug} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/blog" component={Blog} />
      <Route path="/scoutingamericalifeguardpro" component={ScoutingAmericaLifeguardPro} />
      <Route path="/category/:category" component={CategoryDetail} />
      <Route path="/course/:category/:id" component={CourseDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecaptchaProvider>
        <Router />
        <Toaster />
      </RecaptchaProvider>
    </QueryClientProvider>
  );
}

export default App;
