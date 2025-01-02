export default defineNuxtRouteMiddleware((to, from) => {
  console.log(useCookie("token"));
  console.log("Salam");
});
