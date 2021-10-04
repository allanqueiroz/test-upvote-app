import Pages from "./pages/Page";
import { TokenProvider } from "./contextAPI/tokenContext";
import { DataProvider } from "./contextAPI/dataContext";

function App() {
  return (
    <>
      <TokenProvider>
        <DataProvider>
          <Pages />
        </DataProvider>
      </TokenProvider>
    </>
  );
}

export default App;
