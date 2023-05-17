import React, { useState } from 'react';
import './DietBox.css';
import { Button, Container, Card, Form } from 'react-bootstrap';

function DietBox() {
  const [showRecommend, setShowRecommend] = useState(false);
  const [showLogFood, setShowLogFood] = useState(false);
  const [showCustomMeal, setShowCustomMeal] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);

  const handleRecommendClick = () => {
    setShowRecommend(true);
    setShowLogFood(false);
    setShowCustomMeal(false);
  };

  const handleLogFoodClick = () => {
    setShowRecommend(false);
    setShowLogFood(true);
    setShowCustomMeal(false);
  };

  const handleCustomMealClick = () => {
    setShowRecommend(false);
    setShowLogFood(false);
    setShowCustomMeal(true);
  };

  const handleCardSelect = (cardId) => {
    if (selectedCards.includes(cardId)) {
      setSelectedCards(selectedCards.filter((id) => id !== cardId));
    } else {
      setSelectedCards([...selectedCards, cardId]);
    }
  };

  const handleSearch = () => {
    // Perform search logic
  };

  const renderCards = () => {
    const cardCount = 10;
    const cardsPerRowMedium = 5;
    const cardRows = [];

    let currentRow = [];
    for (let i = 0; i < cardCount; i++) {
      const cardId = `card-${i + 1}`;
      const isSelected = selectedCards.includes(cardId);

      currentRow.push(
        <Card key={cardId} className={`diet-card ${isSelected ? 'selected' : ''}`}>
          <Card.Body>
            <div className="card-content">
              <Form.Check
                type="checkbox"
                label={`Card ${i + 1}`}
                checked={isSelected}
                onChange={() => handleCardSelect(cardId)}
              />
              {/* Add additional content within the card */}
              <p>Card content </p>
            </div>
            <div className="card-footer">
              {/* Add additional footer content within the card */}
              <p>Footer </p>
            </div>
          </Card.Body>
        </Card>
      );

      if (currentRow.length === cardsPerRowMedium || i === cardCount - 1) {
        cardRows.push(
          <div key={i} className="card-row">
            {currentRow}
          </div>
        );
        currentRow = [];
      }
    }

    return cardRows;
  };

  return (
    <div className="DietBox col-lg-10 col-sm container-fluid">
      <div className="button-container">
        <Button variant="outline-primary" style={{ marginRight: '10px' }} onClick={handleRecommendClick}>
          Recommend
        </Button>
        <Button variant="outline-success" style={{ marginRight: '10px' }} onClick={handleLogFoodClick}>
          Log Food
        </Button>
        <Button variant="outline-success" style={{ marginRight: '10px' }} onClick={handleCustomMealClick}>
          Custom Meal
        </Button>
      </div>
      {showRecommend && (
        <Container className="pop-up-container">
          <h3>Recommend</h3>
          <div className="card-container">{renderCards()}</div>
          <Button variant="outline-primary" className="recommend-button">
            Recommend
          </Button>
        </Container>
      )}
      {showLogFood && (
        <Container className="pop-up-container">
          <h3>Log Food</h3>
          <Form>
            <Form.Group>
              <Form.Control type="text" placeholder="Search for food..." />
            </Form.Group>
            <Button variant="outline-primary" onClick={handleSearch}>
              Search
            </Button>
          </Form>
        </Container>
      )}
      {showCustomMeal && (
        <Container className="pop-up-container">
          <h3>Custom Meal</h3>
          <Form>
            <Form.Group>
              <Form.Control type="text" placeholder="Search for ingredients..." />
            </Form.Group>
            <Button variant="outline-primary" onClick={handleSearch}>
              Search
            </Button>
          </Form>
        </Container>
      )}
    </div>
  );
}

export default DietBox;
