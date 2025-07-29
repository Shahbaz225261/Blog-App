import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route"; 

export default async function BlogsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }
  return (
    <div>
      <div>
        <p>{JSON.stringify(session)}</p>
    </div>

      <h1>Blogs</h1>
      <p>Protected blog page content.</p>
    </div>
  );
}
