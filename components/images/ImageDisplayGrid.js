
import { DisplayImage } from './DisplayImage'

export const ImageDisplayGrid = (props) => {
  return (
    <div className="row row-cols-1 row-cols-md-4 g-4">
      {props.images.map((imageObject, index) => <DisplayImage key={index} image={imageObject} />)}
    </div>
  );
};
