interface HeroTextProps {
  size?: string;
}

export default function HeroText({ size }: HeroTextProps) {
  return (
    <div className={`font-rubik flex flex-col items-center ${size === "90px"
      ? "text-2xl font-bold leading-6"
      : "text-6xl md:text-8xl"
      }`}>
      <h1>CLUE</h1>
      <h1>WORDS</h1>
    </div>
  )
}