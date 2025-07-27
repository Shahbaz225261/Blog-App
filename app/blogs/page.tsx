import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Session } from "inspector/promises";

export default async function BlogsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }
  return (
    <div>
      <h1>Blogs</h1>
      <p>Protected blog page content.</p>
    </div>
  );
}
