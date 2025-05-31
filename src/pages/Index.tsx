
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Header from "@/components/Header";
import FactCard from "@/components/FactCard";
import AuthModal from "@/components/AuthModal";
import PostFactModal from "@/components/PostFactModal";
import ContactModal from "@/components/ContactModal";
import { Plus } from "lucide-react";

interface Fact {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  author: string;
}

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [facts, setFacts] = useState<Fact[]>([]);
  const [currentFact, setCurrentFact] = useState<Fact | null>(null);
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' as 'login' | 'signup' });
  const [postFactModal, setPostFactModal] = useState(false);
  const [contactModal, setContactModal] = useState({ isOpen: false, authorName: "", factId: "" });

  // Sample facts data
  const sampleFacts: Fact[] = [
    {
      id: "1",
      title: "Octopuses Have Three Hearts",
      shortDescription: "These intelligent sea creatures have three hearts that pump blue blood.",
      fullDescription: "Octopuses have three hearts that work together to pump their blue, copper-based blood throughout their bodies. Two hearts pump blood to the gills, while the third pumps blood to the rest of the body. Interestingly, the main heart stops beating when they swim, which is why they prefer crawling to avoid exhaustion.",
      author: "MarineBiologist"
    },
    {
      id: "2",
      title: "Honey Never Spoils",
      shortDescription: "Archaeologists have found edible honey in ancient Egyptian tombs.",
      fullDescription: "Honey is one of the few foods that never spoils due to its unique chemical composition. Its low water content and acidic pH create an environment where bacteria cannot survive. Archaeologists have discovered pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible. The natural enzymes in honey also produce hydrogen peroxide, adding to its preservative properties.",
      author: "HistoryExplorer"
    },
    {
      id: "3",
      title: "Bananas Are Berries",
      shortDescription: "Botanically speaking, bananas are berries but strawberries aren't.",
      fullDescription: "In botanical terms, a berry is a fruit produced from a single flower with one ovary that has seeds enclosed in the flesh. Bananas fit this definition perfectly, making them true berries. Strawberries, on the other hand, are not berries because their seeds are on the outside. Other surprising berries include grapes, kiwis, and even eggplants! This classification shows how scientific definitions can differ from everyday language.",
      author: "PlantScientist"
    }
  ];

  useEffect(() => {
    setFacts(sampleFacts);
    // Set first fact as current on load
    if (sampleFacts.length > 0) {
      setCurrentFact(sampleFacts[0]);
    }
  }, []);

  const getRandomFact = () => {
    if (facts.length > 0) {
      const randomIndex = Math.floor(Math.random() * facts.length);
      setCurrentFact(facts[randomIndex]);
    }
  };

  const handleAuth = (email: string, password: string, username?: string) => {
    // Simulate authentication
    setIsLoggedIn(true);
    setUsername(username || email.split('@')[0]);
    setAuthModal({ isOpen: false, mode: 'login' });
    toast.success("Successfully logged in!");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    toast.success("Logged out successfully!");
  };

  const handlePostFact = (title: string, shortDescription: string, fullDescription: string) => {
    const newFact: Fact = {
      id: Date.now().toString(),
      title,
      shortDescription,
      fullDescription,
      author: username
    };
    setFacts([newFact, ...facts]);
    setPostFactModal(false);
    toast.success("Fact posted successfully!");
  };

  const handleContact = (factId: string, authorName: string) => {
    setContactModal({ isOpen: true, authorName, factId });
  };

  const handleSendMessage = (message: string) => {
    setContactModal({ isOpen: false, authorName: "", factId: "" });
    toast.success("Message sent successfully!");
  };

  const handleLoginPrompt = () => {
    setContactModal({ isOpen: false, authorName: "", factId: "" });
    setAuthModal({ isOpen: true, mode: 'login' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header
        isLoggedIn={isLoggedIn}
        username={username}
        onLogin={() => setAuthModal({ isOpen: true, mode: 'login' })}
        onSignup={() => setAuthModal({ isOpen: true, mode: 'signup' })}
        onLogout={handleLogout}
      />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Discover Amazing Facts
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Expand your knowledge with fascinating facts from around the world
          </p>
          
          <Button 
            onClick={getRandomFact}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
          >
            Get Random Fact
          </Button>
        </div>
      </section>

      {/* Current Fact Display */}
      {currentFact && (
        <section className="py-10 px-4">
          <div className="max-w-2xl mx-auto">
            <FactCard
              {...currentFact}
              isLoggedIn={isLoggedIn}
              onContact={handleContact}
            />
          </div>
        </section>
      )}

      {/* All Facts Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900">All Facts</h3>
            {isLoggedIn && (
              <Button 
                onClick={() => setPostFactModal(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Post Fact
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facts.map((fact) => (
              <FactCard
                key={fact.id}
                {...fact}
                isLoggedIn={isLoggedIn}
                onContact={handleContact}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ isOpen: false, mode: 'login' })}
        mode={authModal.mode}
        onSubmit={handleAuth}
      />

      {/* Post Fact Modal */}
      <PostFactModal
        isOpen={postFactModal}
        onClose={() => setPostFactModal(false)}
        onSubmit={handlePostFact}
      />

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModal.isOpen}
        onClose={() => setContactModal({ isOpen: false, authorName: "", factId: "" })}
        authorName={contactModal.authorName}
        onSubmit={handleSendMessage}
        isLoggedIn={isLoggedIn}
        onLoginPrompt={handleLoginPrompt}
      />
    </div>
  );
};

export default Index;
