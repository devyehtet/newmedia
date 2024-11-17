"use client"

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    adsbygoogle: any[];
    googletag: any;
  }
}

interface AdSlotProps {
  adUnitPath: string
  size: [number, number] | 'responsive'
  adPlatform: 'adsense' | 'meta' | 'adx'
}

export function AdSlot({ adUnitPath, size, adPlatform }: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !adRef.current) return

    switch (adPlatform) {
      case 'adsense':
        if (typeof window.adsbygoogle !== 'undefined') {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
        break
      case 'meta':
        // Implement Meta Ads initialization here
        break
      case 'adx':
        if (typeof window.googletag === 'undefined') {
          window.googletag = window.googletag || { cmd: [] };
          const script = document.createElement('script');
          script.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
          document.head.appendChild(script);
        }

        const slotId = `ad-${adUnitPath.replace(/\//g, '-')}-${Math.random().toString(36).substring(7)}`;
        adRef.current!.id = slotId;

        window.googletag.cmd.push(() => {
          window.googletag.destroySlots(); // Clear existing slots
          const adSlot = window.googletag
            .defineSlot(adUnitPath, size, slotId)
            ?.addService(window.googletag.pubads());

          if (adSlot) {
            window.googletag.enableServices();
            window.googletag.display(slotId);
          }
        });
        break
    }

    return () => {
      if (adPlatform === 'adx' && typeof window.googletag !== 'undefined') {
        window.googletag.cmd.push(() => {
          window.googletag.destroySlots();
        });
      }
    };
  }, [adUnitPath, size, adPlatform])

  if (adPlatform === 'adsense') {
    return (
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
        data-ad-slot={adUnitPath}
        data-ad-format={size === 'responsive' ? 'auto' : 'rectangle'}
        data-full-width-responsive="true"
      ></ins>
    )
  }

  return (
    <div
      ref={adRef}
      id={`ad-${adUnitPath.replace(/\//g, '-')}`}
      style={{
        width: size === 'responsive' ? '100%' : `${size[0]}px`,
        height: size === 'responsive' ? 'auto' : `${size[1]}px`,
      }}
    ></div>
  )
}