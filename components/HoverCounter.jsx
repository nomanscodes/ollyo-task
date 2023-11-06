/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import withCounter from "../hoc/withCounter"
const HoverCounter = (props) => {

  const {count,setCount}=props

  return (
    <div>
     <h1 onMouseOver={()=> setCount(count+1)}>Hover {count} times count</h1>
    </div>
  )
}

const HoverCounterNew = withCounter(HoverCounter);

export default HoverCounterNew
