import { AuthProvider } from "./context/authContext";
import { AuthContext } from "./routes";

function App() {
  return (
    <AuthProvider>
      <AuthContext />
    </AuthProvider>
  );
}

export default App;
