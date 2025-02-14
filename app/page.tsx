import LoginPage from "./login/page";
import { COOKIE_KEY } from "./store/useCookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_KEY.ACCESS_TOKEN)?.value;

  if (accessToken) {
    redirect("/home");
  }
  return <LoginPage />;
}
