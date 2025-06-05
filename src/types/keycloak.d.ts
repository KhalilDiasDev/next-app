declare module 'keycloak-js' {
    interface KeycloakConfig {
      url?: string;
      realm: string;
      clientId: string;
    }
  
    interface KeycloakInitOptions {
      onLoad?: string;
      silentCheckSsoRedirectUri?: string;
    }
  
    class Keycloak {
      constructor(config: KeycloakConfig);
      init(initOptions: KeycloakInitOptions): Promise<boolean>;
      register(): void;
      authenticated?: boolean;
    }
  
    export = Keycloak;
  }