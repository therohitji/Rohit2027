const Wt = [];

const Rt = () =>
  typeof window < "u" && /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname);

export const routeEnabled = (e) => !Wt.includes(e) || Rt();
