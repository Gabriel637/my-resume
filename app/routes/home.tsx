import type { Route } from "./+types/home";
import Intro from "../Sections/Intro";
import Experience from "../Sections/Experience";
import Header from "~/components/Header";
import SkillsFlow from "~/Sections/Skills";
import SkillsFlowMobile from "~/Sections/SkillsMobile";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Gabriel Barbosa" },
    { name: "description", content: "Resume of Gabriel Barbosa" },
  ];
}

export default function Home() {
  return <><Header />
    <Intro />
    <div className="hidden md:block">
      <SkillsFlow />
    </div>
    <div className="md:hidden">
      <SkillsFlowMobile />
    </div>
    <Experience />
  </>;
}
