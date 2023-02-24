import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={'bg-gray-600 text-white'}>
        <main className="container mx-auto w-2/3 mt-12 p-6 bg-gray-900 rounded-lg">
          <Main />
          <NextScript />
        </main>
      </body>
    </Html>
  );
}
