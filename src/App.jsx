import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Home from "./pages/Home";
import DashboardLayout from "./Layout/DashboardLayout";
import { configWeb3Modal } from "./connection";
import Dashboard from "./pages/Dashboard/Dashboard";
import SingleThrift from "./pages/Dashboard/SingleThrift";
import OnboardingData from "./pages/OnboardingData";
import SingleDetails from "./pages/SingleDetails";
import About from "./pages/About";
import GroupThrift from "./pages/Dashboard/GroupThrift";
import GroupDetails from "./pages/GroupDetails";
import Message from "./pages/Dashboard/Message";
import Setting from "./pages/Dashboard/Setting";

configWeb3Modal();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="signup" element={<OnboardingData />} />
      </Route>
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="singlethrift" element={<SingleThrift />} />
        <Route path="/dashboard/singlethrift/:singlethriftId" element={<SingleDetails />} />
        <Route path="groupthrift" element={<GroupThrift />} />
        <Route path="/dashboard/groupthrift/:groupthriftId" element={<GroupDetails />} />
        <Route path="message" element={<Message />} />
        <Route path="setting" element={<Setting />} />
      </Route>
    </Route>
  )
);

const App = () => {
  return (
    <div className="w-full bg-[#070624] min-h-[100vh]">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;