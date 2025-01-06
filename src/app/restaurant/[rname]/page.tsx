"use client";
import { useParams } from 'next/navigation';

import { useGetRestaurantDetailByNameQuery } from '@/services/restaurant/get-restaurant-detail';

console.log("vikasasas");

export default function BaseRestaurantPage() {
  const { rname } = useParams<{ rname: string }>();

  const { currentData, error, isLoading } =
    useGetRestaurantDetailByNameQuery(rname);

  return (
    <div>
      <h6>vikas</h6>
      <h1>{currentData?.display_name}</h1>
    </div>
  );
}
