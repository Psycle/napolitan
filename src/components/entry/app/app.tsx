import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "../../pages/home/homePage";
import { MainLayout } from "../../layouts/mainLayout/mainLayout";
import './appReset.scss';
import './app.scss';

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
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
