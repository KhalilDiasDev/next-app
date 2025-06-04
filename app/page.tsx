import { LoginButton } from '@/components/login-button';
import { KeycloakLogo } from '@/components/keycloak-logo';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-background">
        <div className="container flex items-center justify-between h-16 mx-auto px-4">
          <div className="flex items-center space-x-2">
            <KeycloakLogo className="h-8 w-8" />
            <span className="font-semibold text-lg">QIAM Auth App</span>
          </div>
          <LoginButton />
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-6">Welcome to the QIAM Auth Demo</h1>
          <p className="text-xl text-muted-foreground mb-8">
            A secure authentication solution using Next.js and Keycloak integration
          </p>
          <div className="space-y-4">
            <div className="p-6 bg-card rounded-lg shadow-sm border">
              <h2 className="text-2xl font-semibold mb-4">Secure Authentication</h2>
              <p className="text-muted-foreground">
                This application demonstrates secure authentication with Keycloak. 
                Use the login button in the header to access protected content.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Keycloak Auth Demo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}