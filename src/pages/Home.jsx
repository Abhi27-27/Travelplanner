import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center mt-20 text-center">
      <h1 className="text-5xl font-extrabold text-slate-800 mb-6 tracking-tight">
        Your Next Journey, <br className="hidden md:block"/> 
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
          Planned in Seconds.
        </span>
      </h1>
      
      <p className="text-lg text-slate-600 mb-10 max-w-2xl">
        Tell us where you want to go, what you love doing, and how much you want to spend. 
        Our AI will generate a hyper-personalized, day-by-day itinerary just for you.
      </p>

      <Link 
        to="/planner" 
        className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transition transform duration-200"
      >
        Start Planning Now
      </Link>
    </div>
  );
}