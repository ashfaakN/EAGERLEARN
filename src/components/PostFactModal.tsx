
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface PostFactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, shortDescription: string, fullDescription: string) => void;
}

const PostFactModal = ({ isOpen, onClose, onSubmit }: PostFactModalProps) => {
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, shortDescription, fullDescription);
    setTitle("");
    setShortDescription("");
    setFullDescription("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Share a New Fact</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Fact Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter an interesting title..."
              required
            />
          </div>
          
          <div>
            <Label htmlFor="short">Short Description</Label>
            <Textarea
              id="short"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="A brief summary of the fact..."
              rows={3}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="full">Full Description</Label>
            <Textarea
              id="full"
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              placeholder="The complete explanation with details..."
              rows={5}
              required
            />
          </div>
          
          <Button type="submit" className="w-full">
            Post Fact
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostFactModal;
