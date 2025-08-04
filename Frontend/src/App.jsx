import { PagesRoutes } from "./routes/Routes.jsx";
import { ToastContainer } from 'react-toastify'
const baseUrl = import.meta.env.VITE_API_BASE_URL
function App() {
 console.log(baseUrl)
  return (
    <>
      <PagesRoutes />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        draggable
        pauseOnHover={false}
        theme="light"
     />
    </>
  )
}

export default App
