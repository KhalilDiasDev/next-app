import { Button } from "antd";
import Title from "../components/title";
import Text from "../components/text";
import { useEffect, useState } from "react";
import Keycloak from "keycloak-js";

interface HomeIntroductionLayoutProps {
  redirectToLogin?: () => void;
  data?: any;
}

export default function HomeIntroductionLayout({
  redirectToLogin,
  data 
}: HomeIntroductionLayoutProps) {
  const [keycloak, setKeycloak] = useState<any>(null);
  

  useEffect(() => {
    const kc = new Keycloak({
      url: `https://${data.domain}`,
      realm: data.realm,
      clientId: data.clientId,
    });

    kc.init({ onLoad: "check-sso", silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html" })
      .then(() => {
        setKeycloak(kc);
      })
  }, []);

  const handleSignUp = () => {
      keycloak.register();
    } 
    
  return (
    <>
      <div className="bg-gradient-to-br from-black via-gray-900 to-black relative cyber-intro overflow-hidden">
        {/* Cyber grid background */}
        <div className="absolute inset-0 opacity-10">
          <div className="cyber-grid animate-pulse"></div>
        </div>
        
        {/* Floating security icons */}
        <div className="absolute h-full w-full top-0 left-0">
          <div className="security-particles animate-float-slow">
            <div className="particle shield-icon"></div>
            <div className="particle lock-icon"></div>
            <div className="particle key-icon"></div>
          </div>
        </div>

        {/* Animated threat detection lines */}
        <div className="absolute h-full w-full cyber-lines animate-scan top-0 left-0 opacity-30" />
        <div className="absolute h-full w-full cyber-lines-2 animate-scan-reverse top-0 left-0 opacity-20" />
        
        {/* Matrix rain effect */}
        <div className="absolute h-full w-full top-0 left-0 opacity-5 animate-matrix-rain">
          <div className="matrix-code"></div>
        </div>

        <div className="min-h-screen relative z-10">
          <div
            className="px-4 md:px-12 lg:px-24 xl:px-40 pt-10 flex items-center justify-end md:justify-between gap-2 relative"
            data-aos="fade-down"
          >
            <div className="w-16 h-16 relative hidden md:block">
              <div className="w-full h-full bg-gradient-to-br from-white to-gray-300 rounded-lg flex items-center justify-center shadow-lg shadow-white/25">
                <span className="text-black font-bold text-xl">Q</span>
              </div>
            </div>
          
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white to-transparent hidden md:flex opacity-30" />
            
            <Button 
              type="primary"
              onClick={redirectToLogin}
              className="bg-white text-black border-none hover:bg-gray-200 shadow-lg shadow-white/25"
            >
              Secure Access
            </Button>
            <Button 
              type="default" 
              onClick={handleSignUp}
              className="border-white text-white hover:bg-white/10 hover:border-gray-300"
            >
              Start Protection
            </Button>
          </div>
          
          <div className="relative text-center py-10 px-4 md:px-12 lg:px-24 xl:px-40 text-white">
            <Title className="mb-8 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent" bold data-aos="fade-down">
              Advanced Cybersecurity Solutions for <br /> 
              Enterprise Security Teams, IT Directors, <br /> 
              and Security Architects
            </Title>
            
            <div
              className="relative h-24 w-full -mb-6 z-[100] flex items-center justify-center"
              data-aos="zoom-out"
              data-aos-delay="700"
            >
              <div className="text-6xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent tracking-wider">
                QIAM
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-white/20 to-gray-300/20 blur-xl rounded-full"></div>
            </div>
            
            <div
              className="h-96 w-full relative flex justify-center mb-16 rounded-xl overflow-hidden"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              {/* Cyber dashboard mockup */}
              <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-xl border border-white/30 shadow-2xl shadow-white/20 mt-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-gray-300/5"></div>
                
                {/* Dashboard header */}
                <div className="h-12 bg-gradient-to-r from-gray-900/50 to-black/50 flex items-center px-4 border-b border-white/30">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <div className="w-3 h-3 bg-gray-600 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  </div>
                  <span className="ml-4 text-sm text-gray-300">QIAM Security Dashboard</span>
                </div>
                
                {/* Dashboard content */}
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/10 border border-white/30 rounded-lg p-3 text-center">
                      <div className="text-gray-400 text-xs">THREATS BLOCKED</div>
                      <div className="text-white font-bold text-lg animate-count-up">1,247</div>
                    </div>
                    <div className="bg-gray-500/10 border border-gray-500/30 rounded-lg p-3 text-center">
                      <div className="text-gray-400 text-xs">ACTIVE MONITORING</div>
                      <div className="text-white font-bold text-lg">24/7</div>
                    </div>
                    <div className="bg-gray-300/10 border border-gray-300/30 rounded-lg p-3 text-center">
                      <div className="text-gray-400 text-xs">SYSTEM STATUS</div>
                      <div className="text-white font-bold text-lg">SECURE</div>
                    </div>
                  </div>
                  
                  {/* Animated threat visualization */}
                  <div className="bg-black/50 rounded-lg p-4 border border-white/20">
                    <div className="text-xs text-gray-400 mb-2">REAL-TIME THREAT DETECTION</div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                        <div className="text-xs text-gray-300">Malware blocked: 192.168.1.45</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                        <div className="text-xs text-gray-300">Suspicious activity detected</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-600 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
                        <div className="text-xs text-gray-300">Firewall updated successfully</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%]"
                data-aos="zoom-out"
                data-aos-delay="700"
              >
                <Button 
                  type="primary" 
                  className="mt-20 bg-white text-black border-none hover:bg-gray-200 shadow-lg shadow-white/25 px-8 py-6 h-auto text-lg" 
                  onClick={handleSignUp}
                >
                  Secure Your Enterprise Now!
                </Button>
              </div>
            </div>

            <Title data-aos="fade-up" className="text-gray-300">
              QIAM introduces advanced Identity and Access Management 
              for comprehensive cybersecurity protection
            </Title>
          </div>
        </div>
      </div>
      
      <div className="relative cyber-hero bg-gradient-to-br from-gray-900 to-black">
        {/* Security pattern overlay */}
        <div
          className="security-pattern absolute h-full w-[120%] animate-slide opacity-20"
          data-aos="fade-left"
        />
        
        <div className="text-center md:text-left grid md:grid-cols-2 justify-between gap-8 lg:gap-16 py-14 items-center px-4 md:px-12 lg:px-24 xl:px-40 relative z-10">
          <Title data-aos="fade-up" className="text-white">
            Introducing QIAM: Next-Generation Identity and Access Management 
            with military-grade security architecture.
          </Title>
          <Text size="small" data-aos="fade-up" className="text-gray-300">
            Protect your digital assets with advanced threat detection, 
            zero-trust architecture, and AI-powered security monitoring. 
            Our comprehensive cybersecurity platform provides real-time protection, 
            incident response, and compliance management. Secure your organization's 
            future with enterprise-grade cybersecurity solutions designed for 
            today's evolving threat landscape.
          </Text>
        </div>
      </div>

      <style jsx>{`
        .cyber-grid {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          height: 100%;
          width: 100%;
        }

        .cyber-lines {
          background: linear-gradient(
            45deg,
            transparent 40%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 60%
          );
          background-size: 20px 20px;
        }

        .cyber-lines-2 {
          background: linear-gradient(
            -45deg,
            transparent 40%,
            rgba(255, 255, 255, 0.05) 50%,
            transparent 60%
          );
          background-size: 30px 30px;
        }

        .security-pattern {
          background: radial-gradient(
            circle at 50% 50%,
            rgba(255, 255, 255, 0.1) 0%,
            transparent 50%
          );
        }

        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes scan-reverse {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes count-up {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-scan {
          animation: scan 8s linear infinite;
        }

        .animate-scan-reverse {
          animation: scan-reverse 12s linear infinite;
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-count-up {
          animation: count-up 2s ease-out;
        }
      `}</style>
    </>
  );
}