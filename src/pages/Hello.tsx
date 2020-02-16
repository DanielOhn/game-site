import * as React from "react"

function Hello(props: {name: string}): JSX.Element {
  return <div className="hello">Hello {props.name}</div>
}

export default Hello
