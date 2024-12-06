import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="background">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-8">EpiSea</h1>
        <div className="flex space-x-4">
          <Link href="/quizz" legacyBehavior>
            <a className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Quizz</a>
          </Link>
          <Link href="/game" legacyBehavior>
            <a className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">Game</a>
          </Link>
          <Link href="/infos" legacyBehavior>
            <a className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Infos</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
