import { createFileRoute } from "@tanstack/react-router";
// @ts-expect-error - JSX component (JavaScript, per project structure)
import BirthdayExperience from "../components/BirthdayExperience.jsx";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, Nikki ❤️ — A Surprise Made For You" },
      {
        name: "description",
        content:
          "A cinematic birthday surprise for Nikki: cake ceremony, memories, videos, a personal letter, gifts and one last surprise.",
      },
      { property: "og:title", content: "Happy Birthday, Nikki ❤️" },
      {
        property: "og:description",
        content: "Open your birthday surprise — cake, memories, letters, gifts and a final surprise.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <BirthdayExperience />;
}
