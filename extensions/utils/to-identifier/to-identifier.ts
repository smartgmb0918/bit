import { camelCase } from 'bit-bin/utils';

/**
 * formats a string as identifier.
 */
export function toIdentifier(str: string) {
  return camelCase(str.replace('/', '$'));
}
