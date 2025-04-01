import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import TarotReadingLayout from '../components/TarotReadingLayout';
import ReadingResult from '../components/ReadingResult';
import { getAllCards, createReading, getAIInterpretation } from '../services/tarotAPI';
import { fadeIn } from '../../../shared/animations/fade';
import AppLayout from '../../../shared/layouts/AppLayout';

/**
 * Trang hiển thị trải bài Tarot
 */
const TarotReadingPage = () => {
  const navigate = useNavigate();
  const { type = 'three-card' } = useParams();
  
  // States
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [question, setQuestion] = useState('');
  const [loadingCards, setLoadingCards] = useState(true);
  const [readingCompleted, setReadingCompleted] = useState(false);
  const [readingResult, setReadingResult] = useState(null);
  const [interpretation, setInterpretation] = useState(null);
  const [loadingReading, setLoadingReading] = useState(false);
  
  // Fetch cards on mount
  useEffect(() => {
    let isActive = true;
    
    const fetchCards = async () => {
      try {
        setLoadingCards(true);
        const allCards = await getAllCards();
        
        if (isActive && allCards) {
          // Shuffle cards initially
          const shuffled = [...allCards].sort(() => 0.5 - Math.random());
          setCards(shuffled);
        }
      } catch (error) {
        console.error('Error fetching cards:', error);
        // Set default empty array if fetching fails
        if (isActive) {
          setCards([]);
        }
      } finally {
        if (isActive) {
          setLoadingCards(false);
        }
      }
    };
    
    fetchCards();
    
    return () => {
      isActive = false;
    };
  }, []);
  
  // Card selection handler
  const handleCardSelect = (card) => {
    if (!card) return;
    
    // Check if card is already selected
    if (selectedCards && selectedCards.some(selected => selected && selected.id === card.id)) {
      return;
    }
    
    // Get number of cards to select based on reading type
    let cardLimit = 3;
    switch (type) {
      case 'three-card':
        cardLimit = 3;
        break;
      case 'celtic-cross':
        cardLimit = 10;
        break;
      case 'love':
      case 'career':
        cardLimit = 5;
        break;
      case 'daily':
        cardLimit = 1;
        break;
      default:
        cardLimit = 3;
    }
    
    // Add card to selected cards if not at limit
    if (selectedCards && Array.isArray(selectedCards) && selectedCards.length < cardLimit) {
      setSelectedCards([...selectedCards, card]);
    }
  };
  
  // Clear selection handler
  const handleClearSelection = () => {
    setSelectedCards([]);
  };
  
  // Shuffle cards handler
  const handleShuffleCards = () => {
    if (!cards || !Array.isArray(cards)) return;
    
    const shuffled = [...cards].sort(() => 0.5 - Math.random());
    setCards(shuffled);
    
    // Clear selection when shuffling
    setSelectedCards([]);
  };
  
  // Complete reading handler
  const handleCompleteReading = async () => {
    if (!selectedCards || !Array.isArray(selectedCards) || selectedCards.length === 0) {
      return;
    }
    
    try {
      setLoadingReading(true);
      
      // Create reading
      const reading = await createReading({
        readingType: type,
        numCards: selectedCards.length,
        question: question || undefined
      });
      
      // Get AI interpretation if reading was created successfully
      if (reading && reading.cards && Array.isArray(reading.cards)) {
        const aiInterpretation = await getAIInterpretation(
          reading.cards,
          question,
          type
        );
        
        setReadingResult(reading);
        setInterpretation(aiInterpretation);
        setReadingCompleted(true);
      } else {
        throw new Error('Failed to create reading');
      }
    } catch (error) {
      console.error('Error completing reading:', error);
      // If there's an error, still try to display the selected cards as a reading
      setReadingResult({
        readingType: type,
        cards: selectedCards,
        question,
        createdAt: new Date().toISOString()
      });
      setReadingCompleted(true);
    } finally {
      setLoadingReading(false);
    }
  };
  
  // Save reading handler
  const handleSaveReading = () => {
    // Save reading logic here
    alert('Chức năng này sẽ được cập nhật trong phiên bản tiếp theo!');
  };
  
  // Share reading handler
  const handleShareReading = () => {
    // Share reading logic here
    alert('Chức năng này sẽ được cập nhật trong phiên bản tiếp theo!');
  };
  
  // Start new reading handler
  const handleStartNewReading = () => {
    setReadingCompleted(false);
    setReadingResult(null);
    setInterpretation(null);
    setSelectedCards([]);
    handleShuffleCards();
  };
  
  return (
    <AppLayout>
      <motion.div 
        className="container mx-auto px-4 py-8"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="max-w-5xl mx-auto">
          {!readingCompleted ? (
            <TarotReadingLayout
              cards={cards}
              readingType={type}
              selectedCards={selectedCards}
              onCardSelect={handleCardSelect}
              onClearSelection={handleClearSelection}
              onShuffleCards={handleShuffleCards}
              onCompleteReading={handleCompleteReading}
              question={question}
              setQuestion={setQuestion}
              isLoading={loadingCards || loadingReading}
            />
          ) : (
            <ReadingResult
              reading={readingResult}
              interpretation={interpretation}
              isLoading={loadingReading}
              onSave={handleSaveReading}
              onShareClick={handleShareReading}
            />
          )}
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default TarotReadingPage; 