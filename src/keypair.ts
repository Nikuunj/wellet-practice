import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import bs58 from 'bs58'
import { Keypair } from "@solana/web3.js";

const mnemonic = generateMnemonic(128);
console.log("Generated Mnemonic:", mnemonic);

const seed = mnemonicToSeedSync(mnemonic);


const path = `m/44'/501'/0'/0'`
// convert hex to seed
const hexSeed = seed.toString('hex');
// derivePath return { key , chainCode } objec 
// both type is buffer
// key use for public / private key generation 
// chainCode use for deterministic key generation 
const deriveSeed = derivePath(path, hexSeed).key;

// Uint8Array
const secret = nacl.sign.keyPair.fromSeed(deriveSeed).secretKey;
const publicKey = Keypair.fromSecretKey(secret).publicKey;

// secret key / base58
console.log(bs58.encode(secret));
// public key / base58
console.log(publicKey.toBase58());