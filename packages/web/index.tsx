import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

import { Fluence } from '@fluencelabs/fluence'
import { krasnodar } from '@fluencelabs/fluence-network-environment'
import { checkConnection } from '@fluencelabs/fluence/dist/internal/utils'
import { Hello } from '@test/ui'
import { add } from '@test/utils'
import { Interface } from '@test/utils'

// import { testLibp2p } from './libp2pTest'

export const nodes = [
  {
    multiaddr:
      '/ip4/127.0.0.1/tcp/4310/ws/p2p/12D3KooWKEprYXUXqoV5xSBeyqrWLpQLLH4PXfvVkDJtmcqmh5V3',
    peerId: '12D3KooWKEprYXUXqoV5xSBeyqrWLpQLLH4PXfvVkDJtmcqmh5V3',
  },
]

// const nodes = krasnodar;

export class Consumer extends Interface {
  name: string

  constructor(a: string) {
    super()
    this.name = a
  }

  helloWorld(): string {
    const demo = `hello i'm consumer ${this.name}`
    console.log(demo)
    return demo
  }
}

const init = async () => {
  await Fluence.start({
    connectTo: nodes[0],
  })

  if (await checkConnection(Fluence.getPeer())) {
    alert('yaaay! im working')
  }
}

export const App = () => {
  useEffect(() => {
    init()
    // testLibp2p()
  })

  return (
    <div>
      <Hello />
      <br />
      {add(1, 2)}
      <br />
      {new Consumer('consumer-name').helloWorld()}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
