import { PagesRoutes } from "./routes/Routes.jsx";
import { ToastContainer } from 'react-toastify'
function App() {
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
