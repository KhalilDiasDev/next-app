// import { NextComponentType } from "next";z
import { SpinnerComponent } from "@/components/misc/spinner";
import { signIn, useSession } from "next-auth/react";
import { Layout } from "antd";
import { useEffect } from "react";
import SidebarComponent from "@/components/ui/sidebar";

function withAuth<T extends JSX.IntrinsicAttributes>(Component: any) {
  const Auth = (props: T) => {
    const { data: session } = useSession() as any;

    useEffect(() => {
      if (session === null || session?.error) {
        signIn("keycloak");
      }
    }, [session]);

    // If session was not set yet, return a loading screen
    if (session?.user === undefined) {
      return (
        <Layout className="h-screen w-screen flex items-center justify-center">
          <SpinnerComponent />
        </Layout>
      );
    }

    // If user is logged in, return original component
    return (
      <SidebarComponent>
        <Component {...props} />
      </SidebarComponent>
    );
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
}

export default withAuth;
