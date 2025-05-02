
import React from "react";

interface AnimationGeneratorLayoutProps {
  children: React.ReactNode;
}

const AnimationGeneratorLayout: React.FC<AnimationGeneratorLayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {children}
      </div>
    </div>
  );
};

export default AnimationGeneratorLayout;
