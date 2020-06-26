export default router => {
  // Check if user is logged or authenticate when need it
  router.beforeEach((to, from, next) => {
    const requireAuth = to.matched.some(record => record.meta.requireAuth);

    if (requireAuth) {
      if (!localStorage.getItem('isLoggedIn')) {
        return next({
         path: '/login'
        });
      }
    }

    return next();
  })
}
