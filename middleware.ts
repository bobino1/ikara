import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // všetko okrem api, studio (admin), _next, _vercel a súborov s príponou
  matcher: ["/((?!api|studio|_next|_vercel|.*\\..*).*)"],
};
