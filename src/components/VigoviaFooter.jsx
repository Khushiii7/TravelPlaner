import React from "react";
import Vigovia from "../assets/Vigvia logo.png";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export default function VigoviaFooter() {
  return (
    <div className="w-full bg-white">
      {/* Tour Packages Row 1 */}
      <div className="bg-gray-100 text-gray-600 text-xs py-2 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <span className="cursor-pointer hover:text-blue-600">Bali Tour Packages</span>
            <span className="cursor-pointer hover:text-blue-600">JapanTour Packages</span>
            <span className="cursor-pointer hover:text-blue-600">Vietnam Tour Packages</span>
            <span className="cursor-pointer hover:text-blue-600">Malaysia Tour Packages</span>
            <span className="cursor-pointer hover:text-blue-600">Thailand Tour Packages</span>
            <span className="cursor-pointer hover:text-blue-600">Europe Tour Packages</span>
            <span className="cursor-pointer hover:text-blue-600">Cultural Tour Packages</span>
            <span className="cursor-pointer hover:text-blue-600">Luxury Tour packages</span>
          </div>
        </div>
      </div>
      {/* Tour Packages Row 2 */}
      <div className="bg-gray-100 text-gray-600 text-xs py-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <span className="cursor-pointer hover:text-blue-600">Dubai Tour Packages</span>
            <span className="cursor-pointer hover:text-blue-600">Turkey Tour Packages</span>
            <span className="cursor-pointer hover:text-blue-600">UAE Tour Packages</span>
            <span className="cursor-pointer hover:text-blue-600">Singapore Tour Packages</span>
            <span className="cursor-pointer hover:text-blue-600">Australia Tour Packages</span>
            <span className="cursor-pointer hover:text-blue-600">South Korea Tour Packages</span>
            <span className="cursor-pointer hover:text-blue-600">Honeymoon Tour packages</span>
            <span className="cursor-pointer hover:text-blue-600">Adventure Tour packages</span>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-purple-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {/* Our Offerings */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4 text-sm">Our offerings</h3>
              <ul className="space-y-2 text-xs text-blue-600">
                <li className="cursor-pointer hover:underline">Holidays</li>
                <li className="cursor-pointer hover:underline">Visa</li>
                <li className="cursor-pointer hover:underline">Forex</li>
                <li className="cursor-pointer hover:underline">Hotels</li>
                <li className="cursor-pointer hover:underline">Flights</li>
              </ul>
            </div>
            {/* Popular Destinations */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4 text-sm">Popular destinations</h3>
              <ul className="space-y-2 text-xs text-blue-600">
                <li className="cursor-pointer hover:underline">Dubai</li>
                <li className="cursor-pointer hover:underline">Bali</li>
                <li className="cursor-pointer hover:underline">Thailand</li>
                <li className="cursor-pointer hover:underline">Singapore</li>
                <li className="cursor-pointer hover:underline">Malaysia</li>
              </ul>
            </div>
            {/* Vigovia Specials */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4 text-sm">Vigovia Specials</h3>
              <ul className="space-y-2 text-xs text-blue-600">
                <li className="cursor-pointer hover:underline">Featured Experience</li>
                <li className="cursor-pointer hover:underline">Group Tours</li>
                <li className="cursor-pointer hover:underline">Backpackers Club</li>
                <li className="cursor-pointer hover:underline">Offline Events</li>
              </ul>
            </div>
            {/* Company */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4 text-sm">Company</h3>
              <ul className="space-y-2 text-xs text-blue-600">
                <li className="cursor-pointer hover:underline">About Us</li>
                <li className="cursor-pointer hover:underline">Careers</li>
                <li className="cursor-pointer hover:underline">Vigovia Blog</li>
                <li className="cursor-pointer hover:underline">Partner Portal</li>
                <li className="cursor-pointer hover:underline">Accreditations</li>
              </ul>
            </div>
            {/* More */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4 text-sm">More</h3>
              <ul className="space-y-2 text-xs text-blue-600">
                <li className="cursor-pointer hover:underline">Investor Relations</li>
                <li className="cursor-pointer hover:underline">Forex</li>
                <li className="cursor-pointer hover:underline">FAQs</li>
                <li className="cursor-pointer hover:underline">Domestic Holidays</li>
              </ul>
            </div>
            {/* Contact & Address */}
            <div className="text-right">
              <div className="bg-purple-800 text-white p-4 rounded-lg mb-4 inline-block">
                <p className="text-xs mb-1">Need help? Call us</p>
                <p className="text-sm font-bold">+91-98xxx64641</p>
              </div>
              <div className="text-xs text-gray-700 text-right">
                <p className="font-semibold mb-1">Email</p>
                <p className="text-blue-600 mb-3 cursor-pointer hover:underline">contact@vigovia.com</p>
                <p className="font-semibold mb-1">Address</p>
                <p className="text-xs leading-relaxed text-gray-600">
                  HD-109 Cinnabar Hills,Links Business<br/>
                  Park,Bangalore<br/>
                  North,Bangalore,Karnataka,India-560071
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo and Payments */}
      <div className="bg-white py-8 border-t border-gray-200 align-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 flex flex-col items-start">
              <img
                src={Vigovia}
                alt="Vigovia Logo"
                width={140}
                height={50}
                className="object-contain"
                style={{ maxWidth: 140, height: 50 }}
              />
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <h4 className="font-semibold text-gray-800 mb-3 text-sm">Payments</h4>
              <div className="flex gap-3 justify-center">
                <div className="bg-blue-600 text-white px-4 py-2 rounded text-xs font-medium">Razorpay</div>
                <div className="bg-blue-800 text-white px-4 py-2 rounded text-xs font-medium">stripe</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#321e5d] text-white py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-xs">
            <p>© 2025 Vigovia Travel Technologies (P) Ltd. All rights reserved.</p>
            <div className="flex gap-3 ml-6">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 cursor-pointer transition-colors">
                <FaFacebookF size={14} className="text-black" />
              </div>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 cursor-pointer transition-colors">
                <FaInstagram size={14} className="text-black" />
              </div>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 cursor-pointer transition-colors">
                <FaLinkedinIn size={14} className="text-black" />
              </div>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 cursor-pointer transition-colors">
                <FaYoutube size={14} className="text-black" />
              </div>
            </div>
            <div className="flex items-center gap-6 mt-2 md:mt-0">
              <div className="flex gap-6">
                <a href="#" className="hover:underline cursor-pointer">Privacy policy</a>
                <a href="#" className="hover:underline cursor-pointer">Legal notice</a>
                <a href="#" className="hover:underline cursor-pointer">Accessibility</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}