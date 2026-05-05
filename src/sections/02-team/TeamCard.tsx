import type { TeamMember } from "@/lib/types";

type TeamCardProps = {
  member: TeamMember;
  isHovered: boolean;
  isFirst?: boolean;
};

export function TeamCard({ member, isHovered, isFirst = false }: TeamCardProps) {
  const shouldBeBlack = isHovered || isFirst;

  return (
    <>
      {/* Desktop Version - 120px fixed height with absolutely positioned image */}
      <article
        className="hidden md:block relative w-full"
        style={{
          borderTop: "none",
          borderBottom: "1px solid #000",
          backgroundColor: shouldBeBlack ? "#2A1C4C" : "#f5f5f5",
          height: "120px",
          overflow: "visible",
        }}
      >
        <div className="flex items-center h-full px-4 md:px-6 relative z-10">
          <div className="w-1/6">
            <p
              className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest transition-colors duration-400"
              style={{ color: shouldBeBlack ? "#fff" : "#9B8BB5" }}
            >
              {member.role}
            </p>
          </div>

          <div className="flex-1 ml-8">
            <h3
              className="font-editorial text-[40px] md:text-[52px] leading-none transition-colors duration-400"
              style={{ color: shouldBeBlack ? "#fff" : "#000" }}
            >
              {member.name}
            </h3>
          </div>

          <div className="w-1/5" />
        </div>

        {/* Desktop - Image positioned absolutely */}
        {member.primaryImageSrc && shouldBeBlack && (
          <img
            src={member.primaryImageSrc}
            alt={member.primaryAlt}
            style={{
              position: "absolute",
              right: "80px",
              top: "50%",
              transform: `translateY(-50%) rotate(${member.rotation || -4}deg)`,
              height: "480px",
              width: "auto",
              zIndex: 50,
              pointerEvents: "none",
            }}
            loading="lazy"
          />
        )}
      </article>

      {/* Mobile Version - Full-width card with image below text */}
      <article
        className="md:hidden relative w-full"
        style={{
          borderTop: "none",
          borderBottom: "1px solid #000",
          backgroundColor: "#f5f5f5",
          overflow: "visible",
        }}
      >
        {/* Text Section */}
        <div className="flex flex-col gap-4 px-4 py-6">
          <div>
            <p
              className="font-mono text-[9px] uppercase tracking-widest transition-colors duration-400 mb-2"
              style={{ color: "#9B8BB5" }}
            >
              {member.role}
            </p>
            <h3
              className="font-editorial text-[32px] md:text-[36px] leading-tight transition-colors duration-400"
              style={{ color: "#000" }}
            >
              {member.name}
            </h3>
          </div>

          {/* Image Section - Below text on mobile, full width with padding */}
          {member.primaryImageSrc && (
            <div className="w-screen -ml-4 px-4 mt-4 mb-4">
              <div className="relative w-full overflow-hidden rounded-sm">
                <img
                  src={member.primaryImageSrc}
                  alt={member.primaryAlt}
                  className="w-full h-auto object-contain"
                  loading="lazy"
                  style={{ maxHeight: '400px' }}
                />
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
