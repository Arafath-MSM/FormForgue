import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormProvider } from "./contexts/FormContext";
import AppLayout from "./components/Layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Forms from "./pages/Forms";
import FormBuilder from "./pages/FormBuilder";
import FormPreview from "./pages/FormPreview";
import Submissions from "./pages/Submissions";
import AllSubmissions from "./pages/AllSubmissions";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
      <FormProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="forms" element={<Forms />} />
                <Route path="builder" element={<FormBuilder />} />
                <Route path="preview/:formId" element={<FormPreview />} />
                <Route path="submissions" element={<AllSubmissions />} />
                <Route path="submissions/:formId" element={<Submissions />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </FormProvider>
  </QueryClientProvider>
);

export default App;
