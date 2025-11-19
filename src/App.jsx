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
import PostsContent from "./Pages/PostsContent.jsx";
import UsersContent from "./Pages/UsersContent.jsx";
import RecipesContent from "./Pages/RecipesContent.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<Home />}>
      <Route index element={<HomeContent />} />
      <Route path="posts" element={<PostsContent />} />
      <Route path="users" element={<UsersContent />} />
      <Route path="recipes" element={<RecipesContent />} />
    </Route>
  )
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
