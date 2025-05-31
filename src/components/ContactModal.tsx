
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  authorName: string;
  onSubmit: (message: string) => void;
  isLoggedIn: boolean;
  onLoginPrompt: () => void;
}

const ContactModal = ({ 
  isOpen, 
  onClose, 
  authorName, 
  onSubmit, 
  isLoggedIn, 
  onLoginPrompt 
}: ContactModalProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      onLoginPrompt();
      return;
    }
    onSubmit(message);
    setMessage("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact {authorName}</DialogTitle>
        </DialogHeader>
        
        {!isLoggedIn ? (
          <div className="text-center py-6">
            <p className="text-gray-600 mb-4">
              Please log in to contact fact posters
            </p>
            <Button onClick={onLoginPrompt} className="w-full">
              Login to Continue
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                rows={4}
                required
              />
            </div>
            
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
