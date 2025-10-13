import { BrowserRouter, Routes, Route } from "react-router";
import { Providers } from "./providers";
import Layout from "layout/Layout";
import Home from "pages/Home/Home";
import Transaction from "pages/Transaction/Transaction";
import New from "pages/New/New";

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/transaction/:contractAddress/:id"
              element={<Transaction />}
            />
            <Route path="/new" element={<New />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
