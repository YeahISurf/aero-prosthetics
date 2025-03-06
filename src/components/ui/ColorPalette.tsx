"use client";

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface ColorSwatch {
  name: string;
  value: string;
  textColor?: 'white' | 'black';
}

interface ColorGroupProps {
  title: string;
  colors: ColorSwatch[];
  className?: string;
}

function ColorGroup({ title, colors, className = '' }: ColorGroupProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => copyToClipboard(color.value)}
            className="group relative flex flex-col items-center rounded-md overflow-hidden border border-gray-200 transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            title={`Copy ${color.value}`}
          >
            <div
              className="w-full h-16 flex items-center justify-center"
              style={{ backgroundColor: color.value }}
            >
              {copiedColor === color.value ? (
                <Check className={color.textColor === 'black' ? 'h-5 w-5 text-black' : 'h-5 w-5 text-white'} />
              ) : (
                <Copy className={color.textColor === 'black' ? 'h-5 w-5 opacity-0 group-hover:opacity-100 text-black' : 'h-5 w-5 opacity-0 group-hover:opacity-100 text-white'} />
              )}
            </div>
            <div className="w-full p-2 text-xs bg-white">
              <div className="font-medium">{color.name}</div>
              <div className="text-gray-500">{color.value}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export interface ColorPaletteProps {
  className?: string;
}

export function ColorPalette({ className = '' }: ColorPaletteProps) {
  const primaryColors: ColorSwatch[] = [
    { name: 'Primary 50', value: '#E6F0FA', textColor: 'black' },
    { name: 'Primary 100', value: '#CCE0F5', textColor: 'black' },
    { name: 'Primary 200', value: '#99C2EB', textColor: 'black' },
    { name: 'Primary 300', value: '#66A3E0', textColor: 'black' },
    { name: 'Primary 400', value: '#3385D6', textColor: 'white' },
    { name: 'Primary 500', value: '#0055B8', textColor: 'white' },
    { name: 'Primary 600', value: '#003A7E', textColor: 'white' },
    { name: 'Primary 700', value: '#002C5F', textColor: 'white' },
    { name: 'Primary 800', value: '#001D3F', textColor: 'white' },
    { name: 'Primary 900', value: '#000F20', textColor: 'white' },
  ];

  const tealColors: ColorSwatch[] = [
    { name: 'Teal 50', value: '#E6FAFA', textColor: 'black' },
    { name: 'Teal 100', value: '#CCF5F5', textColor: 'black' },
    { name: 'Teal 200', value: '#99EBEB', textColor: 'black' },
    { name: 'Teal 300', value: '#66E0E0', textColor: 'black' },
    { name: 'Teal 400', value: '#33D6D6', textColor: 'black' },
    { name: 'Teal 500', value: '#00A3B4', textColor: 'white' },
    { name: 'Teal 600', value: '#007A88', textColor: 'white' },
    { name: 'Teal 700', value: '#005C66', textColor: 'white' },
    { name: 'Teal 800', value: '#003D44', textColor: 'white' },
    { name: 'Teal 900', value: '#001F22', textColor: 'white' },
  ];

  const greenColors: ColorSwatch[] = [
    { name: 'Green 50', value: '#E6FAF2', textColor: 'black' },
    { name: 'Green 100', value: '#CCF5E5', textColor: 'black' },
    { name: 'Green 200', value: '#99EBCB', textColor: 'black' },
    { name: 'Green 300', value: '#66E0B2', textColor: 'black' },
    { name: 'Green 400', value: '#33D698', textColor: 'black' },
    { name: 'Green 500', value: '#00B67A', textColor: 'white' },
    { name: 'Green 600', value: '#00885B', textColor: 'white' },
    { name: 'Green 700', value: '#006644', textColor: 'white' },
    { name: 'Green 800', value: '#00442E', textColor: 'white' },
    { name: 'Green 900', value: '#002217', textColor: 'white' },
  ];

  const redColors: ColorSwatch[] = [
    { name: 'Red 50', value: '#FDEBEC', textColor: 'black' },
    { name: 'Red 100', value: '#FBD7D9', textColor: 'black' },
    { name: 'Red 200', value: '#F7AFB4', textColor: 'black' },
    { name: 'Red 300', value: '#F3878E', textColor: 'black' },
    { name: 'Red 400', value: '#EF5F69', textColor: 'white' },
    { name: 'Red 500', value: '#E63946', textColor: 'white' },
    { name: 'Red 600', value: '#C71D2A', textColor: 'white' },
    { name: 'Red 700', value: '#961621', textColor: 'white' },
    { name: 'Red 800', value: '#640E16', textColor: 'white' },
    { name: 'Red 900', value: '#32070B', textColor: 'white' },
  ];

  const grayColors: ColorSwatch[] = [
    { name: 'Gray 50', value: '#F5F7FA', textColor: 'black' },
    { name: 'Gray 100', value: '#E2E8F0', textColor: 'black' },
    { name: 'Gray 200', value: '#CBD5E1', textColor: 'black' },
    { name: 'Gray 300', value: '#94A3B8', textColor: 'black' },
    { name: 'Gray 400', value: '#64748B', textColor: 'white' },
    { name: 'Gray 500', value: '#475569', textColor: 'white' },
    { name: 'Gray 600', value: '#334155', textColor: 'white' },
    { name: 'Gray 700', value: '#1E293B', textColor: 'white' },
    { name: 'Gray 800', value: '#0F172A', textColor: 'white' },
    { name: 'Gray 900', value: '#020617', textColor: 'white' },
  ];

  return (
    <div className={`space-y-8 ${className}`}>
      <ColorGroup title="Primary Blue" colors={primaryColors} />
      <ColorGroup title="Secondary Teal" colors={tealColors} />
      <ColorGroup title="Secondary Green" colors={greenColors} />
      <ColorGroup title="Secondary Red" colors={redColors} />
      <ColorGroup title="Gray" colors={grayColors} />
    </div>
  );
} 