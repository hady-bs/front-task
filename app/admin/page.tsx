// app/admin/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    redirect("/login");
  }

  return <h1>لوحة الإدارة</h1>;
}
