import { Button } from "antd";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <>
      <Head>
        <title>QAP Canvas - Página não encontrada</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 relative">
        <div className="mb-8">
          <Image
            src="/404-error.png"
            width={400}
            height={400}
            alt="Imagem de erro 404"
            className="rounded-2xl"
          />
        </div>

        <h2 className="text-2xl font-bold mb-4">Página não encontrada</h2>

        <Link href="/home">
          <button className="mt-4 px-6 py-2 flex-1 bg-blue-500 border-blue-500 text-white hover:bg-blue-600 hover:text-white rounded">
            Voltar para o início
          </button>
        </Link>

      </main>
    </>
  );
}
