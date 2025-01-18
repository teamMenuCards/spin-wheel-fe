import { cn } from '@/lib/utils';

export const FoodIcon = ({ isVeg = false }: { isVeg?: boolean }) => {
  return (
    <div
      className={cn(
        "w-3 h-3 border-2 inline-flex",
        isVeg ? "border-green-600" : "border-red-600"
      )}
    >
      <span
        className={cn(
          "inline-block w-1.5 h-1.5 rounded-full m-auto",
          isVeg ? "bg-green-600" : "bg-red-600"
        )}
      ></span>
    </div>
  );
};
