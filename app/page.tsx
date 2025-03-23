"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, ArrowRight, Phone, Mail, Clock } from "lucide-react";

const properties = [
  {
    id: 1,
    name: "Modern Office Complex",
    description: "Premium office space in downtown business district",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 2,
    name: "Luxury Retail Space",
    description: "High-traffic retail location with modern amenities",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 3,
    name: "Industrial Warehouse",
    description: "Spacious warehouse with excellent logistics access",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 4,
    name: "Creative Studio Loft",
    description: "Open-concept studio space perfect for creative agencies",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 5,
    name: "Corporate Headquarters",
    description: "Prestigious office building with panoramic city views",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 6,
    name: "Tech Hub Office",
    description: "Modern workspace designed for tech companies",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight">
              Smart Lease Management System
            </h1>
            <p className="text-gray-400">
              Streamline your lease operations with our comprehensive management platform
            </p>
            <div className="flex gap-4">
              <Link href="/login">
                <Button className="bg-white text-black hover:bg-white/90">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative aspect-square">
            <div className="absolute inset-0 border-2 border-gray-800 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=1200"
                alt="Modern office building"
                className="w-full h-full object-cover opacity-50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2 p-6 border border-gray-800 rounded-lg">
              <div className="text-3xl font-bold">1,400+</div>
              <div className="text-gray-400">Active Leases</div>
            </div>
            <div className="space-y-2 p-6 border border-gray-800 rounded-lg">
              <div className="text-3xl font-bold">14</div>
              <div className="text-gray-400">Years Experience</div>
            </div>
            <div className="space-y-2 p-6 border border-gray-800 rounded-lg">
              <div className="text-3xl font-bold">38,621+</div>
              <div className="text-gray-400">Square Meters Managed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="group border border-gray-800 rounded-lg overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:opacity-0"></div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{property.name}</h3>
                <p className="text-gray-400 text-sm mt-1">{property.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h2 className="text-2xl font-bold">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span>contact@example.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Send us a message</h2>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-400">Name</Label>
                  <Input
                    id="name"
                    className="bg-transparent border-gray-800 focus-visible:ring-0 focus-visible:border-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-400">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    className="bg-transparent border-gray-800 focus-visible:ring-0 focus-visible:border-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-gray-400">Message</Label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full bg-transparent border border-gray-800 rounded-md p-2 focus:outline-none focus:border-gray-700"
                  />
                </div>
                <Button className="w-full bg-white text-black hover:bg-white/90">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Careers</li>
                <li>Press</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Leasing</li>
                <li>Management</li>
                <li>Consulting</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Terms</li>
                <li>Privacy</li>
                <li>Cookies</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Social</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Twitter</li>
                <li>LinkedIn</li>
                <li>Instagram</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 Lease Management. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}