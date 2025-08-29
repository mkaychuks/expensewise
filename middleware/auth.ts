export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await getCurrentUser();
  if (!user && to.path.startsWith("/dashboard")) {
    return navigateTo({ path: "/signin" });
  }
});
