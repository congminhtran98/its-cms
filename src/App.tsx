import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { Refine, Authenticated } from "@refinedev/core";
import routerBindings, {
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import {
  AuthPage,
  ErrorComponent,
  useNotificationProvider,
} from "@refinedev/antd";
import { resources } from "config/resources";

import { createAuthProvider } from "./providers/auth";
import { createDataProvider } from "./providers/data";

import { PostList } from "./pages/posts/list";
import { PostShow } from "./pages/posts/show";
import { PostEdit } from "./pages/posts/edit";
import { PostCreate } from "./pages/posts/create";

import { EventList } from "./pages/events/list";
import { EventShow } from "./pages/events/show";
import { EventEdit } from "./pages/events/edit";
import { EventCreate } from "./pages/events/create";

import { EventRegistrationList } from "./pages/event-registrations/list";
import { EventRegistrationShow } from "./pages/event-registrations/show";
import { EventRegistrationEdit } from "./pages/event-registrations/edit";
import { EventRegistrationCreate } from "./pages/event-registrations/create";

import { MembershipsList } from "./pages/memberships/list";
import { MembershipShow } from "./pages/memberships/show";
import { MembershipEdit } from "./pages/memberships/edit";
import { MembershipCreate } from "./pages/memberships/create";

import { UserList } from "./pages/users/list";
import { UserShow } from "./pages/users/show";
import { UserEdit } from "./pages/users/edit";

import { ProfileShow } from "./pages/profile/show";

import { AppLayout } from "component/layout/Applayout";

const API_URL = "/api";

const App = () => {
  const authProvider = createAuthProvider(API_URL);
  const dataProvider = createDataProvider(API_URL);

  return (
    <BrowserRouter>
      <Refine
        routerProvider={routerBindings}
        dataProvider={dataProvider}
        authProvider={authProvider}
        notificationProvider={useNotificationProvider}
        resources={resources}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
        }}
      >
        <Routes>
          <Route
            element={
              <Authenticated key="auth-pages" fallback={<Outlet />}>
                <NavigateToResource resource="posts" />
              </Authenticated>
            }
          >
            <Route path="/login" element={<AuthPage type="login" />} />
          </Route>

          <Route
            element={
              <Authenticated key="protected-routes">
                <AppLayout>
                  <Outlet />
                </AppLayout>
              </Authenticated>
            }
          >
            {/* Post Routes */}
            <Route path="/posts" element={<PostList />} />
            <Route path="/posts/:id" element={<PostShow />} />
            <Route path="/posts/:id/edit" element={<PostEdit />} />
            <Route path="/posts/create" element={<PostCreate />} />

            {/* Event Routes */}
            <Route path="/events" element={<EventList />} />
            <Route path="/events/:id" element={<EventShow />} />
            <Route path="/events/:id/edit" element={<EventEdit />} />
            <Route path="/events/create" element={<EventCreate />} />

            {/* Event Registration */}
            <Route
              path="/event-registrations"
              element={<EventRegistrationList />}
            />
            <Route
              path="/event-registrations/:id"
              element={<EventRegistrationShow />}
            />
            <Route
              path="/event-registrations/:id/edit"
              element={<EventRegistrationEdit />}
            />
            <Route
              path="/event-registrations/create"
              element={<EventRegistrationCreate />}
            />

            {/* Membership */}
            <Route path="/memberships" element={<MembershipsList />} />
            <Route path="/memberships/:id" element={<MembershipShow />} />
            <Route path="/memberships/:id/edit" element={<MembershipEdit />} />
            <Route path="/memberships/create" element={<MembershipCreate />} />

            {/* User */}
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserShow />} />
            <Route path="/users/:id/edit" element={<UserEdit />} />

            {/* Profile */}
            <Route path="/profile" element={<ProfileShow />} />

            {/* Default + Error */}
            <Route index element={<NavigateToResource resource="posts" />} />
            <Route path="*" element={<ErrorComponent />} />
          </Route>
        </Routes>
        <UnsavedChangesNotifier />
      </Refine>
    </BrowserRouter>
  );
};

export default App;
