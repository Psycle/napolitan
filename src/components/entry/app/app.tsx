import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "../../pages/home/homePage";
import { MainLayout } from "../../layouts/mainLayout/mainLayout";
import './appReset.scss';
import './app.scss';

const basename = (() => {
  if (window.location.href.includes('localhost')) return undefined;
  let out = window.location.pathname;
  if (out.endsWith('/')) out = out.slice(0, -1);
  return out;
})();

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  )
}

export function App() {
  return (
    <BrowserRouter basename={basename}>
      <AppRoutes />
    </BrowserRouter>
  )
}
