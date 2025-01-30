import Echo from "laravel-echo";
import Pusher from "pusher-js";

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.dev) {
    const {
      REVERB_SCHEME,
      REVERB_APP_SECRET,
      REVERB_APP_KEY,
      REVERB_HOST,
      REVERB_PORT,
    } = useRuntimeConfig().public;

    window.Pusher = Pusher;

    window.Echo = new Echo({
      broadcaster: "reverb",
      key: REVERB_APP_KEY,
      wsHost: REVERB_HOST,
      wsPort: REVERB_PORT,
      wssPort: REVERB_PORT,
      forceTLS: (REVERB_SCHEME || "https") === "https",
      enabledTransports: ["ws", "wss"],
      cluster: "mt1",
      disableStats: true,
    });

    return {
      provide: {
        echo: window.Echo,
      },
    };
  }

  return {
    provide: {
      echo: null,
    },
  };
});
