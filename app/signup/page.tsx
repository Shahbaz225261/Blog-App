import { getServerSession } from "next-auth";
import Signup from "@/components/Signup";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/blogs");
  }
  return <Signup />;
}
