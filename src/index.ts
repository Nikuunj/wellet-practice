import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";

const mnemonic = generateMnemonic(128);
console.log("Generated Mnemonic:", mnemonic);

const seed = mnemonicToSeedSync(mnemonic);

const hexSeed = seed.toString('hex');

// path 1
const path = `m/44'/501'/0'/0'`
const deriveSeed = derivePath(path, hexSeed).key;
const secret = nacl.sign.keyPair.fromSeed(deriveSeed).secretKey;
const publicKey = Keypair.fromSecretKey(secret).publicKey;

// path 2
const path2 = `m/44'/501'/1'/0'`
const deriveSeed2 = derivePath(path2, hexSeed).key;
const secret2 = nacl.sign.keyPair.fromSeed(deriveSeed2).secretKey;
const publicKey2 = Keypair.fromSecretKey(secret2).publicKey;

const message = new TextEncoder().encode("hello world");

const signature = nacl.sign.detached(message, secret);
const signature2 = nacl.sign.detached(message, secret2);

// all value are in Uint8
const result = nacl.sign.detached.verify(
    message,
    signature2,
    publicKey.toBytes()
) // false becuse it sign by secret2 and here verify by public 1

const result2 = nacl.sign.detached.verify(
    message,
    signature2,
    publicKey2.toBytes()
) // true sign by secret2 abd verfiy by public 2
console.log(result);

console.log(result2)