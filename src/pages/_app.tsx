import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConfigProvider, notification, theme } from "antd";
import { customDarkTheme, customTheme } from "@/assets/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect, useState } from "react";
import { ThemeContext } from "@/context/theme";
import { SessionProvider } from "next-auth/react";
import { NotificationContext } from "@/context/notification";
import Head from "next/head";
import { useRouter } from "next/router";
import AOS from "aos";
import "aos/dist/aos.css";
import { QoreThemeWrapper } from "@qriar-labs/qore";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
});

export default function App({ Component, pageProps }: AppProps) {
  const [api, contextHolder] = notification.useNotification();
  const [isThemeDark, setIsThemeDark] = useState(false);
  const { defaultAlgorithm, darkAlgorithm } = theme;

  const router = useRouter();

  const toggleTheme = () => {
    setIsThemeDark((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsThemeDark(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>QAP Canvas</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <ThemeContext.Provider value={{ isThemeDark, toggleTheme }}>
        <SessionProvider session={pageProps.session}>
          <ConfigProvider
            theme={{
              ...(!isThemeDark ? customTheme : customDarkTheme),
              algorithm: isThemeDark ? darkAlgorithm : defaultAlgorithm,
              components: {
                Carousel: {
                  arrowSize: 20,
                },
              },
            }}
          >
            <QoreThemeWrapper
              theme={{
                ...(!isThemeDark ? customTheme : customDarkTheme),
                algorithm: isThemeDark ? darkAlgorithm : defaultAlgorithm,
              }}
            >
              <QueryClientProvider client={queryClient}>
                <NotificationContext.Provider value={{ notification: api }}>
                  {contextHolder}

                  <Component {...pageProps} />
                </NotificationContext.Provider>
              </QueryClientProvider>
            </QoreThemeWrapper>
          </ConfigProvider>
        </SessionProvider>
      </ThemeContext.Provider>
    </>
  );
}
