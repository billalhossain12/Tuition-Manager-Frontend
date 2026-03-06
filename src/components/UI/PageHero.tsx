import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

type TPageHeroProps = {
  title: string;
  description: string;
  image: string;
};

export default function PageHero({ data }: { data: TPageHeroProps }) {
  const { title, description, image } = data;
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);
  return (
    <section className="bg-gradient-to-b from-orange-200 to-teal-50 dark:from-gray-700 dark:to-gray-900 border-[1px] border-orange-100 dark:border-gray-700 md:px-[5rem] px-3 py-8 md:space-y-[1.5rem] space-y-[1rem] relative">
      <button
        onClick={handleGoBack}
        className="bg-brand-navy text-text-white hover:bg-brand-navyHover active:scale-95 rounded-button px-6 py-3 transition font-bold flex items-center gap-3"
      >
        <Icon icon="gg:arrow-left" width="24" height="24" />
        <span>Back</span>
      </button>

      <h3 className="md:text-[28px] font-extrabold dark:text-darkModeHeadingTextColor">
        {title}
      </h3>
      <p className="md:text-[18px] text-[14px]  dark:text-darkModeNormalTextColor leading-[27px] md:mr-[8rem]">
        {description}
      </p>
      <div className="absolute bottom-0 right-0 flex justify-end">
        <img className="md:w-auto w-[80px]" src={image} alt="" />
      </div>
    </section>
  );
}
