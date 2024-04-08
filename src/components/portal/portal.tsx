import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
}

export function Portal({ children }: PortalProps) {
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => setIsClientSide(true), []);

  return isClientSide ? createPortal(children, document.body) : null;
}
