import HomeLayout from "@/layouts/landingPage";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

function Home(urlCredentials: string) {
  return <HomeLayout data={urlCredentials}/>;
}

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  
  if (session) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  const domain = process.env.QIAM_DOMAIN;
  const realm = process.env.NEXT_PRIVATE_QIAM_REALM;
  const clientId = process.env.NEXT_PRIVATE_QIAM_ID;
  const urlCredentials = {domain, realm, clientId};
  
  return {
    props: {
      urlCredentials
    }
  };

  // return {
  //   redirect: {
  //     destination: "/login",
  //     permanent: false,
  //   },
  // };
};
