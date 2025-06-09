import type { Route } from "./+types/home";
import Intro from "~/ResumeSections/Intro";
import Experience from "~/ResumeSections/Experience";
import Header from "~/ResumeSections/Header";
import SkillsFlow from "~/ResumeSections/Skills";
import SkillsFlowMobile from "~/ResumeSections/SkillsMobile";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Gabriel Barbosa" },
    { name: "description", content: "Resume of Gabriel Barbosa" },
  ];
}

export default function Home() {
  return <>
    <Header />
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
