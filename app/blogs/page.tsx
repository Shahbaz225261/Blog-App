import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Session } from "inspector/promises";
import { json } from "stream/consumers";

export default async function BlogsPage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/signin");
  }
  return (
    <div>
      {JSON.stringify(session)}
      <h1>Blogs</h1>
      <p>Protected blog page content.</p>
    </div>
  );
}
