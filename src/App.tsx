import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Index from "./pages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index/>} />
        </Routes>
      </BrowserRouter>
  </QueryClientProvider>
);

export default App;
