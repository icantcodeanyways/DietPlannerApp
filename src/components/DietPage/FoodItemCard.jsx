import { Card } from "react-bootstrap";
import "./FoodItemCard.css"
function FoodItemCard({ diet }) {
  console.log(diet);
  return (
    <div className="p-3">
      <Card>
        <Card.Img className="card-img" variant="top" src={diet.image} />
        <Card.Body className="card-body">
          <Card.Title className="pb-2 fw-bold">
            {diet.item.replace(/\b\w/g, (c) => c.toUpperCase())}
          </Card.Title>
          <Card.Text className="fw-bold">
            Quantity : {diet.quantity.toFixed(3)} g
          </Card.Text>
          <Card.Text className="text">Carbs per gram : {diet.carbs.toFixed(3)}</Card.Text>
          <Card.Text className="text">Fat per gram : {diet.fat.toFixed(3)}</Card.Text>
          <Card.Text className="text">Protien per gram : {diet.protien.toFixed(3)}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default FoodItemCard;
