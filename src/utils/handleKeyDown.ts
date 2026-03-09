import { KeyboardEvent } from "react";


export const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
  event.currentTarget.blur();
};
