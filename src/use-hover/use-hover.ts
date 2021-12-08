import React, { useState } from 'react';

export function useHover<El extends Element = HTMLElement>() {
  const [isHovering, setIsHovering] = useState(false);

  let onMouseEnter: React.MouseEventHandler<El> = () => setIsHovering(true);
  let onMouseLeave: React.MouseEventHandler<El> = () => setIsHovering(false);
  let onFocus: React.FocusEventHandler<El> = () => setIsHovering(true);
  let onBlur: React.FocusEventHandler<El> = () => setIsHovering(false);

  return [isHovering, { onMouseEnter, onMouseLeave, onFocus, onBlur }] as const;
}
