# Nikki's Birthday Website — Your Guide

Everything you can change lives in **one file**: `src/data/birthdayData.js`.

## Run it

```bash
npm install
npm run dev      # open the local link it prints
npm run build    # production build
```

## Where to put things

| What          | Put the file in     | Then write in birthdayData.js       |
| ------------- | ------------------- | ----------------------------------- |
| Photos        | `public/images/`    | `image: "/images/one.jpg"`          |
| Videos        | `public/videos/`    | `src: "/videos/for-nikki.mp4"`      |
| Music         | `public/music/`     | `music: [{ title, src: "/music/song.mp3" }]` |
| Files to gift | `public/documents/` | gift `link: "/documents/x.pdf"`     |

Leave anything empty and a tasteful placeholder shows instead — nothing breaks.

## Quick edits

- **Her name / your name / birthday date** → top of `birthdayData.js` (`name`, `from`, `birthday: "YYYY-MM-DD"`).
- **The letter** → `letter.paragraphs` (each string is a paragraph).
- **Memories** → add objects to `memories` (unlimited).
- **Timeline** → `timeline`.
- **Videos** → `videos` (unlimited).
- **Gifts** → `gifts`, with `type` of `message | image | video | link | coupon | song | download`.
- **Surprise boxes** → `surprises` (add 10+ freely).
- **Things you love** → `reasons`.
- **Tap-a-star messages** → `floatingMessages`.
- **Final message** → `final.message` (each line reveals slowly).
- **Secrets** → `easterEggs` (5 clicks on the heart under the title, long-press on mobile, arrow-key konami code on desktop).

## Downloading the letter

Under the letter there's a **Download This Letter 💌** button — it generates a
cream, rose-bordered PDF named `A-Letter-For-Nikki.pdf`.

## Publishing

Use the **Publish** button in Lovable to get a link you can send to Nikki.
