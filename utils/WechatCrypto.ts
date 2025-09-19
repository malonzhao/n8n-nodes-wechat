import crypto from 'crypto';

export default class {
	/**
	 * 解码PKCS#7填充的缓冲区
	 *
	 * 该函数用于移除数据末尾的PKCS#7填充字节。PKCS#7填充规则是：
	 * 填充的字节数等于填充的值，例如填充5个字节，则每个字节的值都是5。
	 *
	 * @param text - 包含PKCS#7填充的输入缓冲区
	 * @returns 移除填充后的数据缓冲区
	 * @throws {Error} 当输入缓冲区为空时抛出错误
	 * @throws {Error} 当填充字节不符合PKCS#7规范时抛出错误
	 */
	private static pkcs7Decode(text: Buffer) {
		// 验证输入缓冲区不为空
		if (text.length === 0) throw new Error('Input buffer is empty');

		// 获取填充字节值（最后一个字节）
		const pad = text[text.length - 1];

		// 验证填充字节的有效性
		if (pad < 1 || pad > 32 || pad > text.length) throw new Error('Invalid PKCS#7 padding');

		// 返回移除填充后的数据
		return text.subarray(0, text.length - pad);
	}

	/**
	 * PKCS#7 填充编码函数
	 *
	 * 该函数对输入的Buffer数据进行PKCS#7填充编码，使数据长度符合指定的块大小要求。
	 * 填充方式为：计算需要填充的字节数，然后在数据末尾添加相应数量的填充字节，
	 * 每个填充字节的值等于填充的字节数量。
	 *
	 * @param text - 需要进行填充编码的原始数据Buffer
	 * @returns 经过PKCS#7填充后的Buffer数据
	 * @throws {TypeError} 当输入参数不是Buffer类型时抛出错误
	 */
	private static pkcs7Encode(text: Buffer) {
		const BLOCK_SIZE = 32;
		if (!Buffer.isBuffer(text)) throw new TypeError('Input must be a Buffer');
		const textLength = text.length;
		// 计算需要填充的字节数
		const amountToPad = BLOCK_SIZE - (textLength % BLOCK_SIZE);
		// 创建填充数据Buffer，每个字节填充为amountToPad的值
		const result = Buffer.alloc(amountToPad).fill(amountToPad);
		return Buffer.concat([text, result]);
	}

	/**
	 * 验证签名是否正确
	 *
	 * @param signature - 待验证的签名字符串
	 * @param token - 用于签名的token
	 * @param timestamp - 时间戳
	 * @param nonce - 随机数
	 * @param encrypt - 加密字符串，默认为空字符串
	 * @returns 返回签名验证结果，true表示验证通过，false表示验证失败
	 */
	static checkSignature(
		signature: string,
		token: string,
		timestamp: string,
		nonce: string,
		encrypt: string = '',
	) {
		// 使用sha1算法对参数进行签名计算
		const hash = crypto
			.createHash('sha1')
			.update([token, timestamp, nonce, encrypt].sort().join(''))
			.digest('hex');
		return hash === signature;
	}

	/**
	 * 生成签名字符串
	 *
	 * @param token - 用于签名的token字符串
	 * @param timestamp - 时间戳字符串
	 * @param nonce - 随机数字符串
	 * @param encrypt - 加密字符串，默认为空字符串
	 * @returns 返回生成的sha1签名字符串
	 */
	static signature(token: string, timestamp: string, nonce: string, encrypt: string = '') {
		return crypto
			.createHash('sha1')
			.update([token, timestamp, nonce, encrypt].sort().join(''))
			.digest('hex');
	}

	/**
	 * 解密函数，用于解密经过AES加密的文本数据
	 * @param text 需要解密的密文字符串，采用base64编码
	 * @param encodingAESKey 用于解密的AES密钥，需为base64编码格式
	 * @returns 解密后的结果对象，包含XML中解析出的各个字段
	 * @throws 当encodingAESKey长度不为32字节时抛出错误
	 */
	static decrypt(text: string, encodingAESKey: string) {
		// 从encodingAESKey生成32字节的密钥，并验证长度
		let key = Buffer.from(encodingAESKey + '=', 'base64');
		if (key.length !== 32) throw new Error('encodingAESKey invalid');
		// 提取前16字节作为初始化向量(IV)
		const iv = key.subarray(0, 16);
		// 创建AES-256-CBC解密器并解密数据
		const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv).setAutoPadding(false);
		let deciphered = Buffer.concat([decipher.update(text, 'base64'), decipher.final()]);
		// 进行PKCS7解码并提取有效载荷内容
		const content = this.pkcs7Decode(deciphered).subarray(16);
		// 从内容中读取消息长度和实际消息体
		const length = content.subarray(0, 4).readUInt32BE(0);
		return content.subarray(4, length + 4).toString();
	}

	/**
	 * 加密函数，使用AES-256-CBC算法对文本进行加密
	 * @param text 需要加密的明文
	 * @param encodingAESKey 用于加密的AES密钥，需为base64编码格式
	 * @param appId 应用ID，用于标识消息来源
	 * @returns 加密后的密文，以base64编码格式返回
	 */
	static encrypt(text: string, encodingAESKey: string, appId: string = '') {
		// 解析并验证AES密钥
		let key = Buffer.from(encodingAESKey + '=', 'base64');
		if (key.length !== 32) throw new Error('encodingAESKey invalid');
		const iv = key.subarray(0, 16);
		// 生成随机字符串和消息长度标识
		const randomString = crypto.pseudoRandomBytes(16);
		const msg = Buffer.from(text);
		const msgHeader = Buffer.alloc(4);
		msgHeader.writeUInt32BE(msg.length, 0);
		const id = Buffer.from(appId);
		// 拼接完整消息并进行PKCS7填充
		const bufMsg = Buffer.concat([randomString, msgHeader, msg, id]);
		const encoded = this.pkcs7Encode(bufMsg);
		// 使用AES-256-CBC算法加密并返回base64编码结果
		const cipher = crypto.createCipheriv('aes-256-cbc', key, iv).setAutoPadding(false);
		return Buffer.concat([cipher.update(encoded), cipher.final()]).toString('base64');
	}

	/**
	 * 加密响应数据并生成签名信息
	 *
	 * @param text - 需要加密的明文内容
	 * @param encodingAESKey - 用于加密的AES密钥
	 * @param token - 用于生成签名的令牌
	 * @param appId - 应用ID，用于加密过程
	 * @returns 包含加密数据和签名信息的对象，包括Encrypt(加密后的数据)、MsgSignature(消息签名)、TimeStamp(时间戳)和Nonce(随机字符串)
	 */
	static encryptResponse(
		text: string,
		encodingAESKey: string,
		token: string,
		appId: string,
	): Record<string, string | number> {
		const Encrypt = this.encrypt(text, encodingAESKey, appId);
		const TimeStamp = parseInt(String(Date.now() / 1000));
		const Nonce = Math.random().toString().slice(2, 10);
		const MsgSignature = this.signature(token, TimeStamp.toString(), Nonce, Encrypt);
		return { Encrypt, MsgSignature, TimeStamp, Nonce };
	}
}
