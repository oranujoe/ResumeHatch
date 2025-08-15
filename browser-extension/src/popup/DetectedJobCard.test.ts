import { describe, it, expect, beforeAll } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import DetectedJobCard from './DetectedJobCard';

// Mock minimal chrome API used by component
// @ts-ignore
(global as any).chrome = {
  runtime: {
    sendMessage: () => {},
    getURL: (path: string) => path,
  },
} as any;

// Mock clipboard API
// @ts-ignore
(global as any).navigator.clipboard = {
  writeText: () => Promise.resolve(),
};

const sampleJob = {
  title: 'AI Prompt Engineer',
  company: 'OpenAI',
  location: 'Remote',
  description: 'We are seeking a highly skilled prompt engineer to join our team...',
  url: 'https://linkedin.com/jobs/view/123',
};

describe('DetectedJobCard snapshot', () => {
  it('matches snapshot', () => {
    const element = React.createElement(DetectedJobCard, { job: sampleJob as any, tabId: 1 });
    const html = renderToStaticMarkup(element);
    expect(html).toMatchSnapshot();
  });
}); 