import { encode } from 'it-length-prefixed'
import { pipe } from 'it-pipe'
import { createLibp2p } from 'libp2p'
// @ts-ignore
import Mplex from 'libp2p-mplex'
// @ts-ignore
import Websockets from 'libp2p-websockets'
// @ts-ignore
import { all as allow_all } from 'libp2p-websockets/src/filters'

import { Noise } from '@chainsafe/libp2p-noise'
import { krasnodar } from '@fluencelabs/fluence-network-environment'
import { createPeerId } from '@libp2p/peer-id'
import { Multiaddr } from '@multiformats/multiaddr'

export const PROTOCOL_NAME = '/fluence/particle/2.0.0'

export const testLibp2p = async () => {
  const transportKey = Websockets.prototype[Symbol.toStringTag]
  const peerId = await PeerId.create({ keyType: 'Ed25519' })
  const lib2p2Peer = await createLibp2p({
    peerId,
    modules: {
      transport: [Websockets],
      streamMuxer: [Mplex],
      connEncryption: [new Noise()],
    },
    config: {
      transport: {
        [transportKey]: {
          filter: allow_all,
        },
      },
    },
  })

  const addr = krasnodar[3]
  const relayAddress = new Multiaddr(addr.multiaddr)

  await lib2p2Peer.start()
  await lib2p2Peer.dial(relayAddress)

  const conn = await lib2p2Peer.dialProtocol(relayAddress, PROTOCOL_NAME)
  const sink = conn.stream.sink

  pipe(
    // force new line
    [Buffer.from('incorrect particle, just try to send something', 'utf8')],
    encode(),
    sink,
  )
}
