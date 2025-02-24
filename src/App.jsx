import {Route, Routes} from "react-router"
import Nopage from "./screens/404";
import Admin from "./screens/admin";
import Signup from "./screens/auth";
import Callback from "./screens/auth/callback";
import Signin from "./screens/auth/signin";
import Chat from "./screens/chat";
import Docflow from "./screens/docflow";
import GenerateEmail from "./screens/emails";
import Pipeline from "./screens/events";
import Explore from "./screens/explore";
import LandingAuth from "./screens/landing"
import Matchflow from "./screens/matchflow";
import Outreach from "./screens/outreach";
import Questions from "./screens/questions";
import PricingPage from "./screens/Subscription";
import Cashfree from "./screens/Cashfree/cashfree";
import Cashfree1 from "./screens/Cashfree/cashfree";
import EquityCalculator from "./screens/Resources/Equity_table/Equity_table";
import ValuationCalculator from "./screens/Resources/Startup-valuation/Startup-valuation";
import AandF from "./screens/Resources/AandF/AandF";
import DocandSa from "./screens/Resources/DOCandSA/DocandSa";
import Categories from "./screens/Resources/categories/categories";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Callback />} />

      <Route path="/authentication" element={<LandingAuth />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="/info" element={<Questions />} />

      <Route path="/outreach" element={<Outreach />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/sub" element={<PricingPage/> } />
      <Route path="/flow/outbound" element={<GenerateEmail />} />
      <Route path="/flow/chat" element={<Chat />} />
      <Route path="/flow/match flow" element={<Matchflow />} />
      <Route path="/flow/pipeline" element={<Pipeline />} />
      <Route path="/flow/docflow" element={<Docflow />} />
   
      <Route path='/payment' element={<Cashfree1 />} />
       
       <Route path="/category" element={<Categories /> } />
      <Route path="/cal1" element={<EquityCalculator />} />
       <Route path="/cal2" element={<ValuationCalculator /> } />
       <Route path="/cal3" element={<AandF />} />
      <Route path="/cal4" element={<DocandSa /> } />

      <Route path="/admin" element={<Admin />} />

      <Route path="*" element={<Nopage />} />
    </Routes>
  );
}

export default App
