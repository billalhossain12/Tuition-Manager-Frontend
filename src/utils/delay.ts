export const delay = async (ms: number = 2000) => {
  return await new Promise((resolve) => setTimeout(resolve, ms));
};
