"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CoffeeIcon, BrainCircuitIcon, RocketIcon, ThumbsUpIcon, KeyIcon } from "lucide-react"

export default function GuidePage() {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "Welcome to Quant Intern!",
      content:
        "Imagine having a financial whiz kid as your personal intern, but without the coffee runs and awkward small talk. That's Quant Intern for you!",
      icon: <CoffeeIcon className="w-12 h-12 text-[#400090]" />,
    },
    {
      title: "Step 0: The Secret Handshake (API Key)",
      content:
        "First things first, you'll need to whisper the secret password (aka your OpenAI API key). Don't worry, we're not eavesdropping - it's stored locally in your browser!",
      icon: <KeyIcon className="w-12 h-12 text-[#400090]" />,
    },
    {
      title: "Step 1: Choose Your Financial Victim... Er, Subject!",
      content:
        "Type in a stock symbol like you're casting a spell. 'AAPL' for Apple, 'GOOGL' for Google, or 'MOON' if you're feeling particularly optimistic.",
      icon: <BrainCircuitIcon className="w-12 h-12 text-[#400090]" />,
    },
    {
      title: "Step 2: Unleash the AI Kraken!",
      content:
        "Hit that 'Analyze' button and watch as our AI crunches numbers faster than you can say 'stock market crash'. It's like having a crystal ball, but with more decimals.",
      icon: <RocketIcon className="w-12 h-12 text-[#400090]" />,
    },
    {
      title: "Step 3: Interpret the Tea Leaves",
      content:
        "Read the AI analysis. If it says 'To the moon! 🚀', maybe wait for a second opinion. If it says 'Abandon ship! 🏴‍☠️', well... you probably didn't hear it from us.",
      icon: <ThumbsUpIcon className="w-12 h-12 text-[#400090]" />,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="flex items-center text-[#400090] hover:underline mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold text-center text-[#400090] mb-12">
          The Not-So-Serious Guide to Quant Intern
        </h1>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`transition-opacity duration-500 ${
                  currentStep === index ? "opacity-100" : "opacity-0 hidden"
                }`}
              >
                <div className="flex items-center justify-center mb-6">{step.icon}</div>
                <h2 className="text-2xl font-semibold text-[#400090] mb-4">{step.title}</h2>
                <p className="text-gray-600 mb-6">{step.content}</p>
              </div>
            ))}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
                className="px-4 py-2 bg-[#400090] text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
                disabled={currentStep === steps.length - 1}
                className="px-4 py-2 bg-[#400090] text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === steps.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        </div>
        {currentStep === steps.length - 1 && (
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Congratulations! You're now ready to lose mone... I mean, make informed financial decisions!
            </p>
            <Link href="/" className="text-[#400090] hover:underline">
              Return to the dashboard and start your journey to financial... something!
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

