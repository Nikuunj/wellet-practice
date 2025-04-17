import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";

const mnemonic = generateMnemonic(128);
console.log("Generated Mnemonic:", mnemonic);

const seed = mnemonicToSeedSync(mnemonic);


const path = `m/44'/501'/0'/0'`
const hexSeed = seed.toString('hex');
const deriveSeed = derivePath(path, hexSeed).key;

const secret = nacl.sign.keyPair.fromSeed(deriveSeed).secretKey;

const publicKey = Keypair.fromSecretKey(secret).publicKey;
console.log(publicKey);
console.log(publicKey.toBase58());


const message = new TextEncoder().encode("hello world");

const signature = nacl.sign.detached(message, secret);

const result = nacl.sign.detached.verify(
    message,
    signature,
    publicKey.toBytes()
)

console.log(result);
