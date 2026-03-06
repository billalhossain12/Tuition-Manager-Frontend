export const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  // Prevent 'e' sign
  if (event.key === "e") {
    event.preventDefault();
  }
};
