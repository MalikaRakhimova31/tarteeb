"use client";

import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 relative">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="text-white mb-12 z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Ready to Transform
            <br />
            Your Workflow?
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Reach out to us directly on Telegram and we’ll get you started.
          </p>
          <div className="flex justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              <a
                href="https://t.me/m/WPclTnvIZDdi"
                target="_blank"
                rel="noopener noreferrer"
              >
                Message us on Telegram
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-white/10 opacity-[0.03] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-white/10 opacity-[0.02] rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 left-[10%]  w-64 h-64 bg-white/10 opacity-[0.02] rounded-full animate-pulse z-0"></div>
      </div>
    </section>
  );
}
