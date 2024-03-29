/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts
import Tables from "./layouts/tables";
import Billing from "./layouts/billing";
import VirtualReality from "./layouts/virtual-reality";
import RTL from "./layouts/rtl";
import Profile from "./layouts/profile";
import SignIn from "./layouts/authentication/sign-in";
import SignUp from "./layouts/authentication/sign-up";

// Soft UI Dashboard React icons
import Shop from "./examples/Icons/Shop";

import Check from "./examples/Icons/Check";
import Money from "./examples/Icons/Money";
import Settings from "./examples/Icons/Settings";
import CreditCard from "./examples/Icons/CreditCard";
import DashboardIcon from "./examples/Icons/Dashboard";

import Onboarding from "./component_sg/onboarding";
import IssueCards from "./component_sg/issueCards/components";
import RecievedRequest from "./layouts/recievedRequest";
import PaymentsTables from "./layouts/payments";
import CardPlus from "./examples/Icons/CardPlus";
import PurposeCategory from "./component_sh/components/PurposeCategory";
import Dashboard from "./component_jw/dashboard";
import { Navigate } from "react-router-dom";
import Member from "./examples/Icons/Member";
import Employees from "./layouts/employees";
import CustomerSupport from "./examples/Icons/CustomerSupport";

interface RouteProps {
  path: string;
  component: {};
  exact?: boolean;
}

// 일반사용자
// const userRoutes: Array<RouteProps> = [
// { path: "/", exact: true, component: <Navigate to="/" /> }];
{
  /* <Route exact path={route.route} element={route.component} key={route.key} /> */
}

// 관리자
const adminRoutes: Array<RouteProps> = [
  // { path: "/login", component: <Login /> },
  // { path: "/login/choose", component: <LoginChoose /> },
  // { path: "/login/verification", component: <LoginVerification /> },
];

const routes = [
  { type: "title", title: "관리자 메뉴", key: "manager-pages", isAdmin: true },
  {
    type: "collapse",
    name: "대시보드",
    key: "dashboard",
    route: "/dashboard",
    icon: <DashboardIcon size="14px" />,
    component: <Dashboard />,
    noCollapse: true,
    isAdmin: true,
  },
  // {
  //   type: "collapse",
  //   name: "멤버 관리",
  //   key: "member-Management",
  //   route: "/member-Management",
  //   icon: <Member size="14px" />,
  //   component: <Employees />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "부서 관리",
  //   key: "departments",
  //   route: "/departments",
  //   icon: <Office size="14px" />,
  //   component: <Tablesjy />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "용도 관리",
    key: "category-Management",
    route: "/category-Management",
    icon: <Settings size="14px" />,
    component: <PurposeCategory />,
    isAdmin: true,
  },

  {
    type: "collapse",
    name: "카드 신규 발급",
    key: "issue-cards",
    route: "/issue-cards",
    icon: <CardPlus size="14px" />,
    component: <IssueCards />,
    noCollapse: true,
    isAdmin: true,
  },
  { type: "title", title: "사용자 메뉴", key: "user-pages", isAdmin: false },
  {
    type: "collapse",
    name: "결제 내역",
    key: "payments",
    route: "/payments/*",
    icon: <Money size="15px" />,
    component: <PaymentsTables />,
    noCollapse: true,
    isAdmin: false,
  },
  {
    type: "collapse",
    name: "결재 요청 내역",
    key: "recieved-requests",
    route: "/recieved-requests/*",
    icon: <Check size="15px" />,
    component: <RecievedRequest />,
    noCollapse: true,
    isAdmin: false,
  },
  {
    type: "collapse",
    name: "카드사용 시작가이드",
    key: "onboarding",
    route: "/onboarding",
    icon: <CreditCard size="13px" />,
    component: <Onboarding />,
    noCollapse: true,
    isAdmin: false,
  },

  // { type: "title", title: "안 쓰는 페이지", key: "nono" },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   route: "/tables",
  //   icon: <Office size="12px" />,
  //   component: <Tables />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   route: "/billing",
  //   icon: <CreditCard size="12px" />,
  //   component: <Billing />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Virtual Reality",
  //   key: "virtual-reality",
  //   route: "/virtual-reality",
  //   icon: <Cube size="12px" />,
  //   component: <VirtualReality />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   route: "/rtl",
  //   icon: <Settings size="12px" />,
  //   component: <RTL />,
  //   noCollapse: true,
  // },

  // { type: "title", title: "계정 관리", key: "account-pages" },

  // {
  //   type: "collapse",
  //   name: "마이페이지",
  //   key: "profile",
  //   route: "/profile",
  //   icon: <CustomerSupport size="12px" />,
  //   component: <Profile />,
  //   noCollapse: true,
  // },

  // {
  //   type: "collapse",
  //   name: "회원가입",
  //   key: "sign-up",
  //   route: "/authentication/sign-up",
  //   icon: <SpaceShip size="12px" />,
  //   component: <SignUp />,
  //   noCollapse: true,
  // },
];

export default routes;
