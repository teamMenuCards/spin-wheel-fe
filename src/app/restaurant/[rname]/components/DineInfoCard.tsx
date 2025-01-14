import Image from "next/image";
import Rating from "./Rating";

const DineInfoCard = ({ restaurantInfo, reviewsRef }) => {
  const reviews = restaurantInfo.reviews || {};

  return (
    <div className="flex flex-wrap justify-between items-start w-full">
      {/* Details Section */}
      <div className="flex-1 text-left pr-4 w-full md:w-[calc(100%-150px)]">
        <h2 className="font-bold text-lg truncate">{restaurantInfo.name}</h2>
        <p className="text-sm text-gray-600 flex flex-wrap gap-1 mb-2">
          {restaurantInfo.cuisine.join(", ")}
        </p>
      </div>

      {/* Logo Section */}
      <div className="absolute top-[-62.5px] left-1/2 transform -translate-x-1/2 w-[125px] h-[125px] rounded-full overflow-hidden border-2 border-white bg-white z-10 shadow-md transition-transform duration-300 hover:scale-105">
        <Image
          src="/coco.jpg"
          alt="Restaurant Logo"
          width={125}
          height={125}
          priority
        />
      </div>

      {/* Ratings Section */}
      <div className="flex-1 text-center mt-4 w-full md:w-[150px] md:mt-0">
        <div className="flex flex-row justify-center gap-3 w-full">
          <Rating
            logo="/zomato-logo.png"
            rating={reviews.zomato?.rating || "N/A"}
            onClick={() =>
              reviewsRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          />
          <Rating
            logo="/swiggy-logo.png"
            rating={reviews.swiggy?.rating || "N/A"}
            onClick={() =>
              reviewsRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          />
          <Rating
            logo="/google-logo.png"
            rating={reviews.google?.rating || "N/A"}
            onClick={() =>
              reviewsRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default DineInfoCard;
