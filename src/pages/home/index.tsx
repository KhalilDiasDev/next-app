import React from "react";
import withAuth from "@/utils/authSession";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Layout } from "antd";
import { SpinnerComponent } from "@/components/misc/spinner";

function Home() {
  return (
    <Layout className="h-screen w-screen flex items-center justify-center">
      <SpinnerComponent />
    </Layout>
  );
}

export default withAuth(Home);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/workspaces",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};
