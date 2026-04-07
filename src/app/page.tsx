import Tarifs from '@/components/sections/tarifs';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div>
      <main>
        <Suspense fallback={null}>
          <Tarifs />
        </Suspense>
      </main>
    </div>
  );
}
