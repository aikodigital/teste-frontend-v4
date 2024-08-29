import Equipment from "pages/Equipment";
import Main from "pages/Main";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>
    },
    {
        path: "/equipment/:id",
        element: <Equipment/>
    }
])

export default router;