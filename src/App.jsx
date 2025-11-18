import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./Pages/Home.jsx";
import HomeContent from "./Pages/HomeContent.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<Home />}>
      <Route index element={<HomeContent />} />
    </Route>
  )
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
        <ReactQueryDevtools initialIsOpen={false} />
      </RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
