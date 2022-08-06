import '../../style.css';

export default function Info() {
  return (
    <div className="info--card rounded--box shadow-1">
      <img src="../images/warehouse-1.jpg" alt="zone de stockage" />
      <div className="info--card__description">
        <div>Bien gérer son stock</div>
        <p>Voir l'article</p>
      </div>
    </div>
  );
}