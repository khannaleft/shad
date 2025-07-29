import React from 'react';
import type { Service } from './types';

const CleaningIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L12 3m0 0l-3 3m3-3l3 3m-6 9.75L9 21m3-9.75H6.75A2.25 2.25 0 004.5 14.25v2.25a2.25 2.25 0 002.25 2.25H9m3-9.75h3.75a2.25 2.25 0 012.25 2.25v2.25a2.25 2.25 0 01-2.25 2.25H15m-3-9.75v3.75" />
  </svg>
);

const WhiteningIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.624L16.5 21.75l-.398-1.126a3.375 3.375 0 00-2.456-2.456L12.75 18l1.126-.398a3.375 3.375 0 002.456-2.456L16.5 14.25l.398 1.126a3.375 3.375 0 002.456 2.456L20.25 18l-1.126.398a3.375 3.375 0 00-2.456 2.456z" />
  </svg>
);

const FillingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.362-3.797z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.362-3.797zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const RootCanalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const ImplantIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

const BracesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.5-15h15a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75A2.25 2.25 0 014.5 4.5z" />
  </svg>
);

const CrownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0l-.07.002m15.622 0l.07-.002" />
  </svg>
);

const WisdomToothIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H6.633a1.875 1.875 0 01-1.875-1.875V12.375c0-1.036.84-1.875 1.875-1.875z" />
  </svg>
);


export const DENTAL_SERVICES: Service[] = [
  {
    id: 'CLEANING_01',
    name: 'Dental Cleaning',
    description: 'Professional cleaning to remove plaque and tartar, promoting oral health.',
    price: 1500,
    icon: <CleaningIcon className="h-8 w-8 text-violet-400" />
  },
  {
    id: 'WHITENING_01',
    name: 'Teeth Whitening',
    description: 'Brighten your smile with our safe and effective whitening treatments.',
    price: 8000,
    icon: <WhiteningIcon className="h-8 w-8 text-violet-400" />
  },
  {
    id: 'FILLING_01',
    name: 'Cavity Filling',
    description: 'Restore tooth function and integrity with durable filling materials.',
    price: 3500,
    icon: <FillingIcon className="h-8 w-8 text-violet-400" />
  },
  {
    id: 'ROOTCANAL_01',
    name: 'Root Canal Therapy',
    description: 'Relieve pain and save your natural tooth with expert root canal treatment.',
    price: 12000,
    icon: <RootCanalIcon className="h-8 w-8 text-violet-400" />
  },
  {
    id: 'IMPLANT_01',
    name: 'Dental Implants',
    description: 'A permanent solution for missing teeth, restoring function and appearance.',
    price: 75000,
    icon: <ImplantIcon className="h-8 w-8 text-violet-400" />
  },
  {
    id: 'BRACES_01',
    name: 'Braces & Orthodontics',
    description: 'Straighten your teeth and correct bite issues for a perfect smile.',
    price: 60000,
    icon: <BracesIcon className="h-8 w-8 text-violet-400" />
  },
  {
    id: 'CROWN_01',
    name: 'Crowns & Bridges',
    description: 'Restore damaged teeth or replace missing ones with high-quality materials.',
    price: 15000,
    icon: <CrownIcon className="h-8 w-8 text-violet-400" />
  },
  {
    id: 'EXTRACTION_01',
    name: 'Wisdom Tooth Extraction',
    description: 'Safe and comfortable removal of problematic wisdom teeth.',
    price: 9000,
    icon: <WisdomToothIcon className="h-8 w-8 text-violet-400" />
  },
];