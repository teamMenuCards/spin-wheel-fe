"use client";

export const parseDynamicURL = (
  dynamicURL: string,
  mapValues: Record<string, string>
) => {
  const keys = Object.keys(mapValues);
  keys.forEach((key) => {
    dynamicURL = dynamicURL.replace(`{${key}}`, mapValues[key]);
  });

  console.log(dynamicURL, "url");
  return dynamicURL;
};
