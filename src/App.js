import "./styles/App.css";

import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

//Components imports
import Home from "./pages/home";

import CollcOfThumbnail from "./pages/collcOfThumbnail";
import PlayVideo from "./pages/playVideo";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="thumbnails" element={<CollcOfThumbnail />} />
          <Route path=":_id" element={<PlayVideo />} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
