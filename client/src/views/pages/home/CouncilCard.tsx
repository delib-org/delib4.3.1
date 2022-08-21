import { FC } from "react";
import { Link } from "react-router-dom";
import { Council } from "../../../features/council/councilModelC";

interface CouncilCardProps {
  council: Council;
}

const CouncilCard: FC<CouncilCardProps> = ({ council }) => {
  return (
    <div className="card">
      <Link to={`/council/${council._id}`}>
        <h3>{council.title}</h3>
      </Link>
    </div>
  );
};

export default CouncilCard;
