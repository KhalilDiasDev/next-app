import { Button, Card, Layout } from "antd";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <>
      <Head>
        <title>QAP Canvas not-found</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="d-flex flex-column align-items-center justify-content-center text-center mt-10">
        <div>
          <Image
            src={"/404-error.png"}
            width={400}
            height={400}
            alt="NOT_FOUND_IMAGE"
            className="img-fluid rounded-2"
          />
        </div>
        <h2>Page not found</h2>
        <Link href="/home">
          <Button className="mt-5 p-2" type="primary" size="large">
            Return to home
          </Button>
        </Link>

        <Image
          src={"/logo.png"}
          width={187}
          height={42}
          className="object-contain"
          alt="Corner Image"
          style={{
            position: "absolute",
            top: 30,
            right: 30,
          }}
        />
      </main>
    </>
  );
}
