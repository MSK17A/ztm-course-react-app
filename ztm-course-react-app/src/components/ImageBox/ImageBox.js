import React from "react";
import "./ImageBox.css";

class ImageBox extends React.Component {


    render() {
        const { imageUrl, bounding_boxes } = this.props;

        const boxes_draw = (bounding_boxes) => {
            var indents = [];

            for (var bbox = 0; bbox < bounding_boxes.length; bbox++) {
                indents.push(<div
                    key={bbox}
                    className='bounding-box'
                    style={
                        { left: bounding_boxes[bbox].left_col, top: bounding_boxes[bbox].top_row, right: bounding_boxes[bbox].right_col, bottom: bounding_boxes[bbox].bottom_row }
                    }>
                </div>);
            }
            return indents;
        }

        return (
            <div className='center ma'>
                <div className='absolute ma2'>
                    <img id='inputImage' className='FacesImg' src={imageUrl} alt='Kawaii' />
                    {
                        /*<div
                            className='bounding-box'
                            style={
                                { left: bounding_boxes[box_id].left_col, top: bounding_boxes[box_id].top_row, right: bounding_boxes[box_id].right_col, bottom: bounding_boxes[box_id].bottom_row }
                            }>
                        </div>*/
                        boxes_draw(bounding_boxes)
                    }
                </div>
            </div>

        )
    }
}

export default ImageBox;