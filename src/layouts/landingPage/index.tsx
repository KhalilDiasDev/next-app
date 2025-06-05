import { useRouter } from "next/router";
import HomeIntroductionLayout from "./elements/introduction";


export default function HomeLayout({data}:any) {
  const router = useRouter();
  const redirectToLogin = () => router.push("/login");
  

  return (
    <div>
      <HomeIntroductionLayout redirectToLogin={redirectToLogin} data={data.urlCredentials}/>
    </div>
  );
}
