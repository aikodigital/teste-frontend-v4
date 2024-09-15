import { Button } from "./components/ui/button";
import { MapComponent } from "./components/utils/MapComponent";

export default function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
      <Button>Click me</Button>
      <MapComponent/>
    </h1>
  );
}
