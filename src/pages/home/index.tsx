import { Header, Footer } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { Button } from '@/components/ui';

export default function HomePage() {
  return (
    <div className="min-h-screen w-full flex flex-col" >
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Welcome to React Demo</h1>
            <p className="text-xl text-muted-foreground">
              Built with Esmx, React, Tailwind CSS, and shadcn/ui
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Esmx Framework</CardTitle>
                <CardDescription>
                  Next-generation micro-frontend framework
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Zero runtime overhead with native ESM support
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>React 19</CardTitle>
                <CardDescription>
                  Latest React with automatic JSX runtime
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Modern React features with server-side rendering
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tailwind CSS</CardTitle>
                <CardDescription>
                  Utility-first CSS framework
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Rapid UI development with Tailwind utilities
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>shadcn/ui</CardTitle>
                <CardDescription>
                  Beautiful component library
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Copy-paste components built with Radix UI
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center gap-4">
            <Button>Get Started</Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

