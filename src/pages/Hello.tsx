import * as React from "react"

interface Props {
  name: string
}

function Hello(props: Props): JSX.Element {
  return <div className="hello">Hello {props.name}</div>
}

export default Hello
