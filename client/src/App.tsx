import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { store } from "./model/store";
import { Provider } from "react-redux";

// import your route components too
import Main from "./views/pages/main/Main";
import Page404 from "./views/pages/404/Page404";
import Council from "./features/council/Council";
import SetCouncil from "./features/setCouncil/SetCouncil";
import Home from "./views/pages/home/Home";

import "./views/styles/app.scss";

function App() {
  return (
    <GoogleOAuthProvider clientId="572413208285-plfibouhajfkd16mk0gvvlsp2kaath04.apps.googleusercontent.com">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Page404 />} />
           
            <Route path="/" element={<Main />}>
              <Route index element={<Home />} />
              <Route path="set-council" element={<SetCouncil />} />
              <Route path="council/:councilId" element={<Council />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
