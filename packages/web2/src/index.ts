import log from 'loglevel'

import { Fluence } from '@fluencelabs/fluence'
import { krasnodar } from '@fluencelabs/fluence-network-environment'
import { checkConnection } from '@fluencelabs/fluence/dist/internal/utils'

// import { testLibp2p } from './libp2pTest'

// export const nodes = [
//   {
//     multiaddr:
//        '/ip4/127.0.0.1/tcp/4310/ws/p2p/12D3KooWKEprYXUXqoV5xSBeyqrWLpQLLH4PXfvVkDJtmcqmh5V3',
//       // '/ip4/127.0.0.1/tcp/4310/ws/p2p/12D3KooWEc4rWf38ZHDqbArm1vFiVwc9wDooBdmbGhwzRRhsZnEN',
//     peerId: '12D3KooWKEprYXUXqoV5xSBeyqrWLpQLLH4PXfvVkDJtmcqmh5V3',
//   },
// ]

log.setLevel('error')

const nodes = krasnodar

const init = async () => {
  await Fluence.start({
    connectTo: nodes[0],
  })

  if (await checkConnection(Fluence.getPeer())) {
    alert('Ohmy! I actually recieved a response from the node!!!')
  }
}

// @ts-ignore
window.init = init
