
import React from "react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookOpen } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="border-b border-gray-200 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-education-blue via-education-purple to-education-orange flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold">
            Concept<span className="gradient-text">Vision</span>
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Animation
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
