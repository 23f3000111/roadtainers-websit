import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-5xl">404</h1>
      <p>This page isn't on our route.</p>
      <Link to="/" className="text-brand-yellow underline">Return home</Link>
    </div>
  );
}
