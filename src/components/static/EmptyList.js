import "./EmptyList.css";

 export default function EmptyList({ itemType }) {
  return (
    <div id="emptyList">
      <div>No { itemType }'s...</div>
    </div>
  );
 }