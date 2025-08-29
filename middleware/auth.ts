export default defineNuxtRouteMiddleware(async (to) => {
  const user = await getCurrentUser()
  if (!user) {
    return navigateTo({ path: '/signin', query: { redirect: to.fullPath } })
  }
})