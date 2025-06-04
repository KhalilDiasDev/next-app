import { UserProfile } from "@/components/user-profile";
import { LogoutButton } from "@/components/logout-button";

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-background">
        <div className="container flex items-center justify-between h-16 mx-auto px-4">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-lg">Keycloak Auth App</span>
          </div>
          <LogoutButton />
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-card rounded-lg shadow-sm border p-6">
                <h2 className="text-2xl font-semibold mb-4">Welcome to your secure dashboard</h2>
                <p className="text-muted-foreground mb-4">
                  This is a protected page that is only accessible to authenticated users.
                  Your session is secured with Keycloak and NextAuth.
                </p>
                <div className="bg-muted p-4 rounded-md">
                  <p className="text-sm font-medium">Accessing Protected Resources:</p>
                  <p className="text-sm text-muted-foreground">
                    Your access token can be used to make authenticated requests to your backend services.
                    This token is stored securely and handled properly through the NextAuth session.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <UserProfile />
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