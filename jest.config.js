process.env.TZ = 'Asia/Shanghai';

module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	collectCoverageFrom: ['credentials/*.ts', 'nodes/**/*.ts', 'utils/*.ts'],
};
