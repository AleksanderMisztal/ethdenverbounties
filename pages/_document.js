import { Html, Head, Main, NextScript } from 'next/document';

import { FaTwitter, FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="w-fit mx-auto my-3">
      <a href="https://twitter.com/aleks_misztal" className="inline">
        <FaTwitter className="inline" /> aleks_misztal
      </a>
      <a
        href="https://github.com/AleksanderMisztal/ethdenverbounties"
        className="inline ml-6"
      >
        <FaGithub className="inline" /> Submit a pr
      </a>
    </footer>
  );
}

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Footer />
      <body className={'bg-gray-600 text-white'}>
        <main className="container mx-auto w-2/3 p-6 bg-gray-900 rounded-lg">
          <Main />
          <NextScript />
        </main>
      </body>
    </Html>
  );
}
