interface HeroTextProps {
  size?: string;
}

export default function HeroText({ size }: HeroTextProps) {
  return (
    <div
      className={`font-rubik flex flex-col items-center ${
        size === "90px"
          ? "text-2xl font-bold leading-6"
          : "max-[350px]:text-[3rem] max-[400px]:text-6xl text-7xl md:text-9xl"
      }`}
    >
      <h1>CLUE</h1>
      <h1>WORDS</h1>
    </div>
  );
}
