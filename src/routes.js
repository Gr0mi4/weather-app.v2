import Authentication from "./components/Authentication";
import Home from "./components/Home";

export const routes = [
  {path: '/auth', component: Authentication},
  {path: '', component: Home}
]