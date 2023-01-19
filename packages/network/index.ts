// @ts-ignore
import Websockets from 'libp2p-websockets';
// @ts-ignore
import Mplex from 'libp2p-mplex';
import Lib2p2Peer from 'libp2p';
import PeerId from 'peer-id';
import type { MultiaddrInput } from 'multiaddr';
import { Multiaddr } from 'multiaddr';

export interface FluenceConnectionOptions {
    /**
     * Peer id of the Fluence Peer
     */
    peerId: PeerId;

    /**
     * Multiaddress of the relay to make connection to
     */
    relayAddress: MultiaddrInput;

    /**
     * The dialing timeout in milliseconds
     */
    dialTimeoutMs?: number;
}

export class RelayConnection {
    static async createConnection(options: FluenceConnectionOptions): Promise<RelayConnection> {
        const transportKey = Websockets.prototype[Symbol.toStringTag];
        const lib2p2Peer = await Lib2p2Peer.create({
            peerId: options.peerId,
            modules: {
                transport: [Websockets],
                streamMuxer: [Mplex],
                connEncryption: [],
            },
            config: {
                transport: {
                    [transportKey]: { },
                },
            },
            dialer: {
                dialTimeout: options?.dialTimeoutMs,
            },
        });

        const relayMultiaddr = new Multiaddr(options.relayAddress);
        const relayPeerId = relayMultiaddr.getPeerId();
        if (relayPeerId === null) {
            throw new Error('Specified multiaddr is invalid or missing peer id: ' + options.relayAddress);
        }

        return new RelayConnection();
    }

}