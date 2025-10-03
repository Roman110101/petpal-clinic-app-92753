import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";
import { ScrollToTop } from "@/components/ScrollToTop";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Branches from "./pages/Branches";
import Appointment from "./pages/Appointment";
import Team from "./pages/Team";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import Reviews from "./pages/Reviews";
import Certificates from "./pages/Certificates";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import { AuthGuard } from "@/components/AuthGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <div className="max-w-md md:max-w-none mx-auto bg-background min-h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/team" element={<Team />} />
            <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/chat" element={<Chat />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
