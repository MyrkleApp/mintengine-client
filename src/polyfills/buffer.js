/**
 * Must run before any code that uses algosdk (or other deps that need Buffer).
 * Import this as the very first import in index.jsx so ESM runs it before App/store/etc.
 */
import { Buffer } from 'buffer';

if (typeof globalThis.Buffer === 'undefined') {
  globalThis.Buffer = Buffer;
}
