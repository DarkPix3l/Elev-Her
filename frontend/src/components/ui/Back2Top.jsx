import Link from 'next/link';
import React from 'react';
import { MdKeyboardDoubleArrowUp } from 'react-icons/md';

export default function Back2Top() {
  return (
    <div className="p-5 fixed bottom-8 right-8 bg-amber-50/20 rounded-xl z-10">
      <Link href="#hero">
        <MdKeyboardDoubleArrowUp className="max-w-9 max-h-9" />
      </Link>
    </div>
  );
}
