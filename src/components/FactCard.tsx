
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Plus, X } from "lucide-react";

interface FactCardProps {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  author: string;
  isLoggedIn: boolean;
  onContact: (factId: string, authorName: string) => void;
}

const FactCard = ({ 
  id, 
  title, 
  shortDescription, 
  fullDescription, 
  author, 
  isLoggedIn, 
  onContact 
}: FactCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105">
      <CardHeader>
        <CardTitle className="text-xl text-blue-900">{title}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-700 mb-4">
          {isExpanded ? fullDescription : shortDescription}
        </p>
        
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:text-blue-800 p-0 h-auto font-normal"
        >
          {isExpanded ? (
            <>
              <X className="h-4 w-4 mr-1" />
              Show less
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-1" />
              Learn more
            </>
          )}
        </Button>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center pt-4 border-t">
        <span className="text-sm text-gray-500">By {author}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onContact(id, author)}
          className="hover:bg-blue-50"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Contact Poster
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FactCard;
