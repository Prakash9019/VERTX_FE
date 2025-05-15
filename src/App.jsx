import {Route, Routes, Navigate} from "react-router"
import { useEffect } from "react";
import Nopage from "./screens/404";
import Admin from "./screens/admin";
import Signup from "./screens/auth/hold/index.jsx";
import {Callback } from "./screens/auth/callback.jsx";

import Chat from "./screens/chat";
import Docflow from "./screens/docflow";
import GenerateEmail from "./screens/emails";
import Pipeline from "./screens/events"
import Explore from "./screens/explore";
import LandingAuth from "./screens/landing"
import Matchflow from "./screens/matchflow";
//asa
import Outreach2 from "./screens/outreach/index.jsx";
import Questions from "./screens/questions";
import PricingPage from "./screens/Subscription";
import Cashfree from "./screens/Cashfree/cashfree";
import Cashfree1 from "./screens/Cashfree/cashfree";
import EquityCalculator from "./screens/Resources/Equity_table/Equity_table";
import ValuationCalculator from "./screens/Resources/Startup-valuation/Startup-valuation";
import AandF from "./screens/Resources/AandF/AandF";
import DocandSa from "./screens/Resources/DOCandSA/DocandSa";
import Categories from "./screens/Resources/categories/categories";
import PrivacyPolicy from "./screens/More/PrivacyPolicy";
import TermsAndConditions from "./screens/More/TermsandConditions";
import Welcome_founder from "./screens/explore/welcome_founder.jsx";
import Put_a_face from "./screens/explore/Put_a_face.jsx";
import Skills from "./screens/explore/Skills.jsx";
import ShowYourProject from "./screens/explore/ShowYourProject.jsx";
import Bio from "./screens/explore/Bio.jsx";
import AddaProject from "./screens/explore/AddaProject.jsx";
import PreferenceSet from "./screens/explore/preference-page.jsx";
import { useCopyProtection } from "./context/CopyProtectionContext.jsx";
import { useCopyBlocker } from "./hooks/useCopyBlocker.js";
// import Verify from "./screens/auth/hold/verify.jsx";
// import SetNewPassword from "./screens/auth/Setpassword.jsx";

import BrokenFeature from "./screens/explore/Break.jsx";
import ProfileComplete from "./screens/explore/Complete.jsx";
import CommunityPage from "./screens/layout/Community.jsx";
import List from "./screens/explore/List.jsx";
import Inbox from "./screens/inbox/inbox.jsx";
import Listall from "./screens/explore/Listall.jsx";
import GeneralInbox from "./screens/inbox/GeneralInbox.jsx";
import SettingsV from "./screens/More/Settings.jsx";
function App() {
    // const { setIsProtected } = useCopyProtection();
  
    // useEffect(() => {
    //   setIsProtected(true); 
    // }, []);
  
    // useCopyBlocker(true); 

  return (
    <Routes>
      {/* Changed the root path to display Outreach2 directly */}
      <Route path="/" element={<Outreach2 />} />

      <Route path="/authentication" element={<LandingAuth />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/callback" element={<Callback />} /> 
       {/* <Route path="/callback2" element={<Callback2/> } /> */}
      {/* <Route path="/setpassword" element={<SetNewPassword />} /> */}
      <Route path="/info" element={<Questions />} />
      {/* <Route path="/verify" element={<Verify />} /> */}

      <Route path="/outreach" element={<Outreach2 />} />
      {/* <Route path="/outreach2" element={<Outreach2 />} /> */}
      <Route path="/sub" element={<PricingPage/> } />

      
      <Route path="/flow/outbound" element={<GenerateEmail />} />
      <Route path="/flow/chat" element={<Chat />} />
      <Route path="/flow/match flow" element={<Matchflow />} />
      <Route path="/flow/pipeline" element={<Pipeline />} />
      <Route path="/flow/docflow" element={<Docflow />} />
   
      <Route path='/payment' element={<Cashfree1 />} />
       
       <Route path="/resources" element={<Categories /> } />
      <Route path="/cal1" element={<EquityCalculator />} />
       <Route path="/cal2" element={<ValuationCalculator /> } />
       <Route path="/cal3" element={<AandF />} />
      <Route path="/cal4" element={<DocandSa /> } />

      <Route path="/admin" element={<Admin />} />

      <Route path="/privacy" element={<PrivacyPolicy /> } />
      <Route path="/terms" element={<TermsAndConditions /> } />
      <Route path="/settings" element={<SettingsV /> } />
      <Route path="/explore" element={<Welcome_founder /> } />
      <Route path="/explore/putaface" element={<Put_a_face /> } />
      <Route path="/explore/skills" element={<Skills /> } />
      <Route path="/explore/prefernce" element={<PreferenceSet /> } />
      <Route path="/explore/newproject" element={<AddaProject /> } />
      <Route path="/explore/project" element={<ShowYourProject /> } />     {/* not yet used */}

      <Route path="/explore/break" element={<BrokenFeature /> } />
      <Route path="/explore/complete" element={<ProfileComplete /> } />
      <Route path="/explore/bio" element={<Bio /> } />
      <Route path="/community" element={<CommunityPage /> } />
      
      <Route path="/inbox" element={<Inbox /> } />
      <Route path="/list" element={<List /> } />
      <Route path="/listall" element={<Listall /> } />
      <Route path="/general" element={<GeneralInbox /> } />
      <Route path="*" element={<Nopage />} />
    </Routes>
  );
}

export default App