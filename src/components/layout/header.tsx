import { Button } from '@/components/ui';

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="text-xl font-bold">React Demo</div>
          <div className="flex gap-4">
            <Button variant="ghost" asChild>
              <a href="/">Home</a>
            </Button>
            <Button variant="ghost" asChild>
              <a href="/about">About</a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

