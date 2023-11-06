/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import withCounter from "../hoc/withCounter"

const ClickCounter = (props) => {

  return (
    <div>
       <h1 onClick={()=> props.setCount(props.count+1)}>Click {props.count} times</h1>
    </div>
  )
}

export default withCounter(ClickCounter) 
