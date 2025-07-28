import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route"; // Adjust path accordingly

export default async function BlogsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }
  
  return (
    <div>
      <div>
        <p>ID: {session.user.id}</p>
        <p>Name: {session.user.username}</p>
    </div>

      <h1>Blogs</h1>
      <p>Protected blog page content.</p>
    </div>
  );
}
