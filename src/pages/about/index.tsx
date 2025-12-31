import { Header, Footer } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About This Project</CardTitle>
              <CardDescription>
                A modern React application built with Esmx
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                This is a demonstration project showcasing how to build a React
                application with Esmx framework, featuring:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Server-Side Rendering (SSR)</li>
                <li>Tailwind CSS for styling</li>
                <li>shadcn/ui components</li>
                <li>TypeScript for type safety</li>
                <li>Modern folder structure</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}



