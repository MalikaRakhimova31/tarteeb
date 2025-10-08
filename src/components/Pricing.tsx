"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMemo, useState } from "react";
import NumberFlow from "@number-flow/react";

export default function Pricing() {
  const [frequency, setFrequency] = useState<string>("monthly");
  const plans = useMemo(() => {
    return [
      {
        name: "Starter",
        price: "Free",
        period: "",
        description: "Perfect for getting started with basic features",
        features: [
          "Up to 1000 students",
          "Up to 100 groups",
          "Basic support",
          "Monthly attendance report",
        ],
        cta: "Get Started Free",
        popular: false,
        comments: "",
        link: "https://t.me/m/86rEuvWvNDIy",
      },
      {
        name: "Pro",
        price: frequency == "monthly" ? 300000 : 249900,
        period: "monthly",
        description: "Everything in Free plan plus advanced features",
        features: [
          "Everything in Free plan",
          "SMS notifications to parents",
          "Standard support",
          "Pay-as-you-go (200 UZS per SMS)",
          "Payment analytics",
          "Reading & listening mocks (bonus)",
          "Dark theme",
        ],
        cta: "Let's talk",
        popular: true,
        comments: "",
        link: "https://t.me/m/86rEuvWvNDIy",
      },
      {
        name: "Enterprise",
        price: "Negotiable",
        period: "",
        description: "Empower your study center with AI teacher assistant",
        features: [
          "Everything in Pro plan",
          "AI teacher assistant - <a href='https://app.lexico.uz/' target='_blank' rel='noopener noreferrer'><b>try</b></a>",
          "Branded telegram bot",
          "Student academic progress",
          "Accounts with multiple roles (i.e. teachers, managers etc.)",
        ],
        cta: "Book discovery hour",
        popular: false,
        comments: "",
        link: "https://t.me/m/86rEuvWvNDIy",
      },
    ];
  }, [frequency]);

  return (
    <section id="pricing" className="py-10 md:py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div
          className="text-center mb-16"
          data-aos="fade-down"
          data-aos-delay="200"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your team. Start free and scale as you
            grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, index) => (
            <Card
              data-aos="zoom-out"
              data-aos-delay="200"
              key={index}
              className={`relative group hover:shadow-xl transition-all duration-300 w-full ${
                plan.popular
                  ? "border-1 border-purple-500 shadow-lg md:scale-105"
                  : "border-gray-200 hover:border-purple-200"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1">
                  Most Popular
                </Badge>
              )}

              <CardHeader className="text-center pb-4 md:pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </CardTitle>
                <div className="flex justify-center w-full py-2">
                  {plan.popular && (
                    <Tabs
                      className=""
                      defaultValue={frequency}
                      onValueChange={setFrequency}
                    >
                      <TabsList>
                        <TabsTrigger
                          className="p-1 text-[12px]"
                          value="monthly"
                        >
                          Monthly
                        </TabsTrigger>
                        <TabsTrigger value="yearly" className="p-1 text-[12px]">
                          Yearly
                          <Badge variant="secondary">16.7% off</Badge>
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  )}
                </div>
                <div className="flex items-baseline justify-center">
                  {typeof plan.price == "number" ? (
                    <>
                      <NumberFlow
                        value={plan.price}
                        format={{
                          notation: "compact",
                          maximumFractionDigits: 0,
                        }}
                        className="text-4xl md:text-5xl font-bold text-gray-900"
                      />
                      <span className="text-2xl font-bold text-gray-900 ml-1">
                        UZS
                      </span>
                    </>
                  ) : (
                    <span className="text-4xl md:text-5xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                  )}

                  {plan.period && (
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                  )}
                </div>

                <p className="text-gray-600">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0 h-full flex flex-col justify-between">
                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <span className="text-green-500 text-lg">✓</span>
                      <span
                        className="text-gray-700"
                        dangerouslySetInnerHTML={{ __html: feature }}
                      />
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div>
                  {plan.comments.length > 0 && (
                    <p className="text-[#111] text-[12px] mb-2">
                      {plan.comments}
                    </p>
                  )}
                  <Link href={plan.link} target="__blank">
                    <Button
                      className={`w-full cursor-pointer ${
                        plan.popular
                          ? "bg-gradient-to-r from-[#97F6F6] to-[#1DFCC8] hover:bg-purple-700 text-[#111] "
                          : "bg-white border-1 border-purple-600 text-purple-600 hover:bg-purple-50"
                      }`}
                      size="lg"
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        {/* <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Can I change plans anytime?
              </h4>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes
                take effect immediately.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Is there a free trial?
              </h4>
              <p className="text-gray-600">
                Yes, all paid plans come with a 14-day free trial. No credit
                card required.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h4>
              <p className="text-gray-600">
                We accept all major credit cards, and bank transfers for
                enterprise plans.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Do you offer refunds?
              </h4>
              <p className="text-gray-600">
                Yes, we offer a 30-day money-back guarantee for all paid plans.
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
