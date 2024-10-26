 
import Dashboard from "views/Dashboard.js";
import Monitor from "views/Monitor.js";
import Wallets from "views/Wallets.js";
import UserProfile from "views/UserProfile.js";
import Transaction from "views/Transaction.js";
var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/wallets",
    name: "Wallet Management",
    icon: "tim-icons icon-puzzle-10",
    component: <Wallets />,
    layout: "/admin",
  },
  {
    path: "/transactions",
    name: "Token Transactions",
    icon: "tim-icons icon-chart-bar-32",
    component: <Transaction />,
    layout: "/admin",
  },
  {
    path: "/monitor",
    name: "Monitor",
    icon: "tim-icons icon-bell-55",
    component: <Monitor />,
    layout: "/admin",
  },

];
export default routes;
