import { RootProvider } from "./RootContext";
import { ComponentRoutes } from "./router/ComponentRoutes";

function App() {
  return (
    <RootProvider>
      <ComponentRoutes />
    </RootProvider>
  );
}

export default App;
