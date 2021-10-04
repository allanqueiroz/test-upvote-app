import Pages from "./pages/Page";
import { TokenProvider } from "./contextAPI/tokenContext";

function App() {
  return (
    <>
      <TokenProvider>
        <Pages />
      </TokenProvider>
    </>
  );
}

export default App;
