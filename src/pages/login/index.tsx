import { getSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import React from "react";
import { GetServerSideProps } from "next";
import { Layout } from "antd";
import { SpinnerComponent } from "@/components/misc/spinner";

function LoginPage() {
  useEffect(() => {
    signIn("keycloak");
  }, []);

  return (
    <Layout className="h-screen w-screen flex items-center justify-center">
      <SpinnerComponent />
    </Layout>
  );
}

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
