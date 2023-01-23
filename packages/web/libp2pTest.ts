import { encode } from 'it-length-prefixed'
import { pipe } from 'it-pipe'
import { createLibp2p } from 'libp2p'

import { noise } from '@chainsafe/libp2p-noise'
import { krasnodar } from '@fluencelabs/fluence-network-environment'
import { mplex } from '@libp2p/mplex'
import { createEd25519PeerId } from '@libp2p/peer-id-factory'
import { webSockets } from '@libp2p/websockets'
import { all } from '@libp2p/websockets/filters'
import { multiaddr } from '@multiformats/multiaddr'

export const PROTOCOL_NAME = '/fluence/particle/2.0.0'

export const testLibp2p = async () => {
  const peerId = await createEd25519PeerId()
  const lib2p2Peer = await createLibp2p({
    peerId,
    transports: [
      webSockets({
        filter: all,
      }),
    ],
    streamMuxers: [mplex],
    connectionEncryption: [noise],

    // config: {
    //  transport: {
    //    [transportKey]: {
    //      filter: allow_all,
    //    },
    //  },
    // },
  })

  const addr = krasnodar[3]
  const relayAddress = multiaddr(addr.multiaddr)

  await lib2p2Peer.start()
  await lib2p2Peer.dial(relayAddress)

  const stream = await lib2p2Peer.dialProtocol(relayAddress, PROTOCOL_NAME)
  const sink = stream.sink

  pipe(
    // force new line
    [Buffer.from('incorrect particle, just try to send something', 'utf8')],
    encode(),
    sink,
  )
}
