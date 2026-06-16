"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { createIcons, icons } from 'lucide';

export default function IconInit() {
  const pathname = usePathname();

  useEffect(() => {
    // We observe the DOM for changes to ensure icons that load late are rendered
    const observer = new MutationObserver(() => {
      const unrendered = document.querySelectorAll('i[data-lucide]:not([data-rendered])');
      if (unrendered.length > 0) {
        unrendered.forEach(el => el.setAttribute('data-rendered', 'true'));
        createIcons({ icons });
      }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Initial render
    createIcons({ icons });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
