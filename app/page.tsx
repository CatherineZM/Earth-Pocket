import Waves from '@/components/wave'

export default function Home() {
  return (
    <div className="relative min-h-screen text-black">
      <Waves />
      <div className="relative z-10 flex items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Your Main Content</h1>
      </div>
    </div>
  );
}
