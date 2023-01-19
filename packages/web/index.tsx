import React from 'react'
import { Hello } from '@test/ui'
import { add } from '@test/utils'
import ReactDOM from 'react-dom'

import { Interface } from "@test/utils";

export class Consumer extends Interface {
  name: string;

  constructor(a: string) {
    super();
    this.name = a;
  }

  helloWorld(): string {
    const demo = `hello i'm consumer ${this.name}`;
    console.log(demo);
    return demo;
  }
}

export const App = () => {
  return (
    <div>
      <Hello />
      <br />
      {add(1, 2)}
      <br />
      {new Consumer("consumer-name").helloWorld()}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
