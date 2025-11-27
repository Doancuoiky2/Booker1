import { faHouse } from '@fortawesome/free-solid-svg-icons';
import './Breadcrumb.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Breadcrumb = ({ paths = [] }) => {
  return (
    <div className="breadcrumb">
      <FontAwesomeIcon icon={faHouse} className="mr-2" />
      {paths.map((path, index) => (
        <div key={index} className="breadcrumbItem">
          <span className="breadcrumbItemSpace">/</span>
          <span
            className={`${
              index === paths.length - 1 ? "font-semibold" : "opacity-90"
            }`}
          >
            {path}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
