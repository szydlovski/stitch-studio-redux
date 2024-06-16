import { NextResponse } from 'next/server';

import {
	createCipheriv,
	createDecipheriv,
	randomBytes,
	scryptSync,
} from 'crypto';

class EncryptionService {
	private keyBuffer: Buffer;
	public constructor(
		private readonly key: string = EncryptionService.getDefaultKey()
	) {
		this.keyBuffer = scryptSync(this.key, 'salt', 32);
	}
	private static getDefaultKey(): string {
		const key = process.env.ENCRYPTION_KEY;
		if (!key)
			throw new Error('Set an encryption key via env or constructor argument');
		return key;
	}
	public encrypt(cleartext: string): string {
		const iv = randomBytes(16);
		const cipher = createCipheriv('aes-256-cbc', this.keyBuffer, iv);
		let encrypted = cipher.update(cleartext, 'utf8', 'hex');
		encrypted += cipher.final('hex');
		const hexIv = iv.toString('hex');
		return `${hexIv}${encrypted}`;
	}
	public decrypt(cipher: string): string {
		const iv = Buffer.from(cipher.slice(0, 32), 'hex');
		const encryptedMessage = cipher.slice(32);
		const decipher = createDecipheriv('aes-256-cbc', this.keyBuffer, iv);
		let cleartext = decipher.update(encryptedMessage, 'hex', 'utf8');
		cleartext += decipher.final('utf8');
		return cleartext;
	}
}

export const GET = () => {
	const encryptionService = new EncryptionService();
	const cleartextMessage = 'Hello, World!';
	const encryptedMessage = encryptionService.encrypt(cleartextMessage);
	const decryptedMessage = encryptionService.decrypt(encryptedMessage);
	return NextResponse.json({
		cleartextMessage,
		encryptedMessage,
		decryptedMessage,
	});
};
