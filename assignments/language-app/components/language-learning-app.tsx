"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Brain } from "lucide-react"

// Mock data for flashcards and quiz questions
const flashcards = [
  { id: 1, front: "Bonjour", back: "Hello" },
  { id: 2, front: "Merci", back: "Thank you" },
  { id: 3, front: "Au revoir", back: "Goodbye" },
]

const quizQuestions = [
  {
    id: 1,
    question: "How do you say 'Hello' in French?",
    options: ["Bonjour", "Merci", "Au revoir", "S'il vous plaît"],
    correctAnswer: "Bonjour",
  },
  {
    id: 2,
    question: "What does 'Merci' mean?",
    options: ["Hello", "Thank you", "Goodbye", "Please"],
    correctAnswer: "Thank you",
  },
  {
    id: 3,
    question: "How do you say 'Goodbye' in French?",
    options: ["Bonjour", "Merci", "Au revoir", "S'il vous plaît"],
    correctAnswer: "Au revoir",
  },
]

function Flashcards() {
  const [currentCard, setCurrentCard] = useState(0)
  const [showBack, setShowBack] = useState(false)

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length)
    setShowBack(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-semibold">Flashcards</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6 p-6">
        <div
          className="w-full h-56 flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 text-white cursor-pointer rounded-lg shadow-lg transition-transform transform hover:rotate-y-180"
          onClick={() => setShowBack(!showBack)}
        >
          <p className="text-3xl font-bold text-center">
            {showBack ? flashcards[currentCard].back : flashcards[currentCard].front}
          </p>
        </div>
        <Button variant="gradient" onClick={nextCard}>
          Next Card
        </Button>
      </CardContent>
    </Card>
  )
}
function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (answer: string) => {
    if (answer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setShowResult(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-md rounded-lg">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-semibold">Quiz</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {showResult ? (
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Quiz Completed!</h2>
            <p className="text-xl font-semibold">
              Your score: {score} out of {quizQuestions.length}
            </p>
            <Button variant="gradient" size="lg" onClick={resetQuiz}>
              Restart Quiz
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">
              {quizQuestions[currentQuestion].question}
            </h2>
            <div className="space-y-3">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  className="w-full justify-start bg-gray-100 text-black hover:bg-gray-200"
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function LanguageLearningApp() {
  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen flex flex-col items-center justify-center space-y-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">Language Learning App</h1>
      <Tabs defaultValue="flashcards" className="w-full max-w-lg">
        <TabsList className="grid w-full grid-cols-2 bg-white rounded-lg shadow-md p-1">
          <TabsTrigger value="flashcards" className="text-blue-500 hover:bg-blue-100 rounded-lg">
            <BookOpen className="mr-2 h-5 w-5" />
            Flashcards
          </TabsTrigger>
          <TabsTrigger value="quiz" className="text-blue-500 hover:bg-blue-100 rounded-lg">
            <Brain className="mr-2 h-5 w-5" />
            Quiz
          </TabsTrigger>
        </TabsList>
        <TabsContent value="flashcards">
          <Flashcards />
        </TabsContent>
        <TabsContent value="quiz">
          <Quiz />
        </TabsContent>
      </Tabs>
    </div>
  )
}
