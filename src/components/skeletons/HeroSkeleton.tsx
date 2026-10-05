import { bgTodayLarge, bgTodaySmall, iconSunny } from "../../assets";
import { HeroLoading } from "./HeroLoading";

type HeroSkeletonProp = {
  loadingWeather: boolean;
};
export const HeroSkeleton = ({ loadingWeather }: HeroSkeletonProp) => {
  if (loadingWeather) {
    return <HeroLoading />;
  }
  return (
    <div aria-hidden="true" className="relative h-75">
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-2 p-8 md:flex-row md:justify-between">
        <div className="space-y-4 text-center">
          <span className="text-3xl">_,_</span>
        </div>
        <div className="flex items-center gap-4">
          <img src={iconSunny} alt="" className="w-30" />
          <span className="text-8xl italic">0°</span>
        </div>
      </div>
      <picture>
        <source srcSet={bgTodayLarge} media="(min-width: 768px)" />
        <img
          src={bgTodaySmall}
          alt=""
          className="absolute top-0 h-full w-full rounded-2xl object-cover"
        />
      </picture>
    </div>
  );
};
