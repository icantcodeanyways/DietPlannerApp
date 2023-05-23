import { Card } from "react-bootstrap";

function FoodItemCard({ diet }) {
  console.log(diet);
  return (
    <div className="col-md-4 p-3">
      <Card>
        <Card.Img variant="top" src={diet.image} />
        <Card.Body>
          <Card.Title>{diet.item}</Card.Title>
          <Card.Text>Quantity : {diet.quantity.toFixed(3)}</Card.Text>
          <Card.Text>Carbs per gram : {diet.carbs.toFixed(3)}</Card.Text>
          <Card.Text>Fat per gram : {diet.fat.toFixed(3)}</Card.Text>
          <Card.Text>Protien per gram : {diet.protien.toFixed(3)}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default FoodItemCard;
