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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Flashcards</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div
          className="w-full h-48 flex items-center justify-center bg-secondary cursor-pointer"
          onClick={() => setShowBack(!showBack)}
        >
          <p className="text-2xl font-bold">
            {showBack ? flashcards[currentCard].back : flashcards[currentCard].front}
          </p>
        </div>
        <Button onClick={nextCard}>Next Card</Button>
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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Quiz</CardTitle>
      </CardHeader>
      <CardContent>
        {showResult ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
            <p className="text-xl mb-4">
              Your score: {score} out of {quizQuestions.length}
            </p>
            <Button onClick={resetQuiz}>Restart Quiz</Button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-4">{quizQuestions[currentQuestion].question}</h2>
            <div className="space-y-2">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  className="w-full justify-start"
                  variant="outline"
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Language Learning App</h1>
      <Tabs defaultValue="flashcards" className="w-full max-w-md mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="flashcards">
            <BookOpen className="mr-2 h-4 w-4" />
            Flashcards
          </TabsTrigger>
          <TabsTrigger value="quiz">
            <Brain className="mr-2 h-4 w-4" />
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