import React from "react";
import { AboutManifestoSection } from "./AboutManifestoSection";
import { AboutInfrastructureSection } from "./AboutInfrastructureSection";
import { AboutLeadershipSection } from "./AboutLeadershipSection";

/**
 * AboutUsSection is maintained as a composite wrapper for backward compatibility.
 * The 3 independent modular sections can also be rendered directly in layouts.
 */
export const AboutUsSection: React.FC = () => {
  return (
    <>
      <AboutManifestoSection />
      <AboutInfrastructureSection />
      <AboutLeadershipSection />
    </>
  );
};
