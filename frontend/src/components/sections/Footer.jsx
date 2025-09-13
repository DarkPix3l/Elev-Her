import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#A7A1D5] py-12">
      <div className="wrapper">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_3fr_1fr_1fr_1fr] gap-8">
          {/* First Column: Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center">&gt;ElevHER</h3>
            <p className="text-sm mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <FaFacebookF size={20} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <FaTwitter size={20} />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <FaInstagram size={20} />
              </Link>
            </div>
          </div>

          {/* Spacer Column */}
          <div></div>

          {/* Third Column: About */}
          <div>
            <h4 className="font-semibold text-lg mb-4">About</h4>
            <ul>
              <li className="mb-2">
                <Link href="/" className="hover:underline text-sm">
                  How it works
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/" className="hover:underline text-sm">
                  Featured
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/" className="hover:underline text-sm">
                  Why Choose Us
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/" className="hover:underline text-sm">
                  Business Relation
                </Link>
              </li>
            </ul>
          </div>

          {/* Fourth Column: Community */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Community</h4>
            <ul>
              <li className="mb-2">
                <Link href="/" className="hover:underline text-sm">
                  Events
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/" className="hover:underline text-sm">
                  Blog
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/" className="hover:underline text-sm">
                  Podcast
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/" className="hover:underline text-sm">
                  Invite a friend
                </Link>
              </li>
            </ul>
          </div>

          {/* Fifth Column: Socials */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Socials</h4>
            <ul>
              <li className="mb-2">
                <Link
                  href="https://discord.com"
                  target="_blank"
                  className="hover:underline text-sm"
                >
                  Discord
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  className="hover:underline text-sm"
                >
                  Instagram
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  className="hover:underline text-sm"
                >
                  Twitter
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  className="hover:underline text-sm"
                >
                  Facebook
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-600 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} Company Name. All rights reserved</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/privacy-policy" className="hover:underline">
              Privacy & Policy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms & Condition
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
