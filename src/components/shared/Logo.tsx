interface LogoProps {
  className?: string;
  size?: "sm" | "lg";
}

const Logo: React.FC<LogoProps> = ({ className = "", size = "lg" }) => {
  const isSmall = size === "sm";

  const textSize = isSmall ? "text-3xl" : "text-6xl md:text-8xl";
  const boxPadding = isSmall ? "px-3 py-0" : "px-6 py-1";
  const borderSize = isSmall ? "border-2" : "border-4";
  const shadowOffset = isSmall ? "top-[3px] left-[3px]" : "top-2 left-2";
  const negativeMargin = isSmall ? "-mt-2" : "-mt-4 md:-mt-6";

  return (
    <div
      className={`inline-flex flex-col items-center select-none ${className}`}
    >
      {/* CLUE BLOCK */}
      <div className="relative z-10 transform -rotate-3 hover:-rotate-6 transition-transform duration-300 origin-bottom-left cursor-default">
        <div
          className={`absolute ${shadowOffset} w-full h-full bg-neo-black`}
        />
        <div
          className={`relative bg-primary ${borderSize} border-neo-black ${boxPadding}`}
        >
          <span
            className={`font-display font-black ${textSize} tracking-tighter text-neo-black block leading-none`}
          >
            CLUE
          </span>
        </div>
      </div>

      {/* WORDS BLOCK */}
      <div
        className={`relative z-20 ${negativeMargin} transform rotate-2 hover:rotate-6 transition-transform duration-300 origin-top-right cursor-default`}
      >
        <div
          className={`absolute ${shadowOffset} w-full h-full bg-neo-black`}
        />
        <div
          className={`relative bg-white ${borderSize} border-neo-black ${boxPadding}`}
        >
          <span
            className={`font-display font-black ${textSize} tracking-tighter text-neo-black block leading-none`}
          >
            WORDS
          </span>
        </div>
      </div>
    </div>
  );
};

export default Logo;
