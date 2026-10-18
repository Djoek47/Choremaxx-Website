import assert from 'node:assert/strict';

import {
  buildAppConfirmUrl,
  buildAppJoinUrl,
  hasAuthError,
  hasAuthPayload,
  normalizeJoinCode,
  parseHashParams,
} from './auth-bridge';

const q = new URLSearchParams('token_hash=abc123&type=signup');
assert.equal(
  buildAppConfirmUrl(q),
  'choremaxx://auth/callback?token_hash=abc123&type=signup'
);

const tokenAlias = new URLSearchParams('token=xyz&type=signup');
const aliased = buildAppConfirmUrl(tokenAlias);
assert.match(aliased, /token_hash=xyz/);
assert.match(aliased, /type=signup/);
assert.doesNotMatch(aliased, /(?:\?|&)token=/);

const hash = parseHashParams('#access_token=tok&refresh_token=ref&type=signup');
const fromHash = buildAppConfirmUrl(new URLSearchParams(), hash);
assert.match(fromHash, /access_token=tok/);
assert.match(fromHash, /refresh_token=ref/);
assert.match(fromHash, /type=signup/);
assert.doesNotMatch(fromHash, /#/);

assert.equal(hasAuthPayload(q), true);
assert.equal(hasAuthPayload(new URLSearchParams()), false);
assert.equal(hasAuthError(new URLSearchParams('error=access_denied')).error, 'access_denied');
assert.equal(normalizeJoinCode(' ab-12 '), 'AB-12');
assert.equal(buildAppJoinUrl('demo'), 'choremaxx://join/DEMO');

console.log('auth-bridge tests passed');
