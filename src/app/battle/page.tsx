import { Suspense } from 'react';
import BattleClient from './BattleClient';
import { Loader2 } from 'lucide-react';

export default function BattlePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center text-cyan-400 font-mono">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="ml-2">Loading Battle Arena...</span>
        </div>
      }
    >
      <BattleClient />
    </Suspense>
  );
}
