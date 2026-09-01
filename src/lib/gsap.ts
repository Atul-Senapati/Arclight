"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

let registered = false;

if (typeof window !== "undefined" && !registered) {
  registered = true;
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, CustomEase);

  // Signature easings for the whole site
  CustomEase.create("arc", "0.16, 1, 0.3, 1");
  CustomEase.create("swift", "0.65, 0, 0.35, 1");

  gsap.defaults({ ease: "arc", duration: 1 });
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, useGSAP, ScrollTrigger, SplitText };
