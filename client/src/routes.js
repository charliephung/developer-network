import React from "react";
import HomePage from "./pages/HomePage";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import DashBoard from "./pages/DashBoard";
import CreateProfilePage from "./pages/CreateProfilePage";
import AddEducationPage from "./pages/AddEducationPage";
import AddExperiencePage from "./pages/AddExperiencePage";
import ProfilesPage from "./pages/ProfilesPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import ForumPage from "./pages/ForumPage";
import PostPage from "./pages/PostPage";
import VerifyPage from "./pages/VerifyPage";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <HomePage />
  },
  {
    path: "/register",
    exact: true,
    main: () => <Register />
  },
  {
    path: "/login",
    exact: true,
    main: () => <Login />
  },
  {
    path: "/forum",
    exact: true,
    main: () => <ForumPage />
  },
  {
    path: "/forum/:post_id",
    exact: true,
    main: ({ match, history }) => <PostPage match={match} history={history} />
  },
  {
    path: "/dashboard",
    exact: true,
    private: true,
    main: (history, match) => <DashBoard history={history} match={match} />
  },
  {
    path: "/profile/:handle",
    exact: true,
    main: ({ match, history }) => (
      <ProfilePage match={match} history={history} />
    )
  },
  {
    path: "/create-profile",
    exact: true,
    private: true,
    main: () => <CreateProfilePage />
  },
  {
    path: "/add-education",
    exact: true,
    private: true,
    main: () => <AddEducationPage />
  },
  {
    path: "/add-experience",
    exact: true,
    private: true,
    main: () => <AddExperiencePage />
  },
  {
    path: "/profiles",
    exact: true,
    main: () => <ProfilesPage />
  },
  {
    path: "/verify",
    exact: true,
    main: () => <VerifyPage />
  },
  {
    path: "*",
    exact: true,
    main: () => <NotFoundPage />
  }
];
export default routes;
