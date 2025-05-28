import { useState } from 'react';

export default function App() {
  const [showTest, setShowTest] = useState(false);

  // Dados do produto
  const product = {
    name: "Teste de TDAH Completo",
    description: "Responda perguntas detalhadas e receba uma análise sobre possíveis sintomas de TDAH.",
    price: "R$14,99",
    image: "https://picsum.photos/800/600 "
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 font-sans text-gray-800">
      {!showTest ? (
        <LandingPage product={product} onPay={() => setShowTest(true)} />
      ) : (
        <ADHDTest onBack={() => setShowTest(false)} />
      )}
    </div>
  );
}

// Capa inicial com botão de compra
function LandingPage({ product, onPay }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      alert("Pagamento simulado com sucesso!");
      setLoading(false);
      onPay();
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full mx-auto transform transition-all hover:shadow-xl duration-300">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="p-10 md:w-1/2 bg-gradient-to-br from-indigo-50 to-blue-50">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-lg text-gray-700 mb-6">{product.description}</p>

            <div className="mb-8">
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                {product.price}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className={`w-full text-white font-bold py-4 px-6 rounded-xl text-lg shadow-lg transform transition-all duration-300 ${
                loading
                  ? 'bg-indigo-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:scale-[1.02]'
              }`}
            >
              {loading ? 'Processando...' : 'Pagar e Fazer o Teste'}
            </button>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Pagamento seguro via Stripe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente do teste TDAH
function ADHDTest({ onBack }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);

  const questions = [
    {
      id: 1,
      text: "Você frequentemente tem dificuldade para prestar atenção em detalhes ou comete erros por descuido?",
      options: ["Nunca", "Às vezes", "Frequentemente", "Muitas vezes"],
    },
    {
      id: 2,
      text: "Você frequentemente tem dificuldade para manter a atenção em tarefas ou atividades?",
      options: ["Nunca", "Às vezes", "Frequentemente", "Muitas vezes"],
    },
    {
      id: 3,
      text: "Você frequentemente não escuta quando alguém lhe fala diretamente?",
      options: ["Nunca", "Às vezes", "Frequentemente", "Muitas vezes"],
    },
    {
      id: 4,
      text: "Você frequentemente não segue instruções até o fim e não termina tarefas escolares, domésticas ou profissionais?",
      options: ["Nunca", "Às vezes", "Frequentemente", "Muitas vezes"],
    },
    {
      id: 5,
      text: "Você frequentemente tem dificuldade para organizar tarefas e atividades?",
      options: ["Nunca", "Às vezes", "Frequentemente", "Muitas vezes"],
    },
    {
      id: 6,
      text: "Você frequentemente evita, sente aversão ou reluta em envolver-se em tarefas que exigem esforço mental contínuo?",
      options: ["Nunca", "Às vezes", "Frequentemente", "Muitas vezes"],
    },
    {
      id: 7,
      text: "Você frequentemente perde objetos necessários para tarefas ou atividades?",
      options: ["Nunca", "Às vezes", "Frequentemente", "Muitas vezes"],
    },
    {
      id: 8,
      text: "Você é frequentemente facilmente distraído por estímulos externos?",
      options: ["Nunca", "Às vezes", "Frequentemente", "Muitas vezes"],
    },
    {
      id: 9,
      text: "Você frequentemente esquece atividades diárias?",
      options: ["Nunca", "Às vezes", "Frequentemente", "Muitas vezes"],
    },
    {
      id: 10,
      text: "Você frequentemente se agita com as mãos ou os pés, ou se remexe na cadeira?",
      options: ["Nunca", "Às vezes", "Frequentemente", "Muitas vezes"],
    }
  ];

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const nextQuestion = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTest();
    }
  };

  const prevQuestion = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeTest = () => {
    setCompleted(true);
  };

  const resetTest = () => {
    setCurrentStep(0);
    setAnswers({});
    setCompleted(false);
  };

  const calculateScore = () => {
    let score = 0;
    Object.values(answers).forEach(answer => {
      switch (answer) {
        case "Nunca": score += 0; break;
        case "Às vezes": score += 1; break;
        case "Frequentemente": score += 2; break;
        case "Muitas vezes": score += 3; break;
        default: score += 0;
      }
    });
    return score;
  };

  const getInterpretation = (score) => {
    if (score <= 10) {
      return "Poucos sintomas. Provavelmente você não tem TDAH.";
    } else if (score <= 20) {
      return "Alguns sintomas de TDAH. Recomenda-se uma avaliação mais detalhada por um profissional.";
    } else if (score <= 25) {
      return "Sintomas significativos de TDAH. Recomenda-se fortemente consultar um especialista.";
    } else {
      return "Sintomas elevados de TDAH. É muito importante buscar orientação profissional.";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white relative">
          <button
            onClick={onBack}
            className="absolute left-6 top-6 text-white hover:text-indigo-100 transition-colors"
          >
            ← Voltar
          </button>
          <h1 className="text-2xl font-bold">Autoavaliação de TDAH</h1>
          <p className="mt-1 text-indigo-100">Responda às perguntas com base nos seus sintomas recentes</p>
        </div>

        {!completed ? (
          <div className="p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-500">Pergunta {currentStep + 1} de {questions.length}</span>
                <div className="w-24 bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${((currentStep + 1) / questions.length * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-100">
                <p className="text-lg text-gray-800 font-medium leading-relaxed">{questions[currentStep].text}</p>
              </div>
            </div>

            <div className="space-y-3 mt-6">
              {questions[currentStep].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerChange(questions[currentStep].id, option)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 transform hover:translate-x-1 hover:shadow-md ${
                    answers[questions[currentStep].id] === option
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-800 ring-2 ring-indigo-200'
                      : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={prevQuestion}
                disabled={currentStep === 0}
                className={`px-5 py-2 rounded-lg ${
                  currentStep === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Anterior
              </button>
              
              <button
                onClick={nextQuestion}
                disabled={!answers[questions[currentStep].id]}
                className={`px-5 py-2 rounded-lg font-semibold ${
                  !answers[questions[currentStep].id]
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                }`}
              >
                {currentStep === questions.length - 1 ? 'Finalizar' : 'Próxima'}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4 shadow-md">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Teste concluído!</h2>
              <p className="text-gray-600">Agora vamos analisar seus resultados.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl mb-6 shadow-inner">
              <h3 className="font-semibold text-gray-800 text-lg mb-4">Resultados:</h3>
              
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Pontuação total</span>
                  <span className="text-sm font-medium text-gray-700">{calculateScore()} pontos</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full"
                    style={{ width: `${Math.min((calculateScore() / 30) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                <h4 className="font-semibold text-indigo-800 mb-2">Interpretação:</h4>
                <p className="text-indigo-700">{getInterpretation(calculateScore())}</p>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-yellow-800 mb-2">Importante:</h3>
              <p className="text-yellow-700 text-sm">
                Este teste é apenas uma autoavaliação inicial e não substitui uma avaliação profissional.
                O diagnóstico definitivo de TDAH deve ser feito por um médico psiquiatra ou neuropsicólogo qualificado.
              </p>
            </div>

            <button
              onClick={resetTest}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-transform duration-300 transform hover:scale-105"
            >
              Refazer Teste
            </button>
          </div>
        )}

        <div className="bg-gray-50 px-6 py-4 text-center text-sm text-gray-500">
          <p>Este teste é apenas para fins educativos e informativos.</p>
        </div>
      </div>
    </div>
  );
}
