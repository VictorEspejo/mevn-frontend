const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "protected",
        meta: { auth: true },
        component: () => import("pages/ProtectedPage.vue"),
      },
      { path: "login", component: () => import("pages/LoginPage.vue") },
      { path: "signin", component: () => import("src/pages/SigninPage.vue") },
      { path: "link", meta: { auth: true }, component: () => import("src/pages/LinkPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
