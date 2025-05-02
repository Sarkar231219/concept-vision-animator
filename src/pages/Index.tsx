
import React from "react";
import Header from "@/components/Header";
import AnimationGenerator from "@/pages/AnimationGenerator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-1">
        <AnimationGenerator />
      </main>
      <footer className="py-6 border-t border-gray-200 bg-white dark:bg-gray-950 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>ConceptVision Animation Generator &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
